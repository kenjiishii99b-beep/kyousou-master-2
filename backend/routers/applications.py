from datetime import date

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from . import models_user
from .users import get_current_member


router = APIRouter(
    prefix="/api/applications",
    tags=["applications"],
)


class ApplicationCreate(BaseModel):
    showroomId: int
    showroomName: str = ""
    periodFrom: date
    periodTo: date
    categories: list[str] = Field(default_factory=list)
    exhibitTitle: str
    exhibitDescription: str


def normalize_application_status(
    current_status: str | None,
    start_date: date,
    end_date: date,
) -> str:
    value = (current_status or "").lower()

    if value == "approved":
        return "approved"

    if value == "rejected":
        return "rejected"

    if value == "cancelled":
        return "cancelled"

    if value in {"exhibiting", "in_progress"}:
        return "exhibiting"

    if value in {"finished", "completed"}:
        return "finished"

    return "pending"


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
)
def create_application(
    payload: ApplicationCreate,
    member: models_user.Member = Depends(get_current_member),
    db: Session = Depends(get_db),
):
    if payload.periodFrom > payload.periodTo:
        raise HTTPException(
            status_code=400,
            detail="The end date must be after the start date.",
        )

    showroom = db.execute(
        text(
            """
            SELECT id
            FROM showrooms
            WHERE id = :showroom_id
            """
        ),
        {"showroom_id": payload.showroomId},
    ).mappings().first()

    if showroom is None:
        raise HTTPException(
            status_code=404,
            detail="Showroom not found.",
        )

    result = db.execute(
        text(
            """
            INSERT INTO exhibitions (
                member_id,
                showroom_id,
                company_name,
                contact_name,
                email,
                phone,
                title,
                category,
                description,
                start_date,
                end_date,
                poc,
                remarks,
                status
            )
            VALUES (
                :member_id,
                :showroom_id,
                :company_name,
                :contact_name,
                :email,
                NULL,
                :title,
                :category,
                :description,
                :start_date,
                :end_date,
                0,
                NULL,
                'pending'
            )
            """
        ),
        {
            "member_id": member.id,
            "showroom_id": payload.showroomId,
            "company_name": member.organization_name or "",
            "contact_name": member.display_name,
            "email": member.email,
            "title": payload.exhibitTitle,
            "category": ", ".join(payload.categories),
            "description": payload.exhibitDescription,
            "start_date": payload.periodFrom,
            "end_date": payload.periodTo,
        },
    )
    db.commit()

    return {
        "applicationId": str(result.lastrowid),
    }


@router.get("/mine")
def get_my_applications(
    member: models_user.Member = Depends(get_current_member),
    db: Session = Depends(get_db),
):
    rows = db.execute(
        text(
            """
            SELECT
                e.id,
                e.showroom_id,
                sh.name AS showroom_name,
                e.category,
                e.start_date,
                e.end_date,
                e.status,
                e.remarks
            FROM exhibitions e
            LEFT JOIN showrooms sh
                ON sh.id = e.showroom_id
            WHERE e.member_id = :member_id
            ORDER BY e.created_at DESC, e.id DESC
            """
        ),
        {"member_id": member.id},
    ).mappings().all()

    applications = []

    for row in rows:
        application_status = normalize_application_status(
            row["status"],
            row["start_date"],
            row["end_date"],
        )

        applications.append(
            {
                "id": str(row["id"]),
                "showroomId": str(row["showroom_id"]),
                "showroomName": row["showroom_name"] or "",
                "categories": [
                    value.strip()
                    for value in (row["category"] or "").split(",")
                    if value.strip()
                ],
                "periodFrom": row["start_date"].isoformat(),
                "periodTo": row["end_date"].isoformat(),
                "status": application_status,
                "rejectionReason": (
                    row["remarks"]
                    if application_status == "rejected"
                    else None
                ),
            }
        )

    return {
        "applications": applications,
    }
