# CareerPath AI — Intelligent Career Recommendation Platform

[![Python Version](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com)
[![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn-F7931E.svg)](https://scikit-learn.org)
[![O*NET 31.0](https://img.shields.io/badge/Knowledge--Base-O*NET%2031.0-4A90E2.svg)](https://www.onetcenter.org)
[![React 18](https://img.shields.io/badge/Frontend-React%2018-61DAFB.svg)](https://react.dev)

CareerPath AI is a personalized career recommendation platform designed for candidates, students, and career advisors. By combining quantitative psychometric self-assessments with free-form natural language statements, CareerPath AI predicts optimal career domain alignments backed by official **O*NET 31.0** occupational intelligence.

---

## Key Features

- **Multi-Modal AI Engine**: Jointly models 7 foundational psychometric and technical interest ratings alongside 300 sparse TF-IDF n-gram features extracted from candidate goals and background text.
- **5 Supervised Machine Learning Algorithms**: Rigorously evaluates and compares **Random Forest**, **Naive Bayes (MultinomialNB)**, **Logistic Regression**, **Decision Tree**, and **K-Nearest Neighbors (KNN)**.
- **O*NET 31.0 Occupational Intelligence**: Directly mapped to Standard Occupational Classification (SOC) taxonomies, essential skills, cognitive abilities, foundational knowledge domains, in-demand technologies, and educational benchmarks.
- **Explainable AI (XAI)**: Provides transparent justifications showing why each career was matched, citing primary assessment drivers and specific contextual concepts found in user descriptions.
- **Skill Gap & Learning Suggestions Engine**: Automatically evaluates candidate ratings against career benchmarks to highlight core strengths, identify skill development gaps, prioritize in-demand technologies to learn, and recommend concrete next steps.
- **Interactive 4-Phase Learning Roadmaps**: Actionable career progression roadmaps with clickable task checkboxes and dynamic progress tracking.
- **Live "What-If" Skill Simulator**: Allows candidates to adjust ratings dynamically to observe how developing new competencies shifts career matches in real time.
- **Downloadable & Printable Career Reports**: Clean, formatted print-ready reports that can be saved directly as PDF or printed.

---

## Machine Learning Benchmark Results

Models were evaluated using **5-Fold Stratified Cross-Validation** on the development partition ($N=960$) and tested on an **untouched 20% test partition** ($N=240$):

| Machine Learning Algorithm | Test Accuracy | Precision (Macro) | Recall (Macro) | F1-Score (Macro) | F1-Score (Weighted) | Status / Role |
|---|---|---|---|---|---|---|
| **Random Forest Classifier** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | **Selected Production Model** |
| **Naive Bayes (MultinomialNB)** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | **100.00%** | Generative Baseline |
| **Logistic Regression** | **99.58%** | **99.60%** | **99.58%** | **99.58%** | **99.58%** | Linear Baseline |
| **Decision Tree Classifier** | **92.92%** | **94.88%** | **92.92%** | **93.39%** | **93.39%** | Non-Linear Baseline |
| **K-Nearest Neighbors (KNN)** | **81.25%** | **81.66%** | **81.25%** | **80.94%** | **80.94%** | Distance Baseline |

*Data leakage prevention: All scalers (StandardScaler, MinMaxScaler) and TF-IDF vectorizers were fit exclusively on training partitions.*

---

## Project Structure

```
CareerPath/
├── backend/
│   ├── api_routes.py             # FastAPI REST endpoints (/recommend, /models, /careers)
│   ├── main.py                   # FastAPI server entrypoint & static mounting
│   ├── schemas.py                # Pydantic request & response validation schemas
│   └── static/
│       └── eval_plots/           # Model comparison & confusion matrix plots
├── data/
│   ├── career_training_dataset.csv  # Benchmark dataset (1,200 records, 8 classes)
│   ├── onet_processed/           # Processed O*NET 31.0 career profiles (JSON)
│   └── onet_raw/                 # Official O*NET 31.0 CSV files (skills, knowledge, SOC)
├── docs/
│   ├── dataset_documentation.md  # Detailed dataset analysis & source documentation
│   ├── model_evaluation_report.md# ML evaluation report & confusion matrix analysis
│   └── technical_architecture.md # Technical system architecture & data flow
├── frontend/
│   ├── app.js                    # Modern React 18 application with interactive tabs
│   ├── index.html                # Clean, responsive HTML5 shell
│   └── style.css                 # Custom styles, transitions, and print layout
├── ml_engine/
│   ├── dataset_builder.py        # Benchmark dataset generator
│   ├── evaluate.py               # Evaluation chart & confusion matrix generator
│   ├── explainability.py         # Explainable AI & skill gap analysis engine
│   ├── nlp_pipeline.py           # Sublinear TF-IDF vectorizer pipeline
│   ├── predictor.py              # Multi-model inference engine
│   └── train_models.py           # 5-model stratified training & evaluation script
├── models/                       # Trained joblib models & evaluation_results.json
├── onet_engine/
│   └── onet_parser.py            # O*NET 31.0 relational parser
├── tests/
│   ├── test_api.py               # Unit tests for API endpoints & validation
│   ├── test_live_predictor.py    # Quick inference verification script
│   └── test_profiles.py          # Candidate persona & edge-case test suite
├── requirements.txt              # Core production dependencies
├── run_app.py                    # Web server launcher
└── README.md                     # Documentation
```

---

## Installation & Setup

### Prerequisites
- Python 3.10+ (Python 3.12 recommended)
- Git

### 1. Clone & Set Up Environment
```bash
git clone <repository-url>
cd "Semester 1 projects"

# Create and activate virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. (Optional) Retrain Models & Regenerate Plots
To execute the complete reproducible training pipeline from scratch:
```bash
# Parse O*NET database
python onet_engine/onet_parser.py

# Train all 5 models with 5-fold cross-validation
python ml_engine/train_models.py

# Generate comparison bar charts and confusion matrices
python ml_engine/evaluate.py
```

### 4. Run Automated Test Suite
```bash
python -m unittest discover tests
```

### 5. Launch the Application
```bash
python run_app.py
```
Open your browser and navigate to:
- **Web Application**: `http://127.0.0.1:8000`
- **Interactive Swagger Docs**: `http://127.0.0.1:8000/docs`

---

## O*NET® Data Attribution & License Notice

This product includes information from the **O*NET 31.0 Database** by the U.S. Department of Labor, Employment and Training Administration (USDOL/ETA). Used under the [O*NET Developer License](https://www.onetcenter.org/license.html). O*NET® is a trademark of USDOL/ETA. The Department of Labor has not approved, endorsed, or tested this product.

---

## Limitations & Advisory Scope

- **Training Data**: The candidate training dataset (`data/career_training_dataset.csv`) is a synthetic benchmark dataset (N=1,200) designed to validate multi-modal feature fusion and comparative model behavior. Real-world institutional deployment requires empirical longitudinal career outcome data.
- **Exploratory Guidance**: CareerPath AI match scores represent statistical profile similarity within our reference feature space. Predictions are exploratory career advisory aids and must not be presented as certified psychometric aptitude evaluations.
#   C a r e e r _ p a t h  
 