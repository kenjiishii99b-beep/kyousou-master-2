# backend/routers/surveys.py

from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import get_db


router = APIRouter(
    prefix="/api/surveys",
    tags=["surveys"],
)


class SurveyAnswerCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    visit_purpose: str | None = Field(default=None, max_length=50)
    comment: str | None = Field(default=None, max_length=500)


@router.post(
    "/{survey_token}/responses",
    status_code=status.HTTP_201_CREATED,
)
def create_survey_response(
    survey_token: str,
    answer: SurveyAnswerCreate,
    db: Session = Depends(get_db),
):
    # URLのトークンから対象アンケートとスケジュールを取得
    survey = db.execute(
        text(
            """
            SELECT
                id,
                schedule_id,
                status
            FROM surveys
            WHERE token = :survey_token
            LIMIT 1
            """
        ),
        {"survey_token": survey_token},
    ).mappings().first()

    if survey is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="指定のアンケートが見つかりません。",
        )

    if survey["status"] != "active":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="このアンケートは現在回答できません。",
        )

    respondent_token = str(uuid4())

    try:
        result = db.execute(
            text(
                """
                INSERT INTO survey_answers (
                    survey_id,
                    schedule_id,
                    respondent_token,
                    rating,
                    visit_purpose,
                    comment,
                    ai_analysis_status
                )
                VALUES (
                    :survey_id,
                    :schedule_id,
                    :respondent_token,
                    :rating,
                    :visit_purpose,
                    :comment,
                    'unanalyzed'
                )
                """
            ),
            {
                "survey_id": survey["id"],
                "schedule_id": survey["schedule_id"],
                "respondent_token": respondent_token,
                "rating": answer.rating,
                "visit_purpose": answer.visit_purpose,
                "comment": answer.comment,
            },
        )

        db.commit()

        return {
            "message": "アンケート回答を保存しました。",
            "answer_id": result.lastrowid,
            "respondent_token": respondent_token,
        }

    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="アンケート回答の保存に失敗しました。",
        )
    
    # 保存済みアンケート回答を管理画面向けに一覧取得
admin_router = APIRouter(
    prefix="/api/admin",
    tags=["admin-surveys"],
)


@admin_router.get("/survey-responses")
def get_survey_responses(
    db: Session = Depends(get_db),
):
    rows = db.execute(
        text(
            """
            SELECT
                sa.id AS answer_id,
                sa.survey_id,
                sa.schedule_id,
                sv.title AS survey_title,
                sc.showroom_id,
                sr.name AS showroom_name,
                ex.title AS exhibition_title,
                sa.rating,
                sa.visit_purpose,
                sa.comment,
                sa.ai_analysis_status,
                sa.answered_at
            FROM survey_answers sa
            JOIN surveys sv
                ON sv.id = sa.survey_id
            JOIN schedules sc
                ON sc.id = sa.schedule_id
            LEFT JOIN showrooms sr
                ON sr.id = sc.showroom_id
            LEFT JOIN exhibitions ex
                ON ex.id = sc.application_id
            ORDER BY sa.answered_at DESC
            """
        )
    ).mappings().all()

    return {
        "items": [dict(row) for row in rows],
        "total": len(rows),
    }