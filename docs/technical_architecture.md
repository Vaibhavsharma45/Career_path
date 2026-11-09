# Technical Architecture & System Design — CareerPath AI

## 1. System Overview

**CareerPath AI** is an enterprise-grade personalized career recommendation platform designed to bridge candidate psychometric self-assessments and qualitative natural language statements with official occupational intelligence standards from the **O*NET 31.0 Database**.

```
Candidate Input
  │
  ├── 7-Dimension Rating Assessment (1-5) ──► StandardScaler / MinMaxScaler
  │                                                      │
  └── Free-Text Career & Project Statement ──► Text Cleaner ──► TF-IDF Vectorizer
                                                                    │
                                          ┌─────────────────────────┘
                                          ▼
                         Joint Feature Space (307 Dimensions)
                                          │
                                          ▼
                           Supervised Machine Learning
                     [Random Forest | Naive Bayes | LR | DT | KNN]
                                          │
                                          ▼
                            Multi-Class Posterior Probabilities
                                          │
                                          ▼
                                Top 3–5 Ranked Careers
                                          │
                    ┌─────────────────────┴─────────────────────┐
                    ▼                                           ▼
          Explainability Engine                       O*NET 31.0 Knowledge Base
    (Drivers, Keyword Signals, Skill Gaps)     (SOC, In-Demand Tech, Knowledge, Roadmaps)
                    │                                           │
                    └─────────────────────┬─────────────────────┘
                                          ▼
                          Comprehensive Career Intelligence
                    (Cards, Skill Gap Analysis, Interactive Roadmap)
```

---

## 2. Component Architecture

### 2.1 Backend (FastAPI)
- **`backend/main.py`**: Application bootstrap, CORS middleware, static asset mounting (`/static`, `/frontend`), root router.
- **`backend/api_routes.py`**:
  - `GET /api/health`: Health status, active model, supported algorithms and classes.
  - `POST /api/recommend`: End-to-end multi-modal career recommendation engine.
  - `GET /api/models`: Model evaluation results, cross-validation metrics, confusion matrices.
  - `GET /api/careers`: Catalog of all 8 supported career domains.
  - `GET /api/career/{domain_name}`: Detailed O*NET career profile.
- **`backend/schemas.py`**: Strict Pydantic models for request validation, rating boundaries, and structured responses.

### 2.2 Machine Learning Engine (`ml_engine/`)
- **`train_models.py`**: 5-algorithm trainer (Random Forest, Naive Bayes, Logistic Regression, Decision Tree, KNN) with 5-fold stratified cross-validation on development partition and evaluation on untouched test set.
- **`evaluate.py`**: Evaluation plot generator producing model comparison bar charts and confusion matrices.
- **`nlp_pipeline.py`**: Sublinear TF-IDF vectorizer (max 300 features, 1-2 n-grams) with regex tokenization and stopword removal.
- **`explainability.py`**: Evidence-based explainability and structured skill gap analyzer comparing candidate ratings against domain target benchmarks.
- **`predictor.py`**: Thread-safe recommendation inference engine.

### 2.3 Occupational Intelligence (`onet_engine/`)
- **`onet_parser.py`**: Data ingestion engine parsing official O*NET 31.0 CSVs (occupations, skills, abilities, knowledge, software skills, RIASEC interests, education, work styles).
- **`data/onet_processed/onet_career_profiles.json`**: Pre-indexed, validated career intelligence profiles.

### 2.4 Frontend Architecture
- **Single Page Application (SPA)**: Built using React 18 and Tailwind CSS.
- **Tabs**:
  1. **Overview**: Value proposition, supported disciplines catalog with SOC codes, architecture overview.
  2. **Assessment Studio**: 7-dimension rating pills with level indicators, candidate archetype presets, natural language text area with real-time NLP signal detector, dynamic classifier selector.
  3. **Recommendations**:
     - Career profiles with match scores and O*NET metadata.
     - Evidence-based Explainable AI narrative.
     - **Skill Gap & Learning Suggestions Tab**: Candidate strengths, identified skill gaps, priority technologies to learn, actionable steps.
     - Interactive 4-phase learning roadmap with progress checkboxes.
     - Live What-If Skill Simulator.
     - Side-by-side comparison matrix.
     - Multi-class probability mass distribution.
     - **Downloadable & Printable Comprehensive Career Report**.
  4. **Model Methodology & Evaluation**: Empirical benchmark tables, cross-validation metrics, comparison bar chart, confusion matrices, architecture trade-offs, and data limitations disclosure.

---

## 3. Data Flow & Security
- **Data Leakage Elimination**: Strict separation between training partitions and test partitions.
- **Input Validation**: Strict schema enforcement; ratings bounded to $[1, 5]$; text bounded to 2,000 characters.
- **Environment Isolation**: No hardcoded external secrets; local inference executes without third-party cloud API dependencies.
