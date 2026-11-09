# Dataset Documentation — CareerPath AI

## 1. Executive Summary & Data Governance

CareerPath AI integrates two distinct data sources to deliver evidence-based, personalized career recommendations:
1. **The Candidate Assessment Benchmark Dataset**: A structured supervised classification dataset of candidate competency ratings and natural language interest statements mapped to 8 core technology and computing disciplines.
2. **The Official O*NET 31.0 Occupational Database**: An authoritative knowledge repository provided by the U.S. Department of Labor, supplying occupational definitions, Standard Occupational Classification (SOC) taxonomies, essential skill ratings, in-demand technologies, abilities, knowledge domains, work styles, and educational attainment distributions.

---

## 2. Official O*NET 31.0 Database Integration

### 2.1 Source & Licensing Attribution
- **Provider**: National Center for O*NET Development under the sponsorship of the **U.S. Department of Labor / Employment and Training Administration (USDOL/ETA)**.
- **Database Release**: O*NET 31.0 (Production Release).
- **Format**: Relational CSV files linked via standardized `O*NET-SOC Code` keys.
- **Attribution**: O*NET® is a trademark of the U.S. Department of Labor, Employment and Training Administration. CareerPath uses O*NET 31.0 data in accordance with the O*NET Developer License.

### 2.2 Key Files Utilized

| File Name | Records | Primary Key | Key Attributes Extracted | Role in CareerPath AI |
|---|---|---|---|---|
| `occupation_data.csv` | 1,016 | `O*NET-SOC Code` | `Title`, `Description` | Master career definitions & official occupational summaries |
| `career_interest_types.csv` | 6,096 | `O*NET-SOC Code` | `Element Name` (RIASEC), `Data Value` | Holland Vocational Interest alignment scores |
| `essential_skills.csv` | 35,560 | `O*NET-SOC Code` | `Element Name`, `Scale ID` (IM), `Data Value` | Top essential skills with importance ratings (1.0 - 5.0) |
| `abilities.csv` | 52,832 | `O*NET-SOC Code` | `Element Name`, `Data Value` | Cognitive and operational abilities |
| `knowledge.csv` | 33,528 | `O*NET-SOC Code` | `Element Name`, `Data Value` | Core foundational knowledge domains (Computers, Math, Management) |
| `software_skills.csv` | 44,792 | `O*NET-SOC Code` | `Workplace Example`, `In Demand`, `Hot Technology` | In-demand tools, frameworks, and programming languages |
| `education.csv` | 12,192 | `O*NET-SOC Code` | `Category`, `Data Value` (Percentage) | Real-world educational attainment breakdown |
| `education_categories.csv` | 24 | `Category` | `Category Description` | Human-readable descriptions for educational attainment categories |
| `work_styles.csv` | 16,256 | `O*NET-SOC Code` | `Element Name`, `Data Value` | Key behavioral work styles (Analytical Thinking, Attention to Detail) |
| `related_occupations.csv` | 10,160 | `O*NET-SOC Code` | `Related O*NET-SOC Code`, `Related Title` | Cross-domain career pathways and lateral mobility recommendations |

### 2.3 Ground-Truth vs Training Data Distinction
The O*NET database describes **occupations**, not individual candidates. It contains analyst ratings and employer surveys characterizing what each occupation entails. It does **not** contain individual student survey responses, questionnaires, or candidate outcome records.

In CareerPath AI, the supervised Machine Learning models predict the target career domain from candidate inputs; the O*NET database is then queried to enrich the prediction with genuine occupational intelligence, required skills, and learning benchmarks.

---

## 3. Candidate Assessment Benchmark Dataset

### 3.1 Dataset Overview
To train and benchmark supervised classification models that map psychometric profiles and natural language descriptions to target career disciplines, a benchmark dataset of **1,200 candidate records** was structured across **8 core IT/Computing career domains** (150 balanced records per class).

- **Location**: `data/career_training_dataset.csv`
- **Total Samples**: 1,200
- **Missing Values**: 0
- **Duplicate Records**: 0
- **Class Balance**: Perfectly balanced ($N=150$ per class)
- **Train/Test Partition**: 80% Development partition ($N=960$) / 20% Untouched Test partition ($N=240$) using stratified sampling with seed `random_state=42`.

### 3.2 Feature Specification

| Feature Name | Type | Scale / Range | Description |
|---|---|---|---|
| `math_interest` | Numerical (Integer) | 1 to 5 | Interest in Mathematics, Calculus, and Quantitative Reasoning |
| `programming_interest` | Numerical (Integer) | 1 to 5 | Interest in Coding, Algorithms, and Software Construction |
| `creativity_design_interest` | Numerical (Integer) | 1 to 5 | Interest in Visual Aesthetics, UI/UX, and Prototyping |
| `social_communication_interest` | Numerical (Integer) | 1 to 5 | Interest in Client Interaction, Teamwork, and Speaking |
| `data_analysis_interest` | Numerical (Integer) | 1 to 5 | Interest in Datasets, Pattern Recognition, and SQL/BI |
| `problem_solving_interest` | Numerical (Integer) | 1 to 5 | Interest in Logical Troubleshooting and Deconstruction |
| `leadership_management_interest` | Numerical (Integer) | 1 to 5 | Interest in Project Delivery, Agile Coordination, and Strategy |
| `career_goal_description` | Text (NLP) | String (max 2,000 chars) | Natural language description of interests, tools, and aspirations |
| `career_label` (Target) | Categorical | 8 Classes | Target Computing Discipline |

### 3.3 Class Mapping to Official O*NET Standards

1. **Software Development** $\rightarrow$ `O*NET-SOC: 15-1252.00` (Software Developers)
2. **Data Science & Machine Learning** $\rightarrow$ `O*NET-SOC: 15-2051.00` (Data Scientists)
3. **Data Analytics & Business Intelligence** $\rightarrow$ `O*NET-SOC: 15-2051.01` (Business Intelligence Analysts)
4. **UI/UX Design & Frontend Systems** $\rightarrow$ `O*NET-SOC: 15-1255.00` (Web and Digital Interface Designers)
5. **Cloud & DevOps Engineering** $\rightarrow$ `O*NET-SOC: 15-1244.00` (Network and Computer Systems Administrators)
6. **Cybersecurity & Information Security** $\rightarrow$ `O*NET-SOC: 15-1212.00` (Information Security Analysts)
7. **Product & IT Project Management** $\rightarrow$ `O*NET-SOC: 15-1299.09` (Information Technology Project Managers)
8. **Business Analysis & Systems Architecture** $\rightarrow$ `O*NET-SOC: 15-1211.00` (Computer Systems Analysts)

---

## 4. Limitations and Ethical Disclosures

1. **Synthetic Nature of Training Benchmark**: The 1,200 candidate assessment records in `career_training_dataset.csv` represent a synthetic benchmark dataset generated from Gaussian distributions and domain vocabulary templates. While effective for validating multi-modal feature fusion, algorithm comparison, and explainability pipelines, it cannot substitute for empirical longitudinal career outcome data.
2. **Exploratory Guidance Scope**: Recommendations and match scores reflect statistical similarity within our reference feature space. They are intended as exploratory career advisory guidance and must not be presented as certified psychometric aptitude evaluations.
