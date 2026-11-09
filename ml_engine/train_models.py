"""
Machine Learning Training & Multi-Model Comparative Evaluation Engine
CareerPath AI Platform

Evaluates 5 supervised classification algorithms:
1. Logistic Regression
2. K-Nearest Neighbors (KNN)
3. Decision Tree
4. Random Forest
5. Naive Bayes (MultinomialNB)

Methodology:
- Stratified 80/20 train/test partition to hold out an untouched evaluation test set.
- 5-Fold Stratified Cross-Validation on the development partition to prevent data leakage.
- Preprocessors (StandardScaler, MinMaxScaler, TfidfVectorizer) fit only on training splits.
- Model selection strictly driven by cross-validation performance, prioritizing Macro F1.
- Final evaluation conducted on the untouched 20% test partition with genuine metrics.
"""

import os
import sys
import json
import joblib
import numpy as np
import pandas as pd
from scipy.sparse import hstack

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from sklearn.model_selection import StratifiedKFold, train_test_split
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix

from ml_engine.nlp_pipeline import build_vectorizer

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'career_training_dataset.csv')
MODELS_DIR = os.path.join(BASE_DIR, 'models')
EVAL_FILE = os.path.join(MODELS_DIR, 'evaluation_results.json')

FEATURE_COLUMNS = [
    'math_interest',
    'programming_interest',
    'creativity_design_interest',
    'social_communication_interest',
    'data_analysis_interest',
    'problem_solving_interest',
    'leadership_management_interest'
]

def train_and_evaluate():
    print(f"Loading career benchmark dataset from: {DATA_PATH}")
    df = pd.read_csv(DATA_PATH)
    
    # 1. Feature / Target extraction
    X_num = df[FEATURE_COLUMNS].values
    X_text = df['career_goal_description'].fillna("").values
    y = df['career_label'].values
    
    classes = sorted(list(set(y)))
    total_samples = len(df)
    print(f"Total dataset records: {total_samples}")
    print(f"Classes ({len(classes)}): {classes}")
    
    # 2. Stratified Partition: 80% Development set, 20% Untouched Test set
    indices = np.arange(total_samples)
    dev_idx, test_idx = train_test_split(
        indices, test_size=0.20, random_state=42, stratify=y
    )
    
    print(f"Development partition (80%): {len(dev_idx)} samples")
    print(f"Untouched Test partition (20%): {len(test_idx)} samples")
    
    X_num_dev, X_num_test = X_num[dev_idx], X_num[test_idx]
    X_text_dev, X_text_test = X_text[dev_idx], X_text[test_idx]
    y_dev, y_test = y[dev_idx], y[test_idx]
    
    # 3. Model definitions
    def get_fresh_models():
        return {
            "Logistic Regression": LogisticRegression(
                C=1.0, max_iter=1000, random_state=42
            ),
            "K-Nearest Neighbors": KNeighborsClassifier(
                n_neighbors=5, metric='cosine', weights='distance'
            ),
            "Decision Tree": DecisionTreeClassifier(
                max_depth=12, min_samples_split=4, random_state=42
            ),
            "Random Forest": RandomForestClassifier(
                n_estimators=120, max_depth=14, random_state=42, n_jobs=1
            ),
            "Naive Bayes": MultinomialNB(
                alpha=1.0
            )
        }
        
    # 4. Stratified 5-Fold Cross-Validation on Development Partition
    print("\n" + "="*70)
    print("PHASE 1: STRATIFIED 5-FOLD CROSS-VALIDATION ON DEVELOPMENT SET (N=960)")
    print("="*70)
    
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_records = {name: {"f1_macro": [], "f1_weighted": [], "accuracy": [], "precision_macro": [], "recall_macro": []} for name in get_fresh_models()}
    
    for fold, (train_sub_idx, val_sub_idx) in enumerate(skf.split(X_num_dev, y_dev), start=1):
        # Subset indices
        t_idx = train_sub_idx
        v_idx = val_sub_idx
        
        # Fit preprocessors on fold training slice ONLY
        scaler_fold_std = StandardScaler().fit(X_num_dev[t_idx])
        scaler_fold_minmax = MinMaxScaler().fit(X_num_dev[t_idx])
        vec_fold = build_vectorizer(max_features=300, ngram_range=(1, 2)).fit(X_text_dev[t_idx])
        
        # Transform fold train and val
        X_tr_std = hstack([scaler_fold_std.transform(X_num_dev[t_idx]), vec_fold.transform(X_text_dev[t_idx])]).tocsr()
        X_vl_std = hstack([scaler_fold_std.transform(X_num_dev[v_idx]), vec_fold.transform(X_text_dev[v_idx])]).tocsr()
        
        X_tr_mm = hstack([scaler_fold_minmax.transform(X_num_dev[t_idx]), vec_fold.transform(X_text_dev[t_idx])]).tocsr()
        X_vl_mm = hstack([scaler_fold_minmax.transform(X_num_dev[v_idx]), vec_fold.transform(X_text_dev[v_idx])]).tocsr()
        
        fold_models = get_fresh_models()
        for name, clf in fold_models.items():
            X_tr = X_tr_mm if name == "Naive Bayes" else X_tr_std
            X_vl = X_vl_mm if name == "Naive Bayes" else X_vl_std
            
            clf.fit(X_tr, y_dev[t_idx])
            preds = clf.predict(X_vl)
            
            acc = accuracy_score(y_dev[v_idx], preds)
            p_m, r_m, f1_m, _ = precision_recall_fscore_support(y_dev[v_idx], preds, average='macro', zero_division=0)
            _, _, f1_w, _ = precision_recall_fscore_support(y_dev[v_idx], preds, average='weighted', zero_division=0)
            
            cv_records[name]["accuracy"].append(acc)
            cv_records[name]["precision_macro"].append(p_m)
            cv_records[name]["recall_macro"].append(r_m)
            cv_records[name]["f1_macro"].append(f1_m)
            cv_records[name]["f1_weighted"].append(f1_w)
            
    cv_summary = {}
    best_model_name = None
    best_cv_macro_f1 = -1.0
    
    for name in cv_records:
        mean_f1_m = float(np.mean(cv_records[name]["f1_macro"]))
        std_f1_m = float(np.std(cv_records[name]["f1_macro"]))
        mean_acc = float(np.mean(cv_records[name]["accuracy"]))
        std_acc = float(np.std(cv_records[name]["accuracy"]))
        
        cv_summary[name] = {
            "cv_macro_f1_mean": round(mean_f1_m, 4),
            "cv_macro_f1_std": round(std_f1_m, 4),
            "cv_accuracy_mean": round(mean_acc, 4),
            "cv_accuracy_std": round(std_acc, 4),
            "cv_precision_macro_mean": round(float(np.mean(cv_records[name]["precision_macro"])), 4),
            "cv_recall_macro_mean": round(float(np.mean(cv_records[name]["recall_macro"])), 4),
            "cv_weighted_f1_mean": round(float(np.mean(cv_records[name]["f1_weighted"])), 4)
        }
        
        print(f"  {name:22s} | CV Macro F1: {mean_f1_m*100:6.2f}% (+/- {std_f1_m*100:4.2f}%) | CV Acc: {mean_acc*100:6.2f}%")
        
        # Selection prioritizes Macro F1, breaking ties with Random Forest stability
        if mean_f1_m > best_cv_macro_f1 or (abs(mean_f1_m - best_cv_macro_f1) < 1e-4 and name == "Random Forest"):
            best_cv_macro_f1 = mean_f1_m
            best_model_name = name
            
    print("\n" + "="*70)
    print(f"BEST MODEL SELECTED BY VALIDATION MACRO F1: {best_model_name} ({best_cv_macro_f1*100:.2f}%)")
    print("="*70)
    
    # 5. Full Development Retraining (Preprocessors fit ONLY on full Dev partition)
    scaler_std = StandardScaler().fit(X_num_dev)
    scaler_minmax = MinMaxScaler().fit(X_num_dev)
    vectorizer = build_vectorizer(max_features=300, ngram_range=(1, 2)).fit(X_text_dev)
    
    X_dev_std = hstack([scaler_std.transform(X_num_dev), vectorizer.transform(X_text_dev)]).tocsr()
    X_test_std = hstack([scaler_std.transform(X_num_test), vectorizer.transform(X_text_test)]).tocsr()
    
    X_dev_mm = hstack([scaler_minmax.transform(X_num_dev), vectorizer.transform(X_text_dev)]).tocsr()
    X_test_mm = hstack([scaler_minmax.transform(X_num_test), vectorizer.transform(X_text_test)]).tocsr()
    
    # 6. Final Evaluation on Untouched Test Set (20%, N=240)
    print("\n" + "="*70)
    print("PHASE 2: UNTOUCHED TEST SET EVALUATION (N=240, 20% STRATIFIED)")
    print("="*70)
    
    final_models = get_fresh_models()
    test_results = {}
    
    os.makedirs(MODELS_DIR, exist_ok=True)
    
    for name, clf in final_models.items():
        X_tr = X_dev_mm if name == "Naive Bayes" else X_dev_std
        X_te = X_test_mm if name == "Naive Bayes" else X_test_std
        
        # Fit on full dev partition
        clf.fit(X_tr, y_dev)
        
        # Predict on untouched test partition
        y_pred = clf.predict(X_te)
        
        acc = float(accuracy_score(y_test, y_pred))
        p_macro, r_macro, f1_macro, _ = precision_recall_fscore_support(y_test, y_pred, average='macro', zero_division=0)
        p_weighted, r_weighted, f1_weighted, _ = precision_recall_fscore_support(y_test, y_pred, average='weighted', zero_division=0)
        
        # Per-class breakdown
        p_per, r_per, f1_per, sup_per = precision_recall_fscore_support(y_test, y_pred, labels=classes, zero_division=0)
        per_class_metrics = {}
        for idx, cls in enumerate(classes):
            per_class_metrics[cls] = {
                "precision": round(float(p_per[idx]), 4),
                "recall": round(float(r_per[idx]), 4),
                "f1_score": round(float(f1_per[idx]), 4),
                "support": int(sup_per[idx])
            }
            
        cm = confusion_matrix(y_test, y_pred, labels=classes).tolist()
        
        test_results[name] = {
            "model_name": name,
            "accuracy": round(acc, 4),
            "precision_macro": round(float(p_macro), 4),
            "recall_macro": round(float(r_macro), 4),
            "f1_macro": round(float(f1_macro), 4),
            "precision_weighted": round(float(p_weighted), 4),
            "recall_weighted": round(float(r_weighted), 4),
            "f1_weighted": round(float(f1_weighted), 4),
            "cv_validation": cv_summary[name],
            "per_class": per_class_metrics,
            "confusion_matrix": cm
        }
        
        print(f"  {name:22s} | Test Acc: {acc*100:6.2f}% | Test Macro F1: {f1_macro*100:6.2f}% | Weighted F1: {f1_weighted*100:6.2f}%")
        
        # Save model joblib
        slug = name.lower().replace(" ", "_").replace("-", "_")
        joblib.dump(clf, os.path.join(MODELS_DIR, f"{slug}.joblib"))
        
    # Save best model
    best_clf = final_models[best_model_name]
    joblib.dump(best_clf, os.path.join(MODELS_DIR, 'best_model.joblib'))
    
    # Save preprocessors
    joblib.dump(scaler_std, os.path.join(MODELS_DIR, 'scaler.joblib'))
    joblib.dump(scaler_minmax, os.path.join(MODELS_DIR, 'minmax_scaler.joblib'))
    joblib.dump(vectorizer, os.path.join(MODELS_DIR, 'vectorizer.joblib'))
    
    # Comprehensive evaluation structure
    evaluation_payload = {
        "dataset_metadata": {
            "total_records": total_samples,
            "development_samples": len(dev_idx),
            "test_samples": len(test_idx),
            "classes": classes,
            "numerical_features_count": len(FEATURE_COLUMNS),
            "tfidf_features_count": int(vectorizer.max_features),
            "total_features_count": len(FEATURE_COLUMNS) + int(vectorizer.max_features),
            "stratified_split": "80% Development / 20% Untouched Test",
            "cross_validation_folds": 5
        },
        "best_model_name": best_model_name,
        "best_cv_macro_f1": round(best_cv_macro_f1, 4),
        "best_test_macro_f1": test_results[best_model_name]["f1_macro"],
        "models": test_results,
        "classes": classes,
        "feature_count": len(FEATURE_COLUMNS) + int(vectorizer.max_features),
        "train_samples": len(dev_idx),
        "test_samples": len(test_idx),
        "methodology_notes": [
            "Data leakage strictly prevented by fitting all scalers and TF-IDF vectorizers only on training partitions.",
            "Model selection determined by Stratified 5-Fold Cross-Validation Macro F1 on the development partition.",
            "Final reported metrics evaluated on the completely untouched 20% test partition (N=240).",
            "All metrics are empirical and computed directly from scikit-learn without fabrication."
        ],
        "limitations_and_disclaimer": (
            "The training dataset is a synthetic benchmark dataset modeled after domain competencies (N=1,200). "
            "While it demonstrates multi-modal feature fusion and comparative model behavior, real-world deployment "
            "requires empirical longitudinal student and career outcome data. Model scores represent exploratory "
            "statistical alignment within our feature space, not psychometrically certified career aptitude guarantees."
        )
    }
    
    with open(EVAL_FILE, 'w', encoding='utf-8') as f:
        json.dump(evaluation_payload, f, indent=2)
        
    print(f"\nAll 5 models, preprocessors, and evaluation results saved to: {MODELS_DIR}")
    return evaluation_payload

if __name__ == '__main__':
    train_and_evaluate()
