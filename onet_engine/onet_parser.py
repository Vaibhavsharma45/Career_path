"""
O*NET 31.0 Data Parser & Occupational Profile Builder
CareerPath AI Platform

Extracts structured occupational intelligence from official O*NET 31.0 CSV files:
- Standard Occupational Classification (SOC) taxonomies
- Essential skills, cognitive abilities, and foundational knowledge domains
- In-demand workplace technologies and hot software tools
- Holland RIASEC vocational interest scores
- Educational attainment distribution
- Behavioral work styles and related lateral occupations
- Job Zone classification and preparation requirements
- Structured 3-stage learning roadmaps, portfolio projects, and authoritative learning resources
"""

import os
import json
import pandas as pd

RAW_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'onet_raw', 'db_31_0_csv')
OUT_FILE = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'onet_processed', 'onet_career_profiles.json')

# Domain mapping enriched with O*NET Job Zones, work activities, project briefs, and reliable resources
DOMAIN_MAPPING = {
    "Software Development": {
        "soc_code": "15-1252.00",
        "alt_soc": ["15-1254.00", "15-1253.00"],
        "icon": "code",
        "category": "Engineering & Technology",
        "job_zone": {
            "zone": 4,
            "title": "Considerable Preparation Needed",
            "education": "Most occupations in this zone require a four-year bachelor's degree.",
            "experience": "A considerable amount of work-related skill, knowledge, or experience is needed (typically 2 to 4 years).",
            "training": "Employees in these occupations usually need several years of work-related experience, on-the-job training, and/or vocational training."
        },
        "work_activities": [
            "Write, update, and maintain computer software programs and applications.",
            "Consult with managerial, engineering, and technical personnel to clarify system intent and identify problems.",
            "Analyze user needs and software requirements to determine feasibility of design within time and cost constraints.",
            "Design, develop, and test software systems using scientific analysis and mathematical models.",
            "Store, retrieve, and manipulate data for analysis of system capabilities and requirements."
        ],
        "stages": {
            "beginner": {
                "title": "Stage 1: Foundations & Algorithmic Thinking",
                "duration": "Months 1–3",
                "topics": ["Data Structures & Algorithms", "Core Language Mastery (Python/Java/C++)", "Object-Oriented Design Principles", "Git & Version Control Workflows"],
                "milestone": "Build CLI utilities and solve structured algorithmic problems with clean, tested code."
            },
            "intermediate": {
                "title": "Stage 2: Full-Stack Architecture & APIs",
                "duration": "Months 4–6",
                "topics": ["RESTful API Engineering", "Relational & NoSQL Database Schema Design", "Frontend Component Architecture (React/TypeScript)", "Automated Unit & Integration Testing"],
                "milestone": "Develop a multi-tier web application with secure authentication and persistent data storage."
            },
            "advanced": {
                "title": "Stage 3: Scalability, Systems & Cloud Deployment",
                "duration": "Months 7–12",
                "topics": ["Distributed Systems Design", "Containerization with Docker & Kubernetes", "CI/CD Deployment Automation", "Performance Profiling & Observability"],
                "milestone": "Deploy a containerized microservices platform with automated CI/CD and metrics instrumentation."
            }
        },
        "portfolio_projects": [
            {
                "title": "Distributed Task Queue & Background Worker",
                "level": "Intermediate",
                "tech": ["Python / FastAPI", "Redis", "Celery / Docker", "PostgreSQL"],
                "description": "Architect an asynchronous background task processing engine supporting retry mechanisms, rate-limiting, and real-time status dashboards."
            },
            {
                "title": "Full-Stack Collaborative Workspace",
                "level": "Advanced",
                "tech": ["React / Next.js", "TypeScript", "Node.js / WebSockets", "Tailwind CSS"],
                "description": "Build a real-time collaborative document editor with operational transformation, rich markdown rendering, and team workspace management."
            }
        ],
        "learning_resources": [
            {"name": "Mozilla Developer Network (MDN Web Docs)", "type": "Documentation", "focus": "HTML, CSS, JavaScript & Web APIs"},
            {"name": "Python.org Official Documentation & Tutorial", "type": "Official Guide", "focus": "Core Python Syntax & Standard Library"},
            {"name": "Docker Official Documentation", "type": "Documentation", "focus": "Containerization & Multi-stage Builds"}
        ]
    },
    "Data Science & Machine Learning": {
        "soc_code": "15-2051.00",
        "alt_soc": ["15-2031.00"],
        "icon": "brain",
        "category": "Data & AI",
        "job_zone": {
            "zone": 5,
            "title": "Extensive Preparation Needed",
            "education": "Most of these occupations require graduate school. For example, they may require a master's degree, and some require a Ph.D., M.D., or J.D.",
            "experience": "Extensive skill, knowledge, and experience are needed for these occupations (over 4 years).",
            "training": "Employees may need some on-the-job training, but the person will usually have the needed skills upon hire."
        },
        "work_activities": [
            "Develop machine learning models, statistical algorithms, and predictive systems.",
            "Analyze large amounts of structured and unstructured data to identify patterns and trends.",
            "Clean, prepare, and validate data for analysis and model training.",
            "Collaborate with engineering teams to deploy models into production environments.",
            "Communicate complex quantitative findings to technical and non-technical stakeholders."
        ],
        "stages": {
            "beginner": {
                "title": "Stage 1: Mathematical Foundations & Data Wrangling",
                "duration": "Months 1–3",
                "topics": ["Linear Algebra & Matrix Operations", "Probability Distributions & Hypothesis Testing", "Python for Data Science (NumPy, Pandas)", "Exploratory Data Analysis (EDA) & Visualization"],
                "milestone": "Conduct rigorous statistical analysis and EDA on multi-dimensional real-world datasets."
            },
            "intermediate": {
                "title": "Stage 2: Supervised & Unsupervised Machine Learning",
                "duration": "Months 4–6",
                "topics": ["Classification & Regression Algorithms", "Feature Engineering & Dimensionality Reduction", "Cross-Validation & Hyperparameter Optimization", "Ensemble Methods (Random Forest, XGBoost)"],
                "milestone": "Build and evaluate an end-to-end predictive modeling pipeline with leakage-free cross-validation."
            },
            "advanced": {
                "title": "Stage 3: Deep Learning, NLP & MLOps",
                "duration": "Months 7–12",
                "topics": ["PyTorch / TensorFlow Neural Networks", "Natural Language Processing (Transformers, TF-IDF, Embeddings)", "Model Serving with FastAPI & Docker", "Model Monitoring, Drift Detection & MLflow"],
                "milestone": "Deploy a containerized deep learning inference service with experiment tracking and automated validation."
            }
        },
        "portfolio_projects": [
            {
                "title": "Customer Churn Prediction & Explainability Engine",
                "level": "Intermediate",
                "tech": ["Python", "Scikit-Learn", "SHAP / LIME", "Pandas", "Matplotlib"],
                "description": "Train ensemble classifiers to predict customer churn, computing local and global feature attribution to explain driving risk factors to business leaders."
            },
            {
                "title": "NLP Semantic Document Classifier & Search Engine",
                "level": "Advanced",
                "tech": ["PyTorch", "HuggingFace Transformers", "FastAPI", "Vector DB (FAISS/Chroma)"],
                "description": "Construct an embedding-based semantic retrieval and categorization API capable of indexing and querying dense document collections in sub-second latency."
            }
        ],
        "learning_resources": [
            {"name": "Scikit-Learn Official User Guide", "type": "Documentation", "focus": "Classical ML Algorithms, Preprocessing & Evaluation"},
            {"name": "PyTorch Official Tutorials", "type": "Tutorials", "focus": "Tensors, Neural Networks & Deep Learning Workflows"},
            {"name": "Kaggle Learn Micro-Courses", "type": "Interactive Courses", "focus": "Hands-on Data Manipulation, ML & Feature Engineering"}
        ]
    },
    "Data Analytics & Business Intelligence": {
        "soc_code": "15-2051.01",
        "alt_soc": ["15-2041.00"],
        "icon": "bar-chart-2",
        "category": "Data & Insights",
        "job_zone": {
            "zone": 4,
            "title": "Considerable Preparation Needed",
            "education": "Most occupations in this zone require a four-year bachelor's degree.",
            "experience": "A considerable amount of work-related skill, knowledge, or experience is needed (typically 2 to 4 years).",
            "training": "Employees usually need several years of experience in data analysis, business operations, or software systems."
        },
        "work_activities": [
            "Synthesize current business intelligence or trend data to support recommendations for action.",
            "Manage the flow of reporting data across departments and executive stakeholders.",
            "Create business intelligence reports and interactive dashboards depicting trends and KPIs.",
            "Query relational databases using complex SQL queries to extract and transform data.",
            "Communicate data insights and recommendations to non-technical business leaders."
        ],
        "stages": {
            "beginner": {
                "title": "Stage 1: Advanced SQL & Data Manipulation",
                "duration": "Months 1–3",
                "topics": ["Advanced SQL (Joins, Window Functions, Subqueries, CTEs)", "Relational Database Normalization & Modeling", "Advanced Excel (Power Query, Pivot Tables, Formulas)", "Descriptive Statistics & Business Metrics"],
                "milestone": "Query enterprise database schemas to answer business questions and validate data integrity."
            },
            "intermediate": {
                "title": "Stage 2: BI Platforms & Dashboard Architecture",
                "duration": "Months 4–6",
                "topics": ["Power BI / Tableau Interactive Dashboard Design", "Star Schema & Dimensional Data Modeling", "DAX Formulas & Calculated Measures", "Executive Data Storytelling & Presentation"],
                "milestone": "Design an executive dashboard suite tracking core KPIs, conversion funnels, and revenue metrics."
            },
            "advanced": {
                "title": "Stage 3: Advanced Analytics & Cloud Warehousing",
                "duration": "Months 7–12",
                "topics": ["Python for Analytics (Pandas, Plotly)", "A/B Testing & Statistical Experimentation", "Cloud Data Warehouses (Snowflake / BigQuery)", "Automated ETL Data Pipelines"],
                "milestone": "Build an end-to-end analytics workflow extracting data from cloud warehouses into automated executive reports."
            }
        },
        "portfolio_projects": [
            {
                "title": "Executive E-Commerce Revenue & Retention Dashboard",
                "level": "Intermediate",
                "tech": ["Power BI / Tableau", "SQL", "Excel Power Query", "DAX"],
                "description": "Construct an interactive multi-page executive BI dashboard analyzing customer cohort retention, average order value, and product category trends."
            },
            {
                "title": "A/B Test Experimentation & Statistical Significance Suite",
                "level": "Advanced",
                "tech": ["Python", "Pandas", "SciPy (Stats)", "Streamlit"],
                "description": "Develop an interactive experimentation calculator that evaluates hypothesis testing, sample size calculations, p-values, and statistical power for product decisions."
            }
        ],
        "learning_resources": [
            {"name": "Microsoft Power BI Guided Learning", "type": "Official Guide", "focus": "Data Modeling, DAX & Visual Design"},
            {"name": "PostgreSQL Official Documentation", "type": "Documentation", "focus": "Relational Querying, Indexes & Window Functions"},
            {"name": "SQLBolt & Mode Analytics SQL Guide", "type": "Interactive Guide", "focus": "Applied Business SQL Practice"}
        ]
    },
    "UI/UX Design & Frontend Systems": {
        "soc_code": "15-1255.00",
        "alt_soc": ["15-1254.00"],
        "icon": "layout",
        "category": "Design & Interactive Tech",
        "job_zone": {
            "zone": 3,
            "title": "Medium Preparation Needed",
            "education": "Most occupations in this zone require training in vocational schools, related on-the-job experience, or an associate's degree. Some require a bachelor's degree.",
            "experience": "Previous work-related skill, knowledge, or experience is required for these occupations (1 to 2 years).",
            "training": "Employees usually need one or two years of training involving both on-the-job experience and informal training with experienced workers."
        },
        "work_activities": [
            "Design, build, or maintain websites and digital user interfaces using authoring or scripting languages.",
            "Perform user research, usability testing, and synthesize behavioral feedback.",
            "Develop design systems, wireframes, component libraries, and interactive prototypes.",
            "Collaborate with developers to ensure technical feasibility and accessible design implementation.",
            "Incorporate responsive design standards, visual hierarchy, and cross-browser compatibility."
        ],
        "stages": {
            "beginner": {
                "title": "Stage 1: User-Centered Design Principles & Figma",
                "duration": "Months 1–3",
                "topics": ["User Research, Personas & User Journey Mapping", "Wireframing, Information Architecture & User Flows", "Figma Components, Auto-Layout & Design Tokens", "Color Theory, Typography & Spacing Systems"],
                "milestone": "Create clickable low-fidelity and high-fidelity prototypes based on conducted user interviews."
            },
            "intermediate": {
                "title": "Stage 2: Frontend Engineering & Design Systems",
                "duration": "Months 4–6",
                "topics": ["Semantic HTML5 & Modern CSS3 (Flexbox, CSS Grid)", "Tailwind CSS & Responsive Layouts", "JavaScript (ES6+) Fundamentals", "Accessibility Guidelines (WCAG 2.1 AA Compliance)"],
                "milestone": "Code responsive, accessible frontend landing pages and interactive components matching Figma specs."
            },
            "advanced": {
                "title": "Stage 3: Advanced Component Architecture & Usability Testing",
                "duration": "Months 7–12",
                "topics": ["React.js Component Architecture & State Management", "Micro-Interactions & Motion Design", "Usability Testing & Feedback Synthesis", "End-to-End Design-to-Code Systems"],
                "milestone": "Publish a comprehensive product UX case study backed by quantitative usability testing and working React UI."
            }
        },
        "portfolio_projects": [
            {
                "title": "Accessible SaaS Component Design System & Documentation",
                "level": "Intermediate",
                "tech": ["Figma", "HTML5 / Tailwind CSS", "Storybook", "WCAG 2.1"],
                "description": "Design and document an accessible component library complete with variants, interactive states, design tokens, and coded documentation."
            },
            {
                "title": "Mobile Healthcare Patient Portal Case Study",
                "level": "Advanced",
                "tech": ["Figma", "User Research", "Usability Testing", "React Native / React UI"],
                "description": "Conduct end-to-end product design from user discovery interviews and wireframes to usability test iterations and final responsive frontend prototype."
            }
        ],
        "learning_resources": [
            {"name": "Nielsen Norman Group (NN/g) UX Articles", "type": "Industry Standard", "focus": "Usability Heuristics & Research Methodologies"},
            {"name": "Figma Official Learn Hub", "type": "Interactive Guides", "focus": "Auto-Layout, Components & Interactive Prototyping"},
            {"name": "W3C Web Accessibility Initiative (WAI)", "type": "Standards", "focus": "WCAG 2.1 Guidelines & Accessible Design"}
        ]
    },
    "Cloud & DevOps Engineering": {
        "soc_code": "15-1244.00",
        "alt_soc": ["15-1242.00"],
        "icon": "cloud",
        "category": "Infrastructure & Operations",
        "job_zone": {
            "zone": 4,
            "title": "Considerable Preparation Needed",
            "education": "Most occupations in this zone require a four-year bachelor's degree.",
            "experience": "A considerable amount of work-related skill, knowledge, or experience is needed (typically 2 to 4 years).",
            "training": "Employees usually need several years of experience in system administration, networking, or infrastructure."
        },
        "work_activities": [
            "Maintain and administer computer networks and related computing environments.",
            "Implement automated configuration management, deployment pipelines, and server provisioning.",
            "Configure, monitor, and maintain cloud infrastructure and virtualized compute instances.",
            "Troubleshoot network architecture, security access rules, and system uptime bottlenecks.",
            "Implement site reliability practices, disaster recovery plans, and zero-downtime deployments."
        ],
        "stages": {
            "beginner": {
                "title": "Stage 1: Linux Systems, Bash & Networking",
                "duration": "Months 1–3",
                "topics": ["Linux System Administration & Command Line Mastery", "Bash Scripting for System Automation", "Networking Fundamentals (TCP/IP, DNS, HTTP/S, SSL/TLS)", "Git Branching Strategies & Repository Management"],
                "milestone": "Configure a secure Linux server environment and automate routine administration with Bash."
            },
            "intermediate": {
                "title": "Stage 2: Containers & Cloud Foundations",
                "duration": "Months 4–6",
                "topics": ["Docker Containerization & Image Optimization", "AWS / Azure Cloud Core Services (Compute, VPC, S3, IAM)", "CI/CD Pipelines (GitHub Actions / GitLab CI)", "Infrastructure Monitoring & Log Aggregation"],
                "milestone": "Build an automated CI/CD pipeline that builds, tests, and deploys containerized applications."
            },
            "advanced": {
                "title": "Stage 3: Infrastructure as Code & Orchestration",
                "duration": "Months 7–12",
                "topics": ["Infrastructure as Code (Terraform / CloudFormation)", "Kubernetes (K8s) Cluster Architecture & Helm Charts", "Site Reliability Engineering (SLO/SLA, Observability)", "Disaster Recovery & Multi-Region High Availability"],
                "milestone": "Provision a multi-node Kubernetes cluster on cloud infrastructure using declarative Terraform code."
            }
        },
        "portfolio_projects": [
            {
                "title": "Automated Multi-Environment CI/CD Pipeline",
                "level": "Intermediate",
                "tech": ["GitHub Actions", "Docker", "AWS ECS / Cloud Run", "Linux Bash"],
                "description": "Construct an automated pipeline triggering automated test suites, linting, Docker image vulnerability scanning, and zero-downtime deployment."
            },
            {
                "title": "Declarative Infrastructure Provisioning with Terraform & K8s",
                "level": "Advanced",
                "tech": ["Terraform", "AWS / Azure", "Kubernetes", "Prometheus / Grafana"],
                "description": "Author modular Infrastructure-as-Code scripts that provision VPC networking, managed Kubernetes clusters, and monitoring dashboards."
            }
        ],
        "learning_resources": [
            {"name": "Kubernetes Official Documentation & Interactive Tutorials", "type": "Documentation", "focus": "Pods, Deployments, Services & Ingress"},
            {"name": "HashiCorp Terraform Tutorials", "type": "Tutorials", "focus": "Declarative IaC, State Management & Cloud Providers"},
            {"name": "AWS Skill Builder & Documentation", "type": "Official Training", "focus": "Cloud Architecture, Compute & Security"}
        ]
    },
    "Cybersecurity & Information Security": {
        "soc_code": "15-1212.00",
        "alt_soc": ["11-3013.01"],
        "icon": "shield",
        "category": "Security & Risk",
        "job_zone": {
            "zone": 4,
            "title": "Considerable Preparation Needed",
            "education": "Most occupations in this zone require a four-year bachelor's degree.",
            "experience": "A considerable amount of work-related skill, knowledge, or experience is needed (typically 2 to 4 years).",
            "training": "Employees usually need several years of experience in system administration, networking, or threat analysis."
        },
        "work_activities": [
            "Monitor organization networks for security breaches and investigate violations when they occur.",
            "Install and use software, such as firewalls and data encryption programs, to protect sensitive information.",
            "Prepare reports that document security breaches and the extent of the damage caused by the breaches.",
            "Conduct penetration testing and vulnerability scans to identify system weaknesses.",
            "Research security enhancements and make recommendations to management."
        ],
        "stages": {
            "beginner": {
                "title": "Stage 1: Security Fundamentals & Network Analysis",
                "duration": "Months 1–3",
                "topics": ["Network Security & Packet Inspection (Wireshark)", "Operating System Hardening (Linux & Windows)", "Cryptography Fundamentals (Hashing, Symmetric, Asymmetric)", "Threat Modeling & Security Principles (Confidentiality, Integrity, Availability)"],
                "milestone": "Inspect and diagnose network protocol vulnerabilities and configure secure host firewalls."
            },
            "intermediate": {
                "title": "Stage 2: Vulnerability Assessment & Defensive Ops",
                "duration": "Months 4–6",
                "topics": ["OWASP Top 10 Web Application Vulnerabilities", "Vulnerability Scanning & Penetration Tools (Nmap, Burp Suite)", "Identity & Access Management (IAM, MFA, OAuth2)", "Security Information & Event Management (SIEM Log Analysis)"],
                "milestone": "Perform an authorized security audit on a simulated web application and draft remediation reports."
            },
            "advanced": {
                "title": "Stage 3: Incident Response, Forensics & Cloud Security",
                "duration": "Months 7–12",
                "topics": ["Digital Forensics & Incident Response (DFIR Frameworks)", "Cloud Security Architecture & Zero Trust Policies", "Malware Analysis Fundamentals & Threat Intelligence", "Security Compliance & Risk Governance (ISO 27001, NIST)"],
                "milestone": "Design an enterprise incident response playbook and configure intrusion detection rules."
            }
        },
        "portfolio_projects": [
            {
                "title": "Web Application Security Vulnerability Audit Report",
                "level": "Intermediate",
                "tech": ["OWASP ZAP", "Burp Suite", "Nmap", "Markdown / LaTeX"],
                "description": "Conduct a vulnerability assessment on an intentionally vulnerable target application (DVWA/Juice Shop), documenting attack vectors and remediation steps."
            },
            {
                "title": "SIEM Threat Detection & Incident Monitoring Lab",
                "level": "Advanced",
                "tech": ["Splunk / Elastic SIEM", "Suricata / Snort", "Linux Syslog", "Python"],
                "description": "Deploy a centralized security logging environment with custom alerting rules that detect brute-force attacks and abnormal network traffic."
            }
        ],
        "learning_resources": [
            {"name": "OWASP Foundation Cheat Sheet Series", "type": "Industry Standard", "focus": "Web Security, Secure Coding & Vulnerability Prevention"},
            {"name": "NIST Computer Security Resource Center (CSRC)", "type": "Standards", "focus": "Risk Management Framework & Incident Response"},
            {"name": "PortSwigger Web Security Academy", "type": "Interactive Labs", "focus": "Free Hands-on Web Application Security Practice"}
        ]
    },
    "Product & IT Project Management": {
        "soc_code": "15-1299.09",
        "alt_soc": ["11-1021.00"],
        "icon": "briefcase",
        "category": "Management & Strategy",
        "job_zone": {
            "zone": 4,
            "title": "Considerable Preparation Needed",
            "education": "Most occupations in this zone require a four-year bachelor's degree.",
            "experience": "A considerable amount of work-related skill, knowledge, or experience is needed (typically 2 to 4 years).",
            "training": "Employees usually need several years of experience in project delivery, business analysis, or technical leadership."
        },
        "work_activities": [
            "Develop and manage work breakdown structure of information technology projects.",
            "Direct and coordinate activities of project personnel to ensure project progresses on schedule and within budget.",
            "Establish and maintain communication with stakeholders, clients, and technical leads.",
            "Assign and oversee technical project personnel, coordinating sprint planning and retrospectives.",
            "Monitor and track project milestones, deliverables, and operational risks."
        ],
        "stages": {
            "beginner": {
                "title": "Stage 1: Agile Foundations & SDLC Methodologies",
                "duration": "Months 1–3",
                "topics": ["Software Development Life Cycle (SDLC) Models", "Scrum Framework & Kanban Principles", "Jira & Confluence Sprint Management", "User Story Authoring & Acceptance Criteria"],
                "milestone": "Lead simulated sprint ceremonies, backlog refinement, and write unambiguous user stories."
            },
            "intermediate": {
                "title": "Stage 2: Product Discovery & Stakeholder Strategy",
                "duration": "Months 4–6",
                "topics": ["Product Requirements Document (PRD) Drafting", "Market Research & Competitive Landscape Analysis", "Product Metrics, KPIs & OKRs (CAC, LTV, Retention)", "Stakeholder Alignment & Negotiation Techniques"],
                "milestone": "Author a comprehensive Product Requirements Document for a proposed technical product."
            },
            "advanced": {
                "title": "Stage 3: Roadmapping, Release & Program Management",
                "duration": "Months 7–12",
                "topics": ["Strategic Product Roadmapping & Prioritization Matrix (RICE)", "Risk Management & Mitigation Strategies", "Go-To-Market (GTM) Planning & Launch Execution", "Technical Communication & Cross-Functional Team Leadership"],
                "milestone": "Deliver a complete product strategy portfolio including GTM plan, roadmap, and risk matrix."
            }
        },
        "portfolio_projects": [
            {
                "title": "Complete Product Requirements Document (PRD) & Roadmap",
                "level": "Intermediate",
                "tech": ["Jira / Confluence", "Figma Flowcharts", "Product Roadmap", "RICE Prioritization"],
                "description": "Author an executive-ready PRD defining problem statements, user personas, functional specifications, metric goals, and phased delivery milestones."
            },
            {
                "title": "Agile Sprint Backlog & Delivery Program Simulation",
                "level": "Advanced",
                "tech": ["Agile / Scrum", "Jira Software", "Velocity Metrics", "Risk Register"],
                "description": "Construct an end-to-end Jira sprint project with epics, estimated user stories, velocity burndown charts, and a risk mitigation register."
            }
        ],
        "learning_resources": [
            {"name": "Scrum Guide by Ken Schwaber & Jeff Sutherland", "type": "Official Standard", "focus": "Scrum Roles, Events & Artifacts"},
            {"name": "Atlassian Agile Coach Guides", "type": "Industry Guide", "focus": "Sprint Planning, Kanban, Estimation & Roadmaps"},
            {"name": "Product School Resources & Articles", "type": "Professional Articles", "focus": "PRD Templates, Product Strategy & Metrics"}
        ]
    },
    "Business Analysis & Systems Architecture": {
        "soc_code": "15-1211.00",
        "alt_soc": ["15-1243.00"],
        "icon": "cpu",
        "category": "Enterprise Architecture",
        "job_zone": {
            "zone": 4,
            "title": "Considerable Preparation Needed",
            "education": "Most occupations in this zone require a four-year bachelor's degree.",
            "experience": "A considerable amount of work-related skill, knowledge, or experience is needed (typically 2 to 4 years).",
            "training": "Employees usually need several years of experience in systems analysis, database design, or business operations."
        },
        "work_activities": [
            "Consult with managers to determine the role of an IT system in an organization.",
            "Research emerging technologies to decide if installing them can increase an organization's efficiency and effectiveness.",
            "Prepare cost-benefit analyses for IT implementations and software upgrades.",
            "Design solutions to help an organization's computer systems operate more efficiently.",
            "Oversee the installation and configuration of new systems and conduct feasibility tests."
        ],
        "stages": {
            "beginner": {
                "title": "Stage 1: Business Analysis Foundations & Elicitation",
                "duration": "Months 1–3",
                "topics": ["BABOK Fundamentals & Business Needs Analysis", "Requirements Elicitation & Stakeholder Interviewing", "Process Modeling with BPMN 2.0 & Flowcharts", "Functional vs Non-Functional Requirements"],
                "milestone": "Map current-state vs future-state business processes and document requirements."
            },
            "intermediate": {
                "title": "Stage 2: Systems Modeling, Data & Integration",
                "duration": "Months 4–6",
                "topics": ["Unified Modeling Language (UML: Use Case, Sequence, Class Diagrams)", "Entity-Relationship Diagrams (ERD) & Data Flow Diagrams (DFD)", "SQL for Data Validation & Business Querying", "API Specifications & System Integration Principles"],
                "milestone": "Create comprehensive UML diagrams and ERDs specifying a multi-system enterprise software integration."
            },
            "advanced": {
                "title": "Stage 3: Enterprise Architecture & Feasibility Consulting",
                "duration": "Months 7–12",
                "topics": ["Feasibility Studies & Cost-Benefit Analysis (ROI / TCO)", "Enterprise Systems (ERP, CRM) Workflow Optimization", "Solution Assessment & Vendor Evaluation", "Organizational Change Management Strategies"],
                "milestone": "Produce an enterprise systems architecture proposal complete with ROI analysis and migration plans."
            }
        },
        "portfolio_projects": [
            {
                "title": "Enterprise Process Re-Engineering Specification (BPMN & DFD)",
                "level": "Intermediate",
                "tech": ["BPMN 2.0", "UML Modeling", "Lucidchart", "Functional Specs"],
                "description": "Model an existing legacy business process, identify operational friction points, and document optimized future-state workflows."
            },
            {
                "title": "ERP System Integration & Feasibility Study",
                "level": "Advanced",
                "tech": ["SQL", "ERD Modeling", "Cost-Benefit Analysis", "API Architecture"],
                "description": "Author an architectural feasibility document detailing data migration models, API contracts, risk assessments, and financial ROI projections."
            }
        ],
        "learning_resources": [
            {"name": "International Institute of Business Analysis (IIBA) Resources", "type": "Professional Standard", "focus": "BABOK Framework & Business Analysis Body of Knowledge"},
            {"name": "OMG Unified Modeling Language (UML) Specification", "type": "Standards", "focus": "Use Case, Activity & Sequence Diagram Standards"},
            {"name": "BPMN.org Process Modeling Guidelines", "type": "Industry Guide", "focus": "Business Process Model and Notation (BPMN 2.0)"}
        ]
    }
}

def load_onet_data():
    print(f"Loading O*NET 31.0 raw data from: {RAW_DIR}")
    
    # 1. Occupations
    occ_df = pd.read_csv(os.path.join(RAW_DIR, 'occupation_data.csv'))
    print(f"Loaded {len(occ_df)} occupations.")
    
    # 2. Skills
    skills_df = pd.read_csv(os.path.join(RAW_DIR, 'essential_skills.csv'))
    skills_im = skills_df[skills_df['Scale ID'] == 'IM'].copy()
    
    # 3. Abilities
    abilities_df = pd.read_csv(os.path.join(RAW_DIR, 'abilities.csv'))
    abilities_im = abilities_df[abilities_df['Scale ID'] == 'IM'].copy()
    
    # 4. Interests (Holland RIASEC)
    interests_df = pd.read_csv(os.path.join(RAW_DIR, 'career_interest_types.csv'))
    
    # 5. Knowledge (IM scale)
    knowledge_df = pd.read_csv(os.path.join(RAW_DIR, 'knowledge.csv'))
    knowledge_im = knowledge_df[knowledge_df['Scale ID'] == 'IM'].copy()
    
    # 6. Software / In-Demand & Hot Tech
    soft_df = pd.read_csv(os.path.join(RAW_DIR, 'software_skills.csv'))
    
    # 7. Education
    edu_df = pd.read_csv(os.path.join(RAW_DIR, 'education.csv'))
    edu_cat_df = pd.read_csv(os.path.join(RAW_DIR, 'education_categories.csv'))
    edu_cat_map = dict(zip(edu_cat_df['Category'], edu_cat_df['Category Description']))
    
    # 8. Work Styles
    work_df = pd.read_csv(os.path.join(RAW_DIR, 'work_styles.csv'))
    
    # 9. Related Occupations
    rel_df = pd.read_csv(os.path.join(RAW_DIR, 'related_occupations.csv'))
    
    profiles = {}
    
    GENERIC_EXCLUDE = {'Adobe Acrobat', 'Microsoft Word', 'Microsoft PowerPoint'}
    
    for domain_name, meta in DOMAIN_MAPPING.items():
        soc = meta["soc_code"]
        
        # Basic Info
        occ_row = occ_df[occ_df['O*NET-SOC Code'] == soc]
        if occ_row.empty:
            print(f"Warning: SOC {soc} not found for {domain_name}")
            continue
        title = occ_row.iloc[0]['Title']
        desc = occ_row.iloc[0]['Description']
        
        # Skills (Top 8 by Importance)
        dom_skills = skills_im[skills_im['O*NET-SOC Code'] == soc].sort_values('Data Value', ascending=False)
        top_skills = [
            {"name": r['Element Name'], "score": round(float(r['Data Value']), 2)}
            for _, r in dom_skills.head(8).iterrows()
        ]
        
        # Abilities (Top 6 by Importance)
        dom_abilities = abilities_im[abilities_im['O*NET-SOC Code'] == soc].sort_values('Data Value', ascending=False)
        top_abilities = [
            {"name": r['Element Name'], "score": round(float(r['Data Value']), 2)}
            for _, r in dom_abilities.head(6).iterrows()
        ]
        
        # Knowledge (Top 6 by Importance)
        dom_knowledge = knowledge_im[knowledge_im['O*NET-SOC Code'] == soc].sort_values('Data Value', ascending=False)
        top_knowledge = [
            {"name": r['Element Name'], "score": round(float(r['Data Value']), 2)}
            for _, r in dom_knowledge.head(6).iterrows()
        ]
        
        # Interests (RIASEC)
        dom_interests = interests_df[interests_df['O*NET-SOC Code'] == soc]
        riasec_dict = {}
        for _, r in dom_interests.iterrows():
            elem = r['Element Name']
            if elem in ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional']:
                riasec_dict[elem] = round(float(r['Data Value']), 2)
        
        # In-Demand & Hot Technologies (Prioritizing In-Demand tools)
        soc_soft = soft_df[soft_df['O*NET-SOC Code'] == soc]
        in_demand_tools = soc_soft[soc_soft['In Demand'] == 'Y']['Workplace Example'].dropna().unique().tolist()
        hot_tech_tools = soc_soft[soc_soft['Hot Technology'] == 'Y']['Workplace Example'].dropna().unique().tolist()
        
        prioritized_tech = []
        for tool in in_demand_tools + hot_tech_tools:
            if tool not in prioritized_tech and tool not in GENERIC_EXCLUDE:
                prioritized_tech.append(tool)
        if len(prioritized_tech) < 8:
            for tool in soc_soft['Workplace Example'].dropna().unique().tolist():
                if tool not in prioritized_tech and tool not in GENERIC_EXCLUDE:
                    prioritized_tech.append(tool)
        hot_tech = prioritized_tech[:14]
            
        # Education Breakdown
        dom_edu = edu_df[edu_df['O*NET-SOC Code'] == soc]
        edu_list = []
        for _, r in dom_edu.iterrows():
            cat_id = r['Category']
            pct = round(float(r['Data Value']), 1)
            cat_name = edu_cat_map.get(cat_id, f"Category {cat_id}")
            if pct > 0.0:
                edu_list.append({"category": cat_name, "percentage": pct})
        edu_list = sorted(edu_list, key=lambda x: x['percentage'], reverse=True)
        
        # Work Styles (Top 5)
        dom_work = work_df[work_df['O*NET-SOC Code'] == soc].sort_values('Data Value', ascending=False)
        work_styles = [
            {"name": r['Element Name'], "score": round(float(r['Data Value']), 2)}
            for _, r in dom_work.head(5).iterrows()
        ]
        
        # Related Occupations (Top 5)
        dom_rel = rel_df[rel_df['O*NET-SOC Code'] == soc].sort_values('Index', ascending=True)
        related = [
            {"soc_code": r['Related O*NET-SOC Code'], "title": r['Related Title']}
            for _, r in dom_rel.head(5).iterrows()
        ]
        
        profiles[domain_name] = {
            "domain_name": domain_name,
            "onet_soc_code": soc,
            "onet_official_title": title,
            "description": desc,
            "category": meta["category"],
            "icon": meta["icon"],
            "job_zone": meta["job_zone"],
            "work_activities": meta["work_activities"],
            "top_skills": top_skills,
            "top_abilities": top_abilities,
            "top_knowledge": top_knowledge,
            "riasec_interests": riasec_dict,
            "hot_technologies": hot_tech,
            "education_distribution": edu_list,
            "work_styles": work_styles,
            "related_occupations": related,
            "learning_stages": meta["stages"],
            "portfolio_projects": meta["portfolio_projects"],
            "learning_resources": meta["learning_resources"],
            # Legacy 4-phase compatibility for roadmaps
            "curated_roadmap": [
                {"phase": meta["stages"]["beginner"]["title"], "duration": meta["stages"]["beginner"]["duration"], "topics": meta["stages"]["beginner"]["topics"]},
                {"phase": meta["stages"]["intermediate"]["title"], "duration": meta["stages"]["intermediate"]["duration"], "topics": meta["stages"]["intermediate"]["topics"]},
                {"phase": meta["stages"]["advanced"]["title"], "duration": meta["stages"]["advanced"]["duration"], "topics": meta["stages"]["advanced"]["topics"]},
                {"phase": "Stage 4: Portfolio Capstone & Career Launch", "duration": "Months 10–12", "topics": [p["title"] for p in meta["portfolio_projects"]] + ["Resume & Interview Prep", "Open Source & Networking"]}
            ]
        }
        print(f"Parsed O*NET profile: {domain_name} ({soc}) - Zone {meta['job_zone']['zone']}, {len(top_skills)} skills, {len(hot_tech)} tech")
        
    os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
    with open(OUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(profiles, f, indent=2)
    print(f"\nSaved {len(profiles)} career profiles to {OUT_FILE} successfully!")
    return profiles

if __name__ == '__main__':
    load_onet_data()
