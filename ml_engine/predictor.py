"""
CareerPath Recommendation & Inference Engine
CareerPath AI Platform

Integrates 5 trained ML classifiers, TF-IDF representations, O*NET 31.0 profiles,
and the Explainability & Skill Gap Engine to deliver personalized recommendations.
"""

import os
import sys
import json
import joblib
import numpy as np
from scipy.sparse import hstack

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from ml_engine.nlp_pipeline import clean_text
from ml_engine.explainability import generate_explanation

MODELS_DIR = os.path.join(BASE_DIR, 'models')
ONET_PROFILES_FILE = os.path.join(BASE_DIR, 'data', 'onet_processed', 'onet_career_profiles.json')
EVAL_RESULTS_FILE = os.path.join(MODELS_DIR, 'evaluation_results.json')

FEATURE_COLUMNS = [
    'math_interest',
    'programming_interest',
    'creativity_design_interest',
    'social_communication_interest',
    'data_analysis_interest',
    'problem_solving_interest',
    'leadership_management_interest'
]

class CareerPathPredictor:
    def __init__(self):
        self._load_artifacts()
        
    def _load_artifacts(self):
        # Load preprocessors
        self.scaler = joblib.load(os.path.join(MODELS_DIR, 'scaler.joblib'))
        self.minmax_scaler = joblib.load(os.path.join(MODELS_DIR, 'minmax_scaler.joblib'))
        self.vectorizer = joblib.load(os.path.join(MODELS_DIR, 'vectorizer.joblib'))
        
        # Load evaluation metadata
        with open(EVAL_RESULTS_FILE, 'r', encoding='utf-8') as f:
            self.eval_data = json.load(f)
            
        self.classes = self.eval_data['classes']
        self.best_model_name = self.eval_data['best_model_name']
        
        # Load all 5 models
        self.models = {
            "Logistic Regression": joblib.load(os.path.join(MODELS_DIR, 'logistic_regression.joblib')),
            "K-Nearest Neighbors": joblib.load(os.path.join(MODELS_DIR, 'k_nearest_neighbors.joblib')),
            "Decision Tree": joblib.load(os.path.join(MODELS_DIR, 'decision_tree.joblib')),
            "Random Forest": joblib.load(os.path.join(MODELS_DIR, 'random_forest.joblib')),
            "Naive Bayes": joblib.load(os.path.join(MODELS_DIR, 'naive_bayes.joblib'))
        }
        
        # Load O*NET Profiles
        with open(ONET_PROFILES_FILE, 'r', encoding='utf-8') as f:
            self.onet_profiles = json.load(f)
            
    def predict(
        self,
        ratings: dict,
        text: str = "",
        work_preferences: dict = None,
        background: dict = None,
        model_name: str = "Best Model",
        top_k: int = 3
    ) -> dict:
        """
        Executes end-to-end multi-modal career recommendation:
        1. Numerical feature scaling (StandardScaler or MinMaxScaler for Naive Bayes)
        2. NLP text preprocessing + TF-IDF vectorization
        3. Multi-modal feature fusion
        4. Supervised ML prediction probabilities
        5. O*NET enrichment, Job Zone mapping, Explainability, and Skill Gap Analysis
        """
        selected_model_name = self.best_model_name if model_name in ["Best Model", None, ""] else model_name
        clf = self.models.get(selected_model_name, self.models[self.best_model_name])
        
        # 1. Prepare numerical vector
        def _safe_rating(col_name):
            val = ratings.get(col_name)
            if val is None or val <= 0:
                return 3
            return int(np.clip(val, 1, 5))
            
        num_vec = [_safe_rating(col) for col in FEATURE_COLUMNS]
        
        if selected_model_name == "Naive Bayes":
            num_scaled = self.minmax_scaler.transform([num_vec])
        else:
            num_scaled = self.scaler.transform([num_vec])
            
        # 2. Prepare text feature vector
        cleaned_text = clean_text(text)
        text_tfidf = self.vectorizer.transform([cleaned_text])
        
        # 3. Combine features
        combined_features = hstack([num_scaled, text_tfidf]).tocsr()
        
        # 4. Predict probabilities
        if hasattr(clf, "predict_proba"):
            probs = clf.predict_proba(combined_features)[0]
        else:
            pred_idx = clf.predict(combined_features)[0]
            probs = np.zeros(len(self.classes))
            probs[self.classes.index(pred_idx)] = 1.0
            
        # Map probabilities to classes
        class_probs = []
        for idx, cls_name in enumerate(clf.classes_):
            class_probs.append({
                "domain_name": cls_name,
                "probability": float(probs[idx])
            })
            
        # Sort descending by probability
        class_probs = sorted(class_probs, key=lambda x: x["probability"], reverse=True)
        
        # Top-K recommendations
        top_k = min(max(top_k, 3), 5)
        top_recommendations = []
        
        declared_skills = background.get("declared_skills", []) if background else []
        education_level = background.get("education_level", "Bachelor's Degree") if background else "Bachelor's Degree"
        
        for rank, item in enumerate(class_probs[:top_k], start=1):
            dname = item["domain_name"]
            raw_prob = item["probability"]
            
            # Match alignment index: min 15% floor for display calibration
            match_score = round(max(raw_prob * 100, 15.0), 1)
            
            # Get O*NET Profile
            onet_info = self.onet_profiles.get(dname, {})
            hot_tech = onet_info.get("hot_technologies", [])
            job_zone = onet_info.get("job_zone", {})
            
            # Generate grounded explanation and skill gap breakdown
            explanation = generate_explanation(
                domain_name=dname,
                user_ratings=ratings,
                user_text=text,
                probability=raw_prob,
                hot_technologies=hot_tech,
                declared_skills=declared_skills,
                work_preferences=work_preferences,
                education_level=education_level,
                job_zone_info=job_zone
            )
            
            top_recommendations.append({
                "rank": rank,
                "domain_name": dname,
                "match_score": match_score,
                "confidence_probability": round(raw_prob, 4),
                "onet_soc_code": onet_info.get("onet_soc_code", "N/A"),
                "onet_official_title": onet_info.get("onet_official_title", dname),
                "category": onet_info.get("category", "Technology"),
                "icon": onet_info.get("icon", "briefcase"),
                "description": onet_info.get("description", ""),
                "job_zone": job_zone,
                "work_activities": onet_info.get("work_activities", []),
                "explanation": explanation,
                "top_skills": onet_info.get("top_skills", []),
                "top_abilities": onet_info.get("top_abilities", []),
                "top_knowledge": onet_info.get("top_knowledge", []),
                "riasec_interests": onet_info.get("riasec_interests", {}),
                "hot_technologies": hot_tech,
                "education_distribution": onet_info.get("education_distribution", []),
                "work_styles": onet_info.get("work_styles", []),
                "related_occupations": onet_info.get("related_occupations", []),
                "curated_roadmap": onet_info.get("curated_roadmap", []),
                "learning_stages": onet_info.get("learning_stages", {}),
                "portfolio_projects": onet_info.get("portfolio_projects", []),
                "learning_resources": onet_info.get("learning_resources", [])
            })
            
        # Radar comparison data
        radar_categories = [
            "Math", "Programming", "Design", "Communication", "Data Analysis", "Problem Solving", "Leadership"
        ]
        user_radar_values = [ratings.get(col, 3) for col in FEATURE_COLUMNS]
        
        comparison_series = [
            {"name": "Your Self-Assessment", "data": user_radar_values, "color": "#3b82f6"}
        ]
        
        rec_colors = ["#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#06b6d4"]
        for idx, rec in enumerate(top_recommendations[:2]):
            ideal_benchmarks = {
                "Software Development": [3.5, 4.5, 2.5, 3.0, 3.2, 4.5, 2.8],
                "Data Science & Machine Learning": [4.5, 4.2, 2.5, 3.0, 4.8, 4.5, 2.8],
                "Data Analytics & Business Intelligence": [3.8, 3.2, 2.8, 4.0, 4.8, 4.0, 3.5],
                "UI/UX Design & Frontend Systems": [2.2, 3.2, 4.8, 4.0, 2.8, 3.8, 3.0],
                "Cloud & DevOps Engineering": [3.2, 4.0, 2.2, 3.0, 3.5, 4.6, 3.0],
                "Cybersecurity & Information Security": [3.8, 4.2, 2.2, 3.0, 3.8, 4.8, 3.0],
                "Product & IT Project Management": [2.8, 2.8, 3.2, 4.6, 3.5, 4.2, 4.8],
                "Business Analysis & Systems Architecture": [3.2, 3.0, 2.8, 4.6, 3.8, 4.4, 4.0]
            }
            benchmark = ideal_benchmarks.get(rec["domain_name"], [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0])
            comparison_series.append({
                "name": f"Rank #{rec['rank']}: {rec['domain_name']}",
                "data": benchmark,
                "color": rec_colors[idx % len(rec_colors)]
            })
            
        return {
            "status": "success",
            "model_used": selected_model_name,
            "best_evaluated_model": self.best_model_name,
            "top_recommendations": top_recommendations,
            "all_domain_scores": [
                {"domain": cp["domain_name"], "score": round(cp["probability"] * 100, 1)}
                for cp in class_probs
            ],
            "radar_comparison": {
                "categories": radar_categories,
                "series": comparison_series
            },
            "user_input_summary": {
                "ratings": ratings,
                "text": text,
                "work_preferences": work_preferences or {},
                "background": background or {},
                "cleaned_text_sample": cleaned_text[:120] + "..." if len(cleaned_text) > 120 else cleaned_text
            },
            "disclaimer": (
                "CareerPath AI recommendations are exploratory decision-support guidance derived from "
                "self-reported assessments and text analysis. Match scores represent statistical profile similarity "
                "within our reference model and are not psychometrically certified career aptitude guarantees."
            )
        }

# Global singleton predictor instance
_predictor_instance = None

def get_predictor() -> CareerPathPredictor:
    global _predictor_instance
    if _predictor_instance is None:
        _predictor_instance = CareerPathPredictor()
    return _predictor_instance
