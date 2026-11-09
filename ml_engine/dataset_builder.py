"""
Dataset Builder for CareerPath MCA Machine Learning Project
Builds a transparent, reproducible benchmark dataset of candidate ratings + text descriptions
mapped to 8 IT/Computing career domains aligned with O*NET 31.0 standards.
"""

import os
import random
import numpy as np
import pandas as pd

OUTPUT_CSV = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'career_training_dataset.csv')

# Set random seeds for strict reproducibility
np.random.seed(42)
random.seed(42)

# Rating feature columns (7 questions, 1-5 scale)
FEATURE_COLUMNS = [
    'math_interest',
    'programming_interest',
    'creativity_design_interest',
    'social_communication_interest',
    'data_analysis_interest',
    'problem_solving_interest',
    'leadership_management_interest'
]

# Profile distributions per career domain: (mean, std) for each of the 7 features
DOMAIN_PROFILES = {
    "Software Development": {
        'math_interest': (3.7, 0.7),
        'programming_interest': (4.7, 0.4),
        'creativity_design_interest': (2.8, 0.9),
        'social_communication_interest': (2.7, 0.8),
        'data_analysis_interest': (3.4, 0.8),
        'problem_solving_interest': (4.6, 0.5),
        'leadership_management_interest': (2.8, 0.8),
        'text_templates': [
            "I love building web and backend applications. I enjoy writing clean code in Python and Java, solving algorithmic puzzles, and understanding data structures.",
            "Passionate about software engineering and developing scalable apps. I spend my weekends coding side projects, contributing to Git repositories, and optimizing algorithms.",
            "My focus is on full-stack development and object-oriented programming. I like designing robust APIs, writing unit tests, and debugging complex software architectures.",
            "I enjoy solving algorithmic challenges on LeetCode. I want to build distributed software systems, mobile applications, and backend services.",
            "Writing software and building tools excites me. I am proficient in C++ and JavaScript, love modular code architecture, and enjoy solving logical bugs.",
            "Interested in software craftsmanship. I like working with microservices, database schemas, continuous integration, and shipping functional software."
        ],
        'keywords_pool': [
            "backend development", "full stack web apps", "clean code", "REST APIs", "data structures and algorithms",
            "debugging", "Git version control", "Java and C++", "software design patterns", "microservices"
        ]
    },
    "Data Science & Machine Learning": {
        'math_interest': (4.6, 0.5),
        'programming_interest': (4.4, 0.5),
        'creativity_design_interest': (2.6, 0.8),
        'social_communication_interest': (2.8, 0.8),
        'data_analysis_interest': (4.8, 0.4),
        'problem_solving_interest': (4.7, 0.4),
        'leadership_management_interest': (2.9, 0.8),
        'text_templates': [
            "I am fascinated by machine learning, artificial intelligence, and statistics. I love analyzing datasets with Pandas and building predictive models with Scikit-learn.",
            "Passionate about mathematical modeling and deep learning. I enjoy training neural networks, working with linear algebra, and exploring NLP pipelines.",
            "I love discovering patterns in complex datasets. I have strong statistical intuition, write Python scripts for model training, and want to build AI systems.",
            "Interested in predictive analytics, feature engineering, and statistical learning algorithms like Random Forests and Gradient Boosting.",
            "I enjoy experimenting with computer vision, natural language processing, and deep neural networks in PyTorch, backed by strong mathematics.",
            "My goal is to be a machine learning engineer. I enjoy statistical hypothesis testing, data wrangling, model evaluation, and researching AI advancements."
        ],
        'keywords_pool': [
            "machine learning models", "statistical analysis", "deep neural networks", "natural language processing",
            "Python NumPy Pandas", "feature engineering", "predictive modeling", "PyTorch Scikit-learn", "data science"
        ]
    },
    "Data Analytics & Business Intelligence": {
        'math_interest': (4.1, 0.6),
        'programming_interest': (3.3, 0.8),
        'creativity_design_interest': (3.2, 0.8),
        'social_communication_interest': (3.8, 0.7),
        'data_analysis_interest': (4.8, 0.4),
        'problem_solving_interest': (4.2, 0.6),
        'leadership_management_interest': (3.5, 0.8),
        'text_templates': [
            "I enjoy transforming raw business numbers into interactive visual dashboards. I love writing complex SQL queries and visualizing metrics in Power BI and Tableau.",
            "Passionate about business intelligence, exploratory data analysis, and translating corporate data into actionable growth strategies.",
            "I love working with Excel pivot tables, relational databases, and data storytelling. Helping teams understand trends through charts is my forte.",
            "My interest lies in KPI tracking, data warehousing, and writing SQL joins to solve business performance problems.",
            "I like analyzing user retention, marketing funnels, and sales data using Python, Tableau dashboards, and structured SQL reports.",
            "Strong passion for exploratory analysis, metric visualization, and presenting analytical findings clearly to managers and decision makers."
        ],
        'keywords_pool': [
            "SQL queries", "Power BI dashboards", "Tableau visualizations", "business metrics KPIs", "exploratory data analysis",
            "data warehousing", "Excel advanced modeling", "trend analysis", "actionable insights"
        ]
    },
    "UI/UX Design & Frontend Systems": {
        'math_interest': (2.3, 0.8),
        'programming_interest': (3.2, 0.8),
        'creativity_design_interest': (4.8, 0.4),
        'social_communication_interest': (4.1, 0.6),
        'data_analysis_interest': (2.7, 0.8),
        'problem_solving_interest': (3.8, 0.7),
        'leadership_management_interest': (3.2, 0.8),
        'text_templates': [
            "I am obsessed with intuitive user interfaces, beautiful typography, and digital product aesthetics. I love creating wireframes and interactive prototypes in Figma.",
            "Passionate about user research, empathetic UX design, and implementing responsive layouts using HTML5, modern CSS, and React components.",
            "I enjoy usability testing, designing design systems, and crafting delightful animations and user experiences across mobile and web platforms.",
            "My strengths are visual hierarchy, color theory, and human-computer interaction. I want to build accessible interfaces that users love.",
            "I love translating user pain points into seamless workflows. I work with Adobe XD and Figma, and write clean front-end CSS and JavaScript.",
            "Design thinking and customer empathy define my work. I enjoy user journey mapping, high-fidelity mockups, and micro-interactions."
        ],
        'keywords_pool': [
            "Figma wireframes", "user interface UI", "user experience UX research", "responsive CSS React", "prototyping design system",
            "typography color theory", "usability testing", "interaction design", "accessibility design thinking"
        ]
    },
    "Cloud & DevOps Engineering": {
        'math_interest': (3.3, 0.8),
        'programming_interest': (4.2, 0.6),
        'creativity_design_interest': (2.4, 0.8),
        'social_communication_interest': (3.0, 0.8),
        'data_analysis_interest': (3.5, 0.8),
        'problem_solving_interest': (4.6, 0.5),
        'leadership_management_interest': (3.3, 0.8),
        'text_templates': [
            "I am passionate about cloud infrastructure, server automation, and continuous delivery. I love working with Docker containers, Linux, and AWS services.",
            "I enjoy configuring CI/CD pipelines, automating infrastructure with Terraform, and deploying resilient microservices in Kubernetes clusters.",
            "Systems reliability and deployment automation are my core interests. I like Linux terminal scripting, network protocols, and cloud architecture.",
            "Interested in cloud orchestration, Dockerizing backend applications, monitoring uptime with Prometheus, and scaling cloud environments.",
            "I like building zero-downtime deployment pipelines, managing AWS EC2 and S3, and automating routine sysadmin tasks with Bash and Python.",
            "Passionate about Site Reliability Engineering (SRE), GitOps workflows, cluster networking, and maintaining high-availability servers."
        ],
        'keywords_pool': [
            "Docker containers", "Kubernetes cluster", "AWS cloud services", "CI/CD pipelines", "Terraform infrastructure as code",
            "Linux bash scripting", "system reliability SRE", "microservices deployment", "cloud networking"
        ]
    },
    "Cybersecurity & Information Security": {
        'math_interest': (3.6, 0.8),
        'programming_interest': (4.0, 0.7),
        'creativity_design_interest': (2.4, 0.8),
        'social_communication_interest': (2.9, 0.8),
        'data_analysis_interest': (3.8, 0.8),
        'problem_solving_interest': (4.8, 0.4),
        'leadership_management_interest': (3.3, 0.8),
        'text_templates': [
            "I am deeply interested in ethical hacking, penetration testing, and network defense. I enjoy analyzing packet captures with Wireshark and finding vulnerabilities.",
            "Passionate about information security, cryptography, and defending enterprise systems against malware and cyber threats.",
            "I like auditing web applications for OWASP security flaws, setting up firewalls, and exploring reverse engineering and threat intelligence.",
            "My focus is on digital forensics, secure code review, and protecting confidential user data from unauthorized cyber breaches.",
            "I love learning about security exploits, privilege escalation, Kali Linux security tools, and incident response procedures.",
            "Interested in zero-trust architecture, identity and access management (IAM), security operations center (SOC) log monitoring, and cryptography."
        ],
        'keywords_pool': [
            "ethical hacking penetration testing", "network security Wireshark", "OWASP vulnerabilities", "cryptography and hashing",
            "threat intelligence", "firewalls and SIEM", "Kali Linux defense", "incident response", "security auditing"
        ]
    },
    "Product & IT Project Management": {
        'math_interest': (2.8, 0.8),
        'programming_interest': (2.6, 0.8),
        'creativity_design_interest': (3.5, 0.8),
        'social_communication_interest': (4.8, 0.4),
        'data_analysis_interest': (3.6, 0.8),
        'problem_solving_interest': (4.2, 0.6),
        'leadership_management_interest': (4.8, 0.4),
        'text_templates': [
            "I excel at leading cross-functional tech teams, defining product vision, and managing software delivery sprints with Agile and Scrum methodologies.",
            "Passionate about product management, user empathy, sprint planning in Jira, and bridging the communication gap between engineers and executives.",
            "I enjoy stakeholder management, defining product roadmaps, tracking team velocity, and prioritizing features for market releases.",
            "My strength is in leadership, team coordination, conflict resolution, and delivering tech projects on schedule and within budget.",
            "I love driving product discovery, authoring clear Product Requirements Documents (PRD), and coordinating designer and developer teams.",
            "Experienced in team leadership, Agile rituals, release management, risk mitigation, and motivating colleagues to achieve product goals."
        ],
        'keywords_pool': [
            "Agile Scrum sprint planning", "product roadmap strategy", "cross-functional team leadership", "Jira backlog prioritization",
            "stakeholder communication", "PRD documentation", "project delivery management", "team coordination velocity"
        ]
    },
    "Business Analysis & Systems Architecture": {
        'math_interest': (3.4, 0.8),
        'programming_interest': (2.6, 0.8),
        'creativity_design_interest': (3.2, 0.8),
        'social_communication_interest': (4.6, 0.5),
        'data_analysis_interest': (4.0, 0.7),
        'problem_solving_interest': (4.4, 0.5),
        'leadership_management_interest': (4.0, 0.7),
        'text_templates': [
            "I enjoy analyzing enterprise business workflows, gathering functional requirements, and designing system architecture diagrams with BPMN and UML.",
            "Passionate about bridging business needs with IT technical solutions. I conduct gap analysis, feasibility studies, and user requirement workshops.",
            "I like modeling corporate data flows, mapping business processes, writing functional specifications, and conducting user acceptance testing (UAT).",
            "My focus is on business process optimization, software architecture evaluation, and translating operational requirements for software engineers.",
            "I excel at stakeholder interviews, requirements elicitation, workflow re-engineering, and evaluating enterprise software integrations.",
            "Interested in systems analysis, software solution design, data flow diagrams (DFD), cost-benefit trade-offs, and consulting."
        ],
        'keywords_pool': [
            "business requirements elicitation", "BPMN process modeling", "gap analysis feasibility", "functional specifications UML",
            "systems architecture", "stakeholder interviews UAT", "workflow optimization", "enterprise solutions consulting"
        ]
    }
}

def generate_dataset(samples_per_domain=150):
    """
    Generates a balanced, realistic, transparent dataset of 1,200 records (150 per domain)
    with 7 integer ratings (1-5) and diverse NLP text descriptions.
    """
    records = []
    
    for domain_name, config in DOMAIN_PROFILES.items():
        for i in range(samples_per_domain):
            row = {}
            # 1. Generate 7 rating values using truncated normal distribution mapped to 1-5
            for feat in FEATURE_COLUMNS:
                mean, std = config[feat]
                val = np.random.normal(mean, std)
                int_val = int(np.clip(round(val), 1, 5))
                row[feat] = int_val
            
            # 2. Generate natural language description
            base_template = random.choice(config['text_templates'])
            
            # Add supplemental phrases or keywords for realistic syntactic variety
            supplement = ""
            if random.random() > 0.4:
                sampled_kw = random.sample(config['keywords_pool'], k=random.randint(1, 3))
                connectors = [
                    f" Currently exploring {', '.join(sampled_kw)}.",
                    f" My main practical skills include {', '.join(sampled_kw)}.",
                    f" In my spare time, I practice {', '.join(sampled_kw)}.",
                    f" I am eager to gain more hands-on experience in {', '.join(sampled_kw)}."
                ]
                supplement = random.choice(connectors)
                
            text = f"{base_template}{supplement}"
            row['career_goal_description'] = text
            row['career_label'] = domain_name
            records.append(row)
            
    df = pd.DataFrame(records)
    # Shuffle dataset
    df = df.sample(frac=1.0, random_state=42).reset_index(drop=True)
    
    # Save to CSV
    os.makedirs(os.path.dirname(OUTPUT_CSV), exist_ok=True)
    df.to_csv(OUTPUT_CSV, index=False)
    
    print(f"Generated benchmark career dataset: {len(df)} records across {df['career_label'].nunique()} classes.")
    print("Class distribution:")
    print(df['career_label'].value_counts())
    print("\nDataset check:")
    print(f"Missing values: {df.isnull().sum().sum()}")
    print(f"Columns: {df.columns.tolist()}")
    print(f"Saved to: {OUTPUT_CSV}")
    return df

if __name__ == '__main__':
    generate_dataset(samples_per_domain=150)
