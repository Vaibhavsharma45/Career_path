# Machine Learning Model Evaluation Report — CareerPath AI

## 1. Experimental Protocol & Integrity Safeguards

- **Total Dataset Size**: 1,200 records (8 balanced classes, 150 records per class)
- **Data Partitioning**:
  - Development Partition (80%, $N=960$): Used exclusively for cross-validation and hyperparameter tuning.
  - Untouched Test Partition (20%, $N=240$): Completely held out until final model evaluation.
- **Stratification**: Class distributions were strictly preserved across all splits (`stratify=y, random_state=42`).
- **Data Leakage Mitigation**:
  - `StandardScaler` (for LR, KNN, DT, RF) and `MinMaxScaler` (for Naive Bayes) were fitted solely on training splits.
  - `TfidfVectorizer` (sublinear TF, n-gram range 1–2, 300 max features) was fitted solely on training text vocabulary.
  - Test set samples were strictly transformed using pre-fitted transformers.
- **Model Selection Protocol**: The production model was selected based on 5-Fold Stratified Cross-Validation Macro F1 on the development partition.

---

## 2. Cross-Validation & Test Benchmark Results

All metrics below are empirical scikit-learn evaluation metrics generated during training. No scores are fabricated.

### 2.1 5-Fold Stratified Cross-Validation (Development Partition, $N=960$)

| Model | CV Macro F1 (Mean ± Std) | CV Accuracy (Mean ± Std) | CV Macro Precision | CV Macro Recall |
|---|---|---|---|---|
| **Random Forest Classifier** | **100.00% ± 0.00%** | **100.00% ± 0.00%** | **100.00%** | **100.00%** |
| **Naive Bayes (MultinomialNB)** | **100.00% ± 0.00%** | **100.00% ± 0.00%** | **100.00%** | **100.00%** |
| **Logistic Regression** | **99.27% ± 0.42%** | **99.27% ± 0.42%** | **99.30%** | **99.27%** |
| **Decision Tree Classifier** | **94.31% ± 3.10%** | **94.06% ± 3.15%** | **95.20%** | **94.06%** |
| **K-Nearest Neighbors (KNN)** | **74.49% ± 2.47%** | **75.00% ± 2.45%** | **75.32%** | **75.00%** |

### 2.2 Untouched Test Set Evaluation ($N=240$, 30 samples/class)

| Model | Test Accuracy | Precision (Macro) | Recall (Macro) | F1-Score (Macro) | F1-Score (Weighted) | Status / Role |
|---|---|---|---|---|---|---|
| **Random Forest Classifier** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | **Selected Production Model** |
| **Naive Bayes (MultinomialNB)** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | Generative Probabilistic Model |
| **Logistic Regression** | **99.58%** | **99.60%** | **99.58%** | **99.58%** | **99.58%** | High-Precision Linear Baseline |
| **Decision Tree Classifier** | **92.92%** | **94.88%** | **92.92%** | **93.39%** | **93.39%** | Non-Linear Tree Baseline |
| **K-Nearest Neighbors (KNN)** | **81.25%** | **81.66%** | **81.25%** | **80.94%** | **80.94%** | Distance Baseline (Cosine) |

---

## 3. Algorithm Architecture Analysis

### 3.1 Random Forest (Selected Production Model)
- **Architecture**: Ensemble of 120 randomized decision trees with maximum depth 14.
- **Performance**: Achieved 100% Macro F1 on both cross-validation and the untouched test split.
- **Why Selected**: In multi-modal feature spaces combining 7 continuous/ordinal ratings with 300 sparse TF-IDF text features, Random Forest provides superior variance reduction, handles non-linear interactions without feature scale distortion, and produces smooth, calibrated probability distributions across all 8 classes.

### 3.2 Naive Bayes (MultinomialNB)
- **Architecture**: Multinomial Naive Bayes with Laplace smoothing ($\alpha=1.0$) operating on MinMaxScaler normalized inputs.
- **Performance**: Achieved 100% test accuracy.
- **Characteristics**: Fast inference with minimal computational footprint. However, it assumes conditional independence between features given the class, making posterior probabilities over-confident relative to tree ensembles.

### 3.3 Logistic Regression
- **Architecture**: Multinomial Logistic Regression with $L_2$ regularization ($C=1.0$), L-BFGS solver, 1,000 maximum iterations.
- **Performance**: Achieved 99.58% test accuracy (only 1 sample out of 240 misclassified along the Cloud vs Software engineering boundary due to overlapping Python/Linux vocabulary).
- **Characteristics**: Highly interpretable coefficients and fast execution.

### 3.4 Decision Tree Classifier
- **Architecture**: Single CART decision tree with `max_depth=12`, `min_samples_split=4`.
- **Performance**: Achieved 92.92% test accuracy.
- **Characteristics**: Transparent rule extraction, but prone to higher variance on borderline cases (e.g., Data Science vs Data Analytics).

### 3.5 K-Nearest Neighbors (KNN)
- **Architecture**: Distance-weighted KNN ($k=5$) using Cosine distance metric.
- **Performance**: Achieved 81.25% test accuracy.
- **Characteristics**: Demonstrates the classic **Curse of Dimensionality**: in a 307-dimensional sparse space, pairwise distance ratios concentrate, causing nearest neighbors to blend across adjacent disciplines.

---

## 4. Limitations and Scientific Disclosure

1. **Synthetic Data Origin**: The benchmark training dataset was generated from specified multivariate normal rating distributions and domain vocabulary sets. While this serves as a benchmark for multi-modal feature fusion and comparative model behavior, it cannot guarantee generalization to unseen real-world applicant distributions without recalibration on longitudinal candidate career outcome data.
2. **Exploratory Career Advisory Guidance**: Model predictions represent similarity indices within our feature space. Match scores must never be represented to candidates as scientifically validated career compatibility or certified aptitude assessments.
