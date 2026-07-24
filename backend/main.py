# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# 💡 ここに feedback を追加します


from routers import showrooms, users, feedback, applications, mypage, auth # 💡 authを追加
app = FastAPI(title="TechZero Internal API") 

# CORS設定（Next.jsからの通信許可など）
# CORS設定（Next.jsからの通信許可など）
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✨ 各機能のルーターを登録する（画面が増えたらここに追加していく）
app.include_router(showrooms.router) 

# 追加：ユーザー管理画面のルーターを登録
app.include_router(users.router)

# 💡 ここに追加：アンケート（フィードバック）のルーターを登録
app.include_router(feedback.router)

# 下部のルーター登録部分に追加
app.include_router(applications.router)

app.include_router(auth.router) # 💡 ルーターを登録

app.include_router(mypage.router)

@app.get("/")
def root():
    return {"message": "API status: OK"}