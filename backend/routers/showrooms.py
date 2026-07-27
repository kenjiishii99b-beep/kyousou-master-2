from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from .models_showroom import Showroom  # 同じフォルダのモデルをインポート
from typing import Optional

# ショールーム専用のルーターを作成
router = APIRouter(
    prefix="/api/showrooms", # 各エンドポイントの先頭に自動で付くURL
    tags=["showrooms"]       # Swagger UI(ドキュメント)でのグループ分け用
)

# 💡 1. ショールーム一覧・検索 API

@router.get("/")
def search_showrooms(prefecture: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Showroom)
    if prefecture:
        query = query.filter(Showroom.prefecture == prefecture)
    
    showrooms = query.all()

    # フロントエンド（fetchShowrooms）の期待するレスポンス構造に整形して返す
    return {
        "items": showrooms,
        "total": len(showrooms)
    }


# 💡 2. ショールーム詳細取得 API（ID指定）👈 これが不足していたため追加！
@router.get("/{showroom_id}")
def get_showroom_detail(showroom_id: int, db: Session = Depends(get_db)):
    print(f"💡 [デバッグ] ショールーム詳細リクエスト ID: {showroom_id}")
    
    # リクエストされた showroom_id でデータベースを検索
    showroom = db.query(Showroom).filter(Showroom.id == showroom_id).first()
    
    if not showroom:
        print(f"❌ エラー: ID={showroom_id} のショールームが見つかりません。")
        raise HTTPException(status_code=404, detail="指定されたショールームが見つかりません。")
        
    return showroom