# database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# .envファイルから環境変数を読み込む
load_dotenv()

# 環境変数からDATABASE_URLを取得（見つからない場合はエラーにするかデフォルト値を設定）
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL が環境変数に設定されていません。")

engine = create_engine(
    DATABASE_URL,
    connect_args={"ssl": {"ssl_mode": "REQUIRED"}},
    pool_pre_ping=True,  # Azure MySQLの自動切断を防ぐ設定
    pool_recycle=3600
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()