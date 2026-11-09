"""
Pydantic Schemas for CareerPath AI API
CareerPath AI Platform
"""

from typing import Dict, List, Optional, Any
from pydantic import BaseModel, Field

class RatingsInput(BaseModel):
    math_interest: Optional[float] = Field(default=3.0, ge=0.0, le=5.0, description="Interest in Mathematics & Quantitative Reasoning (1-5)")
    programming_interest: Optional[float] = Field(default=3.0, ge=0.0, le=5.0, description="Interest in Programming & Software Construction (1-5)")
    creativity_design_interest: Optional[float] = Field(default=3.0, ge=0.0, le=5.0, description="Interest in Creativity and Visual/Product Design (1-5)")
    social_communication_interest: Optional[float] = Field(default=3.0, ge=0.0, le=5.0, description="Interest in Social Interaction & Communication (1-5)")
    data_analysis_interest: Optional[float] = Field(default=3.0, ge=0.0, le=5.0, description="Interest in Data Analysis & Quantitative Reasoning (1-5)")
    problem_solving_interest: Optional[float] = Field(default=3.0, ge=0.0, le=5.0, description="Interest in Logical Problem Solving (1-5)")
    leadership_management_interest: Optional[float] = Field(default=3.0, ge=0.0, le=5.0, description="Interest in Leadership & Project Management (1-5)")

class WorkPreferencesInput(BaseModel):
    work_environment: Optional[str] = Field(default="Collaborative Team", description="Preferred workplace dynamic")
    task_orientation: Optional[str] = Field(default="Building & Construction", description="Core focus preference")
    learning_style: Optional[str] = Field(default="Project-Based", description="Preferred learning methodology")

class CandidateBackgroundInput(BaseModel):
    education_level: Optional[str] = Field(default="Bachelor's Degree", description="Current or completed education")
    experience_level: Optional[str] = Field(default="Entry-Level / Student", description="Career experience tier")
    declared_skills: Optional[List[str]] = Field(default_factory=list, description="Candidate self-declared skills")
    primary_goal: Optional[str] = Field(default="Building Scalable Software", description="Primary career objective")

class RecommendRequest(BaseModel):
    ratings: Optional[RatingsInput] = Field(default_factory=RatingsInput)
    text: Optional[str] = Field(default="", max_length=5000, description="Natural-language interest and goals description")
    work_preferences: Optional[WorkPreferencesInput] = Field(default_factory=WorkPreferencesInput)
    background: Optional[CandidateBackgroundInput] = Field(default_factory=CandidateBackgroundInput)
    model_name: Optional[str] = Field(default="Best Model", description="ML Algorithm to use")
    top_k: Optional[int] = Field(default=3, ge=1, le=8, description="Number of top careers to return")

class SkillItem(BaseModel):
    name: str
    score: float

class EducationItem(BaseModel):
    category: str
    percentage: float

class LearningStage(BaseModel):
    title: str
    duration: str
    topics: List[str]
    milestone: str

class PortfolioProject(BaseModel):
    title: str
    level: str
    tech: List[str]
    description: str

class LearningResource(BaseModel):
    name: str
    type: str
    focus: str

class JobZoneInfo(BaseModel):
    zone: int
    title: str
    education: str
    experience: str
    training: str

class RoadmapPhase(BaseModel):
    phase: str
    duration: str
    topics: List[str]

class ExplanationPayload(BaseModel):
    domain_name: str
    match_percentage: float
    rating_drivers: List[str]
    matched_nlp_keywords: List[str]
    narrative: str
    skill_gap_analysis: Optional[Dict[str, Any]] = None

class RecommendationItem(BaseModel):
    rank: int
    domain_name: str
    match_score: float
    confidence_probability: float
    onet_soc_code: str
    onet_official_title: str
    category: str
    icon: str
    description: str
    job_zone: Optional[JobZoneInfo] = None
    work_activities: List[str] = Field(default_factory=list)
    explanation: ExplanationPayload
    top_skills: List[SkillItem]
    top_abilities: List[SkillItem]
    top_knowledge: List[SkillItem] = Field(default_factory=list)
    riasec_interests: Dict[str, float]
    hot_technologies: List[str]
    education_distribution: List[EducationItem]
    work_styles: List[SkillItem]
    related_occupations: List[Dict[str, str]]
    curated_roadmap: List[RoadmapPhase]
    learning_stages: Optional[Dict[str, LearningStage]] = None
    portfolio_projects: List[PortfolioProject] = Field(default_factory=list)
    learning_resources: List[LearningResource] = Field(default_factory=list)

class RecommendResponse(BaseModel):
    status: str
    model_used: str
    best_evaluated_model: str
    top_recommendations: List[RecommendationItem]
    all_domain_scores: List[Dict[str, Any]]
    radar_comparison: Dict[str, Any]
    user_input_summary: Dict[str, Any]
    disclaimer: Optional[str] = None
