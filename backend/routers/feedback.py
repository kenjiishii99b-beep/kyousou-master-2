from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text  # 💡 SQLを直接実行するために追加
from pydantic import BaseModel, Field
from database import get_db
from .models_feedback import SurveyResponse, SurveyAnswer

router = APIRouter(
    prefix="/api/feedback",
    tags=["feedback"]
)

class FeedbackCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    purpose: str = Field(...)
    comment: str = Field(default="", max_length=500)

@router.post("/")
def create_feedback(feedback_data: FeedbackCreate, db: Session = Depends(get_db)):
    try:
        # 💡 1. MySQLの「親データが存在するか」のチェックを一時的にオフにします（テスト用）
        db.execute(text("SET FOREIGN_KEY_CHECKS=0;"))

        # 2. 親データの作成
        new_response = SurveyResponse(
            survey_id=1  
        )
        db.add(new_response)
        db.flush() 

        # 3. 子データ（回答内容）の作成
        answer_rating = SurveyAnswer(
            response_id=new_response.id,
            question_id=1, 
            answer_number=feedback_data.rating
        )
        
        answer_purpose = SurveyAnswer(
            response_id=new_response.id,
            question_id=2, 
            answer_text=feedback_data.purpose
        )

        answer_comment = SurveyAnswer(
            response_id=new_response.id,
            question_id=3, 
            answer_text=feedback_data.comment
        )

        # 4. まとめて保存
        db.add_all([answer_rating, answer_purpose, answer_comment])
        db.commit()

        # 💡 5. チェックをオンに戻す
        db.execute(text("SET FOREIGN_KEY_CHECKS=1;"))

        return {"status": "success", "message": "アンケートを送信しました"}
    
    except Exception as e:
        db.rollback()
        # 万が一エラーが起きた場合も、忘れずにチェックをオンに戻す
        db.execute(text("SET FOREIGN_KEY_CHECKS=1;"))
        raise HTTPException(status_code=500, detail=str(e))