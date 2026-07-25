# routers/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from database import get_db #[cite: 4]
from . import models_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

# パスワードハッシュ化の設定
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

@router.post("/signup", response_model=models_user.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: models_user.UserCreate, db: Session = Depends(get_db)):
    # 既に同じメールアドレスが登録されていないかチェック
    db_user = db.query(models_user.User).filter(models_user.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="このメールアドレスは既に登録されています")

    # パスワードをハッシュ化してDBに保存
    hashed_password = get_password_hash(user.password)
    new_user = models_user.User(
        email=user.email,
        hashed_password=hashed_password,
        username=user.username
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user