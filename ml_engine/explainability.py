"""
Explainability & Advanced Skill Gap Analysis Engine
CareerPath AI Platform

Performs comprehensive competency mapping:
- Assesses candidate psychometric ratings against domain benchmarks
- Compares declared candidate skills against official O*NET skills & hot tech
- Categorizes skills into Demonstrated Strengths, High Priority Gaps, and Developing Areas
- Generates targeted learning recommendations and practical portfolio projects
- Produces evidence-grounded explanatory narratives
"""

from typing import Dict, List, Any, Optional

FEATURE_NAMES = {
    'math_interest': 'Mathematics & Quantitative Reasoning',
    'programming_interest': 'Programming & Software Construction',
    'creativity_design_interest': 'Creativity & Visual/Product Design',
    'social_communication_interest': 'Social Interaction & Communication',
    'data_analysis_interest': 'Data Analysis & Quantitative Reasoning',
    'problem_solving_interest': 'Logical Problem Solving & Troubleshooting',
    'leadership_management_interest': 'Leadership & Project Management'
}

# Domain target benchmark expectations (1-5 scale)
DOMAIN_BENCHMARKS = {
    "Software Development": {
        'programming_interest': 4.5,
        'problem_solving_interest': 4.5,
        'math_interest': 3.5,
        'data_analysis_interest': 3.2,
        'leadership_management_interest': 2.8,
        'social_communication_interest': 3.0,
        'creativity_design_interest': 2.5
    },
    "Data Science & Machine Learning": {
        'data_analysis_interest': 4.8,
        'math_interest': 4.5,
        'problem_solving_interest': 4.5,
        'programming_interest': 4.2,
        'social_communication_interest': 3.0,
        'leadership_management_interest': 2.8,
        'creativity_design_interest': 2.5
    },
    "Data Analytics & Business Intelligence": {
        'data_analysis_interest': 4.8,
        'social_communication_interest': 4.0,
        'math_interest': 3.8,
        'problem_solving_interest': 4.0,
        'leadership_management_interest': 3.5,
        'programming_interest': 3.2,
        'creativity_design_interest': 2.8
    },
    "UI/UX Design & Frontend Systems": {
        'creativity_design_interest': 4.8,
        'social_communication_interest': 4.0,
        'problem_solving_interest': 3.8,
        'programming_interest': 3.2,
        'leadership_management_interest': 3.0,
        'data_analysis_interest': 2.8,
        'math_interest': 2.2
    },
    "Cloud & DevOps Engineering": {
        'problem_solving_interest': 4.6,
        'programming_interest': 4.0,
        'data_analysis_interest': 3.5,
        'math_interest': 3.2,
        'social_communication_interest': 3.0,
        'leadership_management_interest': 3.0,
        'creativity_design_interest': 2.2
    },
    "Cybersecurity & Information Security": {
        'problem_solving_interest': 4.8,
        'programming_interest': 4.2,
        'data_analysis_interest': 3.8,
        'math_interest': 3.8,
        'social_communication_interest': 3.0,
        'leadership_management_interest': 3.0,
        'creativity_design_interest': 2.2
    },
    "Product & IT Project Management": {
        'leadership_management_interest': 4.8,
        'social_communication_interest': 4.6,
        'problem_solving_interest': 4.2,
        'creativity_design_interest': 3.2,
        'data_analysis_interest': 3.5,
        'math_interest': 2.8,
        'programming_interest': 2.8
    },
    "Business Analysis & Systems Architecture": {
        'social_communication_interest': 4.6,
        'problem_solving_interest': 4.4,
        'leadership_management_interest': 4.0,
        'data_analysis_interest': 3.8,
        'math_interest': 3.2,
        'programming_interest': 3.0,
        'creativity_design_interest': 2.8
    }
}

# Domain vocabulary for NLP keyword matching
DOMAIN_VOCABULARY = {
    "Software Development": ['code', 'coding', 'software', 'backend', 'frontend', 'developer', 'web', 'api', 'apis', 'java', 'python', 'c++', 'algorithms', 'git', 'full-stack', 'microservices', 'app', 'apps', 'programming', 'debug', 'debugging'],
    "Data Science & Machine Learning": ['data', 'machine', 'learning', 'ai', 'statistics', 'statistical', 'pandas', 'numpy', 'scikit-learn', 'deep', 'neural', 'models', 'predictive', 'nlp', 'pytorch', 'tensorflow', 'hypothesis', 'math', 'linear'],
    "Data Analytics & Business Intelligence": ['sql', 'power bi', 'tableau', 'dashboard', 'dashboards', 'analytics', 'excel', 'kpi', 'kpis', 'insights', 'business', 'metrics', 'trends', 'reporting', 'visualization', 'warehouse', 'query'],
    "UI/UX Design & Frontend Systems": ['design', 'ui', 'ux', 'user', 'interface', 'experience', 'figma', 'prototype', 'prototyping', 'wireframe', 'wireframes', 'css', 'html', 'react', 'visual', 'typography', 'creative', 'layout', 'empathy'],
    "Cloud & DevOps Engineering": ['cloud', 'aws', 'docker', 'kubernetes', 'devops', 'linux', 'infrastructure', 'ci/cd', 'pipeline', 'pipelines', 'terraform', 'servers', 'automation', 'bash', 'deploy', 'deployment', 'sre', 'uptime'],
    "Cybersecurity & Information Security": ['security', 'cyber', 'cybersecurity', 'hacking', 'ethical', 'penetration', 'testing', 'firewall', 'firewalls', 'vulnerability', 'vulnerabilities', 'wireshark', 'owasp', 'forensics', 'defense', 'malware', 'threat', 'cryptography'],
    "Product & IT Project Management": ['management', 'project', 'product', 'agile', 'scrum', 'leadership', 'team', 'lead', 'jira', 'sprint', 'sprints', 'roadmap', 'stakeholder', 'stakeholders', 'delivery', 'velocity', 'prd', 'coordination'],
    "Business Analysis & Systems Architecture": ['business', 'analysis', 'analyst', 'requirements', 'bpmn', 'uml', 'enterprise', 'process', 'processes', 'consulting', 'feasibility', 'gap', 'specifications', 'workflows', 'solution', 'stakeholder']
}

def analyze_skill_gaps(
    domain_name: str,
    user_ratings: Dict[str, int],
    user_text: str,
    hot_technologies: List[str],
    declared_skills: Optional[List[str]] = None,
    education_level: Optional[str] = None,
    job_zone_info: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Performs comprehensive multi-level skill gap and readiness analysis:
    1. Quantitative benchmark rating comparison (Strengths vs Gaps)
    2. Declared vs required technology matching
    3. Categorization into High Priority, Moderate, and Acquired
    4. Actionable learning suggestions and project recommendations
    """
    benchmarks = DOMAIN_BENCHMARKS.get(domain_name, {})
    strengths = []
    gaps = []
    
    # 1. Evaluate 7 psychometric/cognitive dimensions
    for trait_key, target_score in benchmarks.items():
        user_val = user_ratings.get(trait_key, 3)
        diff = round(user_val - target_score, 1)
        nice_name = FEATURE_NAMES.get(trait_key, trait_key)
        
        if diff >= 0.0:
            strengths.append({
                "dimension": nice_name,
                "user_score": user_val,
                "benchmark": target_score,
                "status": "Meets or Exceeds Target",
                "surplus": diff
            })
        else:
            gap_magnitude = abs(diff)
            priority = "High" if gap_magnitude >= 1.5 else "Moderate"
            gaps.append({
                "dimension": nice_name,
                "user_score": user_val,
                "benchmark": target_score,
                "gap": gap_magnitude,
                "priority": priority,
                "suggestion": f"Elevate proficiency in {nice_name.lower()} from {user_val}/5 toward the benchmark of {target_score}/5."
            })
            
    # Sort gaps by magnitude descending
    gaps = sorted(gaps, key=lambda x: x["gap"], reverse=True)
    
    # 2. Technology & tooling matching (Declared vs In-Demand)
    declared_set = set([s.lower().strip() for s in (declared_skills or [])])
    text_lower = user_text.lower() if user_text else ""
    
    demonstrated_tech = []
    missing_tech = []
    
    for tech in hot_technologies:
        tech_clean = tech.lower()
        tokens = [t.lower() for t in tech.replace('/', ' ').replace('-', ' ').split() if len(t) > 2]
        
        # Check if tech is in declared skills or mentioned in free text
        is_declared = any(s in tech_clean or tech_clean in s for s in declared_set)
        is_mentioned = any(t in text_lower for t in tokens)
        
        if is_declared or is_mentioned:
            demonstrated_tech.append(tech)
        else:
            missing_tech.append(tech)
            
    # 3. Categorized skills breakdown
    priority_tools = missing_tech[:6]
    acquired_tools = demonstrated_tech[:6]
    
    # 4. Educational readiness check
    education_note = None
    if job_zone_info:
        zone_title = job_zone_info.get("title", "")
        zone_edu = job_zone_info.get("education", "")
        if education_level in ["High School / Diploma"] and "bachelor's" in zone_edu.lower():
            education_note = (
                f"O*NET classifies this occupation in Job Zone {job_zone_info.get('zone', 4)} ({zone_title}), "
                "where a 4-year Bachelor's degree or extensive equivalent vocational/portfolio experience is typically expected."
            )
        else:
            education_note = f"Your declared background aligns with standard entry preparation for this discipline (Job Zone {job_zone_info.get('zone', 4)})."
            
    # 5. Synthesize concrete actionable steps
    actionable_steps = []
    if gaps:
        top_gap = gaps[0]
        actionable_steps.append(
            f"Address Primary Competency Gap: Focus deliberate practice on {top_gap['dimension']} (Current: {top_gap['user_score']}/5, Target: {top_gap['benchmark']}/5)."
        )
    if priority_tools:
        sample_tools = ", ".join(priority_tools[:3])
        actionable_steps.append(
            f"Target In-Demand Tooling: Build hands-on familiarity with core industry tools: {sample_tools}."
        )
    actionable_steps.append(
        "Build a Capstone Portfolio Project: Complete an end-to-end applied project that proves competency to recruiters and peers."
    )
    
    return {
        "strengths": strengths,
        "gaps": gaps,
        "demonstrated_technologies": acquired_tools,
        "priority_technologies_to_learn": priority_tools,
        "education_readiness_note": education_note,
        "actionable_steps": actionable_steps
    }

def generate_explanation(
    domain_name: str,
    user_ratings: Dict[str, int],
    user_text: str,
    probability: float,
    hot_technologies: List[str] = None,
    declared_skills: Optional[List[str]] = None,
    work_preferences: Optional[Dict[str, str]] = None,
    education_level: Optional[str] = None,
    job_zone_info: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Generates structured, evidence-based explainability narrative and comprehensive skill gap analysis.
    """
    benchmarks = DOMAIN_BENCHMARKS.get(domain_name, {})
    driver_explanations = []
    
    # Identify top aligned drivers
    for trait_key, target in sorted(benchmarks.items(), key=lambda x: x[1], reverse=True)[:3]:
        val = user_ratings.get(trait_key, 3)
        nice_name = FEATURE_NAMES.get(trait_key, trait_key)
        if val >= 4:
            driver_explanations.append(f"Strong interest in {nice_name} ({val}/5)")
        elif val == 3:
            driver_explanations.append(f"Solid interest in {nice_name} ({val}/5)")
            
    # Extract matched NLP terms
    text_lower = user_text.lower() if user_text else ""
    vocab = DOMAIN_VOCABULARY.get(domain_name, [])
    matched_terms = [t for t in vocab if t in text_lower]
    matched_terms = list(dict.fromkeys(matched_terms))[:6]
    
    # Construct professional narrative
    narrative_parts = [
        f"**{domain_name}** represents a strong statistical match with a **{probability * 100:.1f}% model confidence score**."
    ]
    
    if driver_explanations:
        narrative_parts.append(
            f"Your self-assessment indicates {' and '.join(driver_explanations[:2])}, aligning closely with foundational competencies for this occupation."
        )
        
    if matched_terms:
        formatted_terms = ", ".join([f"'{t}'" for t in matched_terms[:4]])
        narrative_parts.append(
            f"Additionally, your stated career aspirations highlighted core domain concepts ({formatted_terms}), verifying strong contextual resonance with this discipline."
        )
    elif user_text and len(user_text.strip()) > 5:
        narrative_parts.append(
            "Your profile description reflects complementary interests that support long-term professional success in this field."
        )
        
    if work_preferences:
        env = work_preferences.get("work_environment")
        task = work_preferences.get("task_orientation")
        if env and task:
            narrative_parts.append(
                f"Your preference for a {env.lower()} with an emphasis on {task.lower()} provides an ideal operational fit for typical roles in this area."
            )
            
    full_narrative = " ".join(narrative_parts)
    
    # Perform comprehensive skill gap analysis
    gap_analysis = analyze_skill_gaps(
        domain_name=domain_name,
        user_ratings=user_ratings,
        user_text=user_text,
        hot_technologies=hot_technologies or [],
        declared_skills=declared_skills,
        education_level=education_level,
        job_zone_info=job_zone_info
    )
    
    return {
        "domain_name": domain_name,
        "match_percentage": round(probability * 100, 1),
        "rating_drivers": driver_explanations,
        "matched_nlp_keywords": matched_terms,
        "narrative": full_narrative,
        "skill_gap_analysis": gap_analysis
    }
