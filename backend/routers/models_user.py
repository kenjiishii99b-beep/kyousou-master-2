# routers/models_user.py

from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from typing import Optional
from database import Base

# --- SQLAlchemy モデル ---
class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    display_name = Column(String(255), nullable=False)
    organization_name = Column(String(255))
    role = Column(String(50), nullable=False)
    status = Column(String(20), default="active")
    
    # created_at/updated_at は DB側で自動管理する設定
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        onupdate=func.now(), 
        nullable=False
    )

# --- Pydantic モデル ---
class MemberCreate(BaseModel):
    email: EmailStr
    password: str
    display_name: str
    organization_name: Optional[str] = None
    role: str = "startup"

class MemberResponse(BaseModel):
    id: int
    email: EmailStr
    display_name: str
    organization_name: Optional[str]
    role: str
    status: str

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# MemberResponseが定義された後にTokenResponseを定義することでNameErrorを回避
class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: MemberResponse