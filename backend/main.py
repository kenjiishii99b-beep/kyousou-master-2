from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import (
    showrooms,
    users,
    feedback,
    applications,
    mypage,
    auth,
)

app = FastAPI(
    title="TechZero Internal API",
    version="1.0.0",
)

# ======================================================
# CORS設定
# ======================================================
origins = [
    "http://localhost:3000",                         # ローカル開発
    "http://127.0.0.1:3000",                         # ローカル開発
    "https://calm-island-02d3b980f.7.azurestaticapps.net",  # Azure Static Web Apps
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================================================
# Router
# ======================================================
app.include_router(showrooms.router)
app.include_router(users.router)
app.include_router(feedback.router)
app.include_router(applications.router)
app.include_router(auth.router)
app.include_router(mypage.router)

# ======================================================
# Health Check
# ======================================================
@app.get("/")
def root():
    return {
        "status": "ok",
        "message": "TechZero Internal API is running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }