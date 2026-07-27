from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
from .models_member import Member
from typing import Optional

router = APIRouter(
    prefix="/api/auth",
    tags=["auth"]
)

# 新規登録のリクエスト型定義
class RegisterRequest(BaseModel):
    company_name: Optional[str] = None
    last_name: str
    first_name: str
    email: str
    password: str
    phone: Optional[str] = None

# ログインのリクエスト型定義
class LoginRequest(BaseModel):
    email: str
    password: str


# 💡 1. 新規登録（サインアップ）API
@router.post("/register", status_code=status.HTTP_201_CREATED)
@router.post("/signup", status_code=status.HTTP_201_CREATED)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    # 空白除去
    clean_email = request.email.strip()
    clean_password = request.password.strip()

    # すでに同じメールアドレスが登録されていないかチェック
    existing_member = db.query(Member).filter(Member.email == clean_email).first()
    if existing_member:
        raise HTTPException(
            status_code=400, 
            detail="このメールアドレスは既に登録されています。"
        )

    try:
        display_name = f"{request.last_name} {request.first_name}".strip()

        # Azure MySQL 側の Member テーブル構造に合わせて新規レコードを作成
        new_member = Member(
            email=clean_email,
            password_hash=clean_password,
            display_name=display_name,
            organization_name=request.company_name or "",
            role="user",
            status="active"
        )

        db.add(new_member)
        db.commit()  # 💡 Azure MySQL へ確実にデータを保存！
        db.refresh(new_member)

        fake_token = f"custom-auth-token-{new_member.id}"

        return {
            "status": "success",
            "message": "会員登録が完了しました",
            "access_token": fake_token,
            "token_type": "bearer",
            "user_id": new_member.id
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"データベース登録エラー: {str(e)}")


# 💡 2. ログイン API（デバッグログ & 前後空白カットを追加）
# 💡 2. ログイン API（クォーテーション自動除去を追加）
@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    input_email = request.email.strip().strip("'\"")
    # 💡 パスワードの前後にある余計なシングル/ダブルクォーテーションを自動除去
    input_password = request.password.strip().strip("'\"")

    print(f"\n--- [ログイン判定開始] ---")
    print(f"入力メールアドレス: '{input_email}'")

    # 1. メールアドレスでユーザー検索
    member = db.query(Member).filter(Member.email == input_email).first()
    
    if not member:
        print(f"❌ エラー: DBに '{input_email}' というユーザーが存在しません。")
        raise HTTPException(status_code=401, detail="メールアドレスまたはパスワードが間違っています。")

    # 2. パスワードを取得（password_hash または password カラムから参照）
    db_password = getattr(member, "password_hash", None) or getattr(member, "password", None)
    if db_password is not None:
        db_password = str(db_password).strip().strip("'\"")

    print(f"入力パスワード: '{input_password}'")
    print(f"DB保存パスワード: '{db_password}'")

    # 3. パスワード比較
    if db_password != input_password:
        print("❌ エラー: パスワードが一致しません！")
        raise HTTPException(status_code=401, detail="メールアドレスまたはパスワードが間違っています。")

    print(f"✅ ログイン成功！ ユーザーID: {member.id}")
    print(f"---------------------------\n")

    # 4. 認証トークンを発行
    fake_token = f"custom-auth-token-{member.id}"

    return {
        "access_token": fake_token,
        "token_type": "bearer",
        "user_id": member.id
    }