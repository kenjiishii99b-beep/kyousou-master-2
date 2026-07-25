from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from database import get_db
from . import models_user
from .users import get_current_admin


router = APIRouter(
    prefix="/api/admin/exhibitions",
    tags=["admin-exhibitions"],
)


class ExhibitionStatusUpdate(BaseModel):
    status: str
    reason: str | None = None


ALLOWED_STATUSES = {
    "pending",
    "approved",
    "rejected",
    "exhibiting",
    "finished",
    "cancelled",
}


def normalize_status(value: str | None) -> str:
    status = (value or "").lower()

    if status == "rejected":
        return "rejected"

    if status == "cancelled":
        return "cancelled"

    if status == "approved":
        return "approved"

    if status in {"finished", "completed"}:
        return "finished"

    if status in {"exhibiting", "in_progress"}:
        return "exhibiting"

    return "pending"


def serialize_exhibition(row):
    return {
        "id": str(row["id"]),
        "showroomName": row["showroom_name"] or "",
        "companyName": row["company_name"] or "",
        "productName": row["title"] or "",
        "categories": [
            value.strip()
            for value in (row["category"] or "").split(",")
            if value.strip()
        ],
        "periodFrom": row["start_date"].isoformat(),
        "periodTo": row["end_date"].isoformat(),
        "status": normalize_status(row["status"]),
    }


@router.get("")
def get_all_exhibitions(
    admin: models_user.Member = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    rows = db.execute(
        text(
            """
            SELECT
                e.id,
                e.company_name,
                e.title,
                e.category,
                e.start_date,
                e.end_date,
                e.status,
                sh.name AS showroom_name
            FROM exhibitions e
            LEFT JOIN showrooms sh
                ON sh.id = e.showroom_id
            ORDER BY e.created_at DESC, e.id DESC
            """
        )
    ).mappings().all()

    return {
        "items": [
            serialize_exhibition(row)
            for row in rows
        ]
    }


@router.patch("/{exhibition_id}")
def update_exhibition_status(
    exhibition_id: int,
    payload: ExhibitionStatusUpdate,
    admin: models_user.Member = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    if payload.status not in ALLOWED_STATUSES:
        raise HTTPException(
            status_code=400,
            detail="Invalid exhibition status.",
        )

    exhibition = db.execute(
        text(
            """
            SELECT id
            FROM exhibitions
            WHERE id = :exhibition_id
            """
        ),
        {"exhibition_id": exhibition_id},
    ).mappings().first()

    if exhibition is None:
        raise HTTPException(
            status_code=404,
            detail="Exhibition not found.",
        )

    db.execute(
        text(
            """
            UPDATE exhibitions
            SET
                status = :status,
                remarks = CASE
                    WHEN :reason IS NOT NULL
                    THEN :reason
                    ELSE remarks
                END,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = :exhibition_id
            """
        ),
        {
            "status": payload.status,
            "reason": payload.reason,
            "exhibition_id": exhibition_id,
        },
    )
    db.commit()

    row = db.execute(
        text(
            """
            SELECT
                e.id,
                e.company_name,
                e.title,
                e.category,
                e.start_date,
                e.end_date,
                e.status,
                sh.name AS showroom_name
            FROM exhibitions e
            LEFT JOIN showrooms sh
                ON sh.id = e.showroom_id
            WHERE e.id = :exhibition_id
            """
        ),
        {"exhibition_id": exhibition_id},
    ).mappings().first()

    return {
        "item": serialize_exhibition(row),
    }


@router.delete("/all")
def delete_all_exhibitions(
    confirm: str,
    admin: models_user.Member = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    if confirm != "DELETE_ALL_EXHIBITIONS":
        raise HTTPException(
            status_code=400,
            detail="Invalid deletion confirmation.",
        )

    try:
        exhibition_count = int(
            db.execute(
                text("SELECT COUNT(*) FROM exhibitions")
            ).scalar() or 0
        )

        ai_result = db.execute(
            text(
                """
                DELETE FROM ai_analyses
                WHERE application_id IN (
                    SELECT id
                    FROM exhibitions
                )
                """
            )
        )

        schedule_result = db.execute(
            text(
                """
                DELETE FROM schedules
                WHERE application_id IN (
                    SELECT id
                    FROM exhibitions
                )
                """
            )
        )

        exhibition_result = db.execute(
            text("DELETE FROM exhibitions")
        )

        db.commit()

        return {
            "message": "All exhibitions deleted.",
            "deleted_exhibitions": int(
                exhibition_result.rowcount or exhibition_count
            ),
            "deleted_schedules": int(
                schedule_result.rowcount or 0
            ),
            "deleted_ai_analyses": int(
                ai_result.rowcount or 0
            ),
        }

    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to delete exhibitions.",
        ) from exc
