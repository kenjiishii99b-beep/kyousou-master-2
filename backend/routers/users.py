#72文字対応
# routers/users.py
from datetime import datetime, timedelta
import hashlib
import secrets
from jose import jwt
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from . import models_user

router = APIRouter(prefix="/users", tags=["Users"])

# JWTの設定
SECRET_KEY = "techzero_super_secret_key_change_me"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

# --- hashlib を用いたユーティリティ関数 ---
def get_password_hash(password: str) -> str:
    """
    ランダムなソルトを生成し、SHA-256でハッシュ化する。
    保存形式: salt$hash
    """
    salt = secrets.token_hex(16)
    # ソルトとパスワードを結合してハッシュ化
    pwd_hash = hashlib.sha256((salt + password).encode("utf-8")).hexdigest()
    return f"{salt}${pwd_hash}"

def verify_password(plain_password: str, stored_password_hash: str) -> bool:
    """
    DBに保存されている文字列からソルトを取り出し、入力されたパスワードと検証する。
    """
    try:
        salt, pwd_hash = stored_password_hash.split("$")
        check_hash = hashlib.sha256((salt + plain_password).encode("utf-8")).hexdigest()
        return secrets.compare_digest(check_hash, pwd_hash)
    except ValueError:
        return False

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- APIエンドポイント ---

@router.post("/signup", response_model=models_user.MemberResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: models_user.MemberCreate, db: Session = Depends(get_db)):
    db_member = db.query(models_user.Member).filter(models_user.Member.email == user.email).first()
    if db_member:
        raise HTTPException(status_code=400, detail="このメールアドレスは既に登録されています")

    hashed_password = get_password_hash(user.password)
    new_member = models_user.Member(
        email=user.email,
        password_hash=hashed_password,
        display_name=user.display_name,
        organization_name=user.organization_name,
        role=user.role,
        status="active"
    )
    db.add(new_member)
    db.commit()
    db.refresh(new_member)
    return new_member

@router.post("/login", response_model=models_user.TokenResponse)
def login_user(login_data: models_user.LoginRequest, db: Session = Depends(get_db)):
    member = db.query(models_user.Member).filter(models_user.Member.email == login_data.email).first()
    if not member or not verify_password(login_data.password, member.password_hash):
        raise HTTPException(status_code=401, detail="メールアドレスまたはパスワードが間違っています")

    if member.status != "active":
        raise HTTPException(status_code=403, detail="このアカウントは現在利用できません")

    access_token = create_access_token(data={"sub": member.email, "role": member.role, "user_id": member.id})
    return {"access_token": access_token, "token_type": "bearer", "user": member}