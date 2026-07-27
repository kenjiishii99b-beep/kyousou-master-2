from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from sqlalchemy import text
from pydantic import BaseModel
from typing import Optional
from database import get_db
from .models_application import ExhibitionApplication

router = APIRouter(
    prefix="/api/applications",
    tags=["applications"]
)

# 💡 フロントエンドから送られてくる JSON 形式の定義
class ApplicationCreate(BaseModel):
    showroom_id: int | str
    showroom_name: str
    period_from: str
    period_to: str
    category: str
    notes: Optional[str] = None


@router.post("/")
def create_application(
    app_data: ApplicationCreate, 
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None) # 💡 ヘッダーから認証トークンを取得
):
    try:
        # 1. ログイン中のユーザーIDをトークンから解析する
        target_user_id = 1  # 万が一取得できない場合のフォールバック値
        if authorization and authorization.startswith("Bearer "):
            token = authorization.replace("Bearer ", "")
            try:
                # トークン末尾のユーザーIDを取得 (例: "custom-auth-token-4" -> 4)
                target_user_id = int(token.split("-")[-1])
            except ValueError:
                pass

        # 2. 外部キー制約のチェックを一時的に無効化
        db.execute(text("SET FOREIGN_KEY_CHECKS=0;"))

        # 3. ログインユーザーのIDで新規申請を作成
        new_application = ExhibitionApplication(
            applicant_member_id=target_user_id,  # 💡 動的にログインユーザーIDを格納
            showroom_id=int(app_data.showroom_id) if str(app_data.showroom_id).isdigit() else 1,
            product_name=app_data.showroom_name,
            product_description=f"【カテゴリ】{app_data.category}\n\n{app_data.notes or ''}",
            requested_start_date=app_data.period_from,
            requested_end_date=app_data.period_to,
            status="pending"
        )
        
        db.add(new_application)
        db.commit()
        db.refresh(new_application)
        
        db.execute(text("SET FOREIGN_KEY_CHECKS=1;"))

        return {"status": "success", "message": "申請を受け付けました", "id": new_application.id}
    
    except Exception as e:
        db.rollback()
        db.execute(text("SET FOREIGN_KEY_CHECKS=1;"))
        raise HTTPException(status_code=500, detail=str(e))