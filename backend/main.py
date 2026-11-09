"""
Main FastAPI Application for CareerPath
Personalized Career Recommendation System using NLP and Machine Learning
"""

import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.exceptions import RequestValidationError
from backend.api_routes import router as api_router

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, 'frontend')
STATIC_DIR = os.path.join(BASE_DIR, 'backend', 'static')

app = FastAPI(
    title="CareerPath - AI-Powered Career Recommendation Engine",
    description="Intelligent Career Recommendation Platform powered by NLP and Supervised Machine Learning",
    version="2.0.0"
)

# Request Validation Error Logger
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    print(f"\n[422 Validation Error] Path: {request.url.path}")
    for err in errors:
        loc = ".".join(str(l) for l in err.get("loc", []))
        print(f"  -> Field: {loc} | Error: {err.get('msg')} ({err.get('type')})")
    return JSONResponse(
        status_code=422,
        content={"detail": errors}
    )

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Router
app.include_router(api_router)

# Mount static files (evaluation plots, css, js)
os.makedirs(STATIC_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

if os.path.exists(FRONTEND_DIR):
    app.mount("/frontend", StaticFiles(directory=FRONTEND_DIR), name="frontend")

@app.get("/", response_class=HTMLResponse)
def serve_index():
    index_file = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return HTMLResponse("<h1>CareerPath API is Running.</h1><p>Visit <a href='/docs'>/docs</a> for Swagger documentation.</p>")

@app.get("/favicon.ico")
def favicon():
    fav_file = os.path.join(STATIC_DIR, "favicon.ico")
    return FileResponse(fav_file) if os.path.exists(fav_file) else HTMLResponse("")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
