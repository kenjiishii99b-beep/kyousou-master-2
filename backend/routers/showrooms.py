# routers/showrooms.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from .models_showroom import Showroom  # 同じフォルダのモデルをインポート


# ショールーム専用のルーターを作成
router = APIRouter(
    prefix="/api/showrooms",  # 各エンドポイントの先頭に自動で付くURL
    tags=["showrooms"],       # Swagger UIでのグループ分け用
)


@router.get("/")
def search_showrooms(
    prefecture: str | None = None,
    db: Session = Depends(get_db),
):
    """ショールーム一覧を取得する。"""
    query = db.query(Showroom)

    if prefecture:
        query = query.filter(Showroom.prefecture == prefecture)

    return query.all()


@router.get("/{showroom_id}")
def get_showroom_detail(
    showroom_id: int,
    db: Session = Depends(get_db),
):
    """指定したIDのショールーム詳細を取得する。"""
    showroom = (
        db.query(Showroom)
        .filter(Showroom.id == showroom_id)
        .first()
    )

    if showroom is None:
        raise HTTPException(
            status_code=404,
            detail="指定のショールームが見つかりません。",
        )

    return showroom
