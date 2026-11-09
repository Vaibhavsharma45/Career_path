"""
CareerPath Application Launcher
AI-Powered Career Recommendation & Skill Guidance Engine
"""

import os
import sys
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    
    print("=" * 70)
    print("STARTING CAREERPATH AI PLATFORM")
    print("Multi-Modal NLP & Machine Learning Career Intelligence Engine")
    print("=" * 70)
    print(f"\nWeb UI: http://{host}:{port}")
    print(f"Interactive Swagger Docs: http://{host}:{port}/docs")
    print("Press Ctrl+C to stop the server.\n")
    
    uvicorn.run("backend.main:app", host=host, port=port, reload=False)
