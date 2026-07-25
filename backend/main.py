# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import showrooms, users, surveys, dashboard, ai_analysis, reports, applications, admin_exhibitions

app = FastAPI(title="TechZero Internal API") #

# CORS設定（Next.jsからの通信許可など）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) #[cite: 5]

# ✨ 各機能のルーターを登録する（画面が増えたらここに追加していく）
app.include_router(showrooms.router) #[cite: 5]

# 追加：ユーザー管理画面のルーターを登録
app.include_router(users.router)
app.include_router(surveys.router)
app.include_router(surveys.admin_router)
app.include_router(dashboard.router)
app.include_router(ai_analysis.router)
app.include_router(reports.router)
app.include_router(admin_exhibitions.router)

@app.get("/")
def root():
    return {"message": "API status: OK"} #[cite: 5]
app.include_router(applications.router)
