"""
API Route Handlers for CareerPath
"""

import os
import json
from fastapi import APIRouter, HTTPException, Query
from backend.schemas import RecommendRequest, RecommendResponse
from ml_engine.predictor import get_predictor

router = APIRouter(prefix="/api", tags=["CareerPath"])

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
ONET_PROFILES_FILE = os.path.join(BASE_DIR, 'data', 'onet_processed', 'onet_career_profiles.json')
EVAL_RESULTS_FILE = os.path.join(BASE_DIR, 'models', 'evaluation_results.json')

@router.get("/health")
def health_check():
    predictor = get_predictor()
    return {
        "status": "healthy",
        "service": "CareerPath Recommendation Engine",
        "version": "2.0.0",
        "best_model": predictor.best_model_name,
        "classes_supported": predictor.classes,
        "classes_count": len(predictor.classes),
        "algorithms_supported": list(predictor.models.keys()),
        "total_features_count": predictor.eval_data.get("feature_count", 307)
    }

@router.post("/recommend", response_model=RecommendResponse)
def get_career_recommendation(payload: RecommendRequest):
    try:
        predictor = get_predictor()
        ratings_dict = payload.ratings.model_dump() if payload.ratings else {}
        work_pref_dict = payload.work_preferences.model_dump() if payload.work_preferences else None
        bg_dict = payload.background.model_dump() if payload.background else None
        result = predictor.predict(
            ratings=ratings_dict,
            text=payload.text or "",
            work_preferences=work_pref_dict,
            background=bg_dict,
            model_name=payload.model_name or "Best Model",
            top_k=payload.top_k or 3
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@router.get("/models")
def get_model_evaluation():
    if not os.path.exists(EVAL_RESULTS_FILE):
        raise HTTPException(status_code=404, detail="Model evaluation file not found.")
    with open(EVAL_RESULTS_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

@router.get("/careers")
def get_all_careers():
    if not os.path.exists(ONET_PROFILES_FILE):
        raise HTTPException(status_code=404, detail="O*NET profiles not found.")
    with open(ONET_PROFILES_FILE, 'r', encoding='utf-8') as f:
        profiles = json.load(f)
        
    summary = []
    for dname, p in profiles.items():
        summary.append({
            "domain_name": dname,
            "onet_soc_code": p["onet_soc_code"],
            "onet_official_title": p["onet_official_title"],
            "category": p["category"],
            "icon": p["icon"],
            "description": p["description"][:160] + "...",
            "top_skills": [s["name"] for s in p["top_skills"][:4]],
            "hot_technologies": p["hot_technologies"][:6]
        })
    return summary

@router.get("/career/{domain_name}")
def get_career_detail(domain_name: str):
    if not os.path.exists(ONET_PROFILES_FILE):
        raise HTTPException(status_code=404, detail="O*NET profiles not found.")
    with open(ONET_PROFILES_FILE, 'r', encoding='utf-8') as f:
        profiles = json.load(f)
    if domain_name not in profiles:
        raise HTTPException(status_code=404, detail=f"Career domain '{domain_name}' not found.")
    return profiles[domain_name]
