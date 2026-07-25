# backend/routers/dashboard.py

from fastapi import APIRouter, Depends, Query
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db


router = APIRouter(
    prefix="/api/admin",
    tags=["admin-dashboard"],
)


@router.get("/dashboard")
def get_dashboard(
    survey_id: int | None = Query(default=None),
    showroom_id: int | None = Query(default=None),
    db: Session = Depends(get_db),
):
    conditions = []
    params = {}

    if survey_id is not None:
        conditions.append("sa.survey_id = :survey_id")
        params["survey_id"] = survey_id

    if showroom_id is not None:
        conditions.append("sc.showroom_id = :showroom_id")
        params["showroom_id"] = showroom_id

    where_clause = ""
    if conditions:
        where_clause = "WHERE " + " AND ".join(conditions)

    # 回答件数・平均満足度などの基本集計
    summary = db.execute(
        text(
            f"""
            SELECT
                COUNT(*) AS total_responses,
                COALESCE(AVG(sa.rating), 0) AS average_rating,
                SUM(
                    CASE
                        WHEN sa.rating >= 4 THEN 1
                        ELSE 0
                    END
                ) AS positive_count,
                SUM(
                    CASE
                        WHEN sa.comment IS NOT NULL
                             AND TRIM(sa.comment) <> ''
                        THEN 1
                        ELSE 0
                    END
                ) AS comment_count
            FROM survey_answers sa
            JOIN schedules sc
                ON sc.id = sa.schedule_id
            {where_clause}
            """
        ),
        params,
    ).mappings().first()

    total_responses = int(summary["total_responses"] or 0)
    average_rating = float(summary["average_rating"] or 0)
    positive_count = int(summary["positive_count"] or 0)
    comment_count = int(summary["comment_count"] or 0)

    positive_rate = (
        round(positive_count / total_responses * 100, 1)
        if total_responses > 0
        else 0
    )

    comment_rate = (
        round(comment_count / total_responses * 100, 1)
        if total_responses > 0
        else 0
    )

    # 満足度ごとの回答件数
    rating_rows = db.execute(
        text(
            f"""
            SELECT
                sa.rating,
                COUNT(*) AS count
            FROM survey_answers sa
            JOIN schedules sc
                ON sc.id = sa.schedule_id
            {where_clause}
            GROUP BY sa.rating
            ORDER BY sa.rating
            """
        ),
        params,
    ).mappings().all()

    rating_count_map = {
        int(row["rating"]): int(row["count"])
        for row in rating_rows
    }

    rating_breakdown = [
        {
            "rating": rating,
            "count": rating_count_map.get(rating, 0),
        }
        for rating in range(1, 6)
    ]

    # 来場目的ごとの回答件数
    purpose_rows = db.execute(
        text(
            f"""
            SELECT
                COALESCE(
                    NULLIF(TRIM(sa.visit_purpose), ''),
                    '未回答'
                ) AS label,
                COUNT(*) AS count
            FROM survey_answers sa
            JOIN schedules sc
                ON sc.id = sa.schedule_id
            {where_clause}
            GROUP BY
                COALESCE(
                    NULLIF(TRIM(sa.visit_purpose), ''),
                    '未回答'
                )
            ORDER BY count DESC
            """
        ),
        params,
    ).mappings().all()

    purpose_breakdown = [
        {
            "label": row["label"],
            "count": int(row["count"]),
            "percentage": (
                round(int(row["count"]) / total_responses * 100, 1)
                if total_responses > 0
                else 0
            ),
        }
        for row in purpose_rows
    ]

    return {
        "total_responses": total_responses,
        "average_rating": round(average_rating, 1),
        "positive_rate": positive_rate,
        "comment_rate": comment_rate,
        "rating_breakdown": rating_breakdown,
        "purpose_breakdown": purpose_breakdown,
    }