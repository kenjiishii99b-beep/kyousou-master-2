# backend/routers/ai_analysis.py

import json
import os
import re

from fastapi import APIRouter, Depends, HTTPException
from openai import OpenAI
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db


router = APIRouter(
    prefix="/api/admin",
    tags=["admin-ai-analysis"],
)


def redact_comment(value: str | None) -> str:
    if not value:
        return ""

    value = re.sub(
        r"[\w\.-]+@[\w\.-]+\.\w+",
        "[EMAIL]",
        value,
    )
    value = re.sub(
        r"(?<!\d)(?:\+81[-\s]?)?0\d{1,4}[-\s]?\d{1,4}[-\s]?\d{3,4}(?!\d)",
        "[PHONE]",
        value,
    )

    return value[:2000]


def to_string_list(value) -> list[str]:
    if not isinstance(value, list):
        return []

    return [
        str(item).strip()
        for item in value
        if str(item).strip()
    ]


@router.post("/ai-analysis")
def create_ai_analysis(
    application_id: int,
    db: Session = Depends(get_db),
):
    endpoint = os.getenv("FOUNDRY_PROJECT_ENDPOINT")
    api_key = os.getenv("AZURE_OPENAI_API_KEY")
    deployment = os.getenv(
        "AZURE_OPENAI_DEPLOYMENT",
        "gpt-5-mini",
    )

    if not endpoint or not api_key:
        raise HTTPException(
            status_code=500,
            detail="Foundry environment variables are missing.",
        )

    rows = db.execute(
        text(
            """
            SELECT
                sa.rating,
                sa.visit_purpose,
                sa.comment
            FROM survey_answers sa
            JOIN schedules sc
                ON sc.id = sa.schedule_id
            WHERE sc.application_id = :application_id
            ORDER BY sa.answered_at
            """
        ),
        {"application_id": application_id},
    ).mappings().all()

    if not rows:
        raise HTTPException(
            status_code=404,
            detail="No survey responses were found.",
        )

    survey_data = [
        {
            "rating": int(row["rating"]) if row["rating"] is not None else None,
            "visit_purpose": row["visit_purpose"] or "",
            "comment": redact_comment(row["comment"]),
        }
        for row in rows
    ]

    insert_result = db.execute(
        text(
            """
            INSERT INTO ai_analyses (
                application_id,
                status
            )
            VALUES (
                :application_id,
                'running'
            )
            """
        ),
        {"application_id": application_id},
    )
    db.commit()

    analysis_id = insert_result.lastrowid

    prompt = (
        "You are a professional analyst of showroom survey responses.\n"
        "Analyze the following survey data and return only valid JSON.\n"
        "All response text must be written in Japanese.\n"
        "Use exactly this structure:\n"
        "{\n"
        '  "summary": "overall summary",\n'
        '  "keywords": ["keyword1", "keyword2"],\n'
        '  "improvement_points": ["point1", "point2"]\n'
        "}\n\n"
        f"Survey data:\n{json.dumps(survey_data, ensure_ascii=False)}"
    )

    try:
        client = OpenAI(
            base_url=f"{endpoint.rstrip('/')}/openai/v1/",
            api_key=api_key,
        )

        response = client.responses.create(
            model=deployment,
            input=prompt,
        )

        raw_text = response.output_text.strip()

        if raw_text.startswith("```"):
            raw_text = re.sub(
                r"^```(?:json)?\s*|\s*```$",
                "",
                raw_text,
                flags=re.IGNORECASE,
            )

        result = json.loads(raw_text)

        summary = str(result.get("summary", "")).strip()
        keywords = to_string_list(result.get("keywords"))
        improvement_points = to_string_list(
            result.get("improvement_points")
        )

        db.execute(
            text(
                """
                UPDATE ai_analyses
                SET
                    status = 'completed',
                    summary = :summary,
                    keywords = :keywords,
                    improvement_points = :improvement_points,
                    raw_response = :raw_response
                WHERE id = :analysis_id
                """
            ),
            {
                "summary": summary,
                "keywords": json.dumps(
                    keywords,
                    ensure_ascii=False,
                ),
                "improvement_points": json.dumps(
                    improvement_points,
                    ensure_ascii=False,
                ),
                "raw_response": json.dumps(
                    result,
                    ensure_ascii=False,
                ),
                "analysis_id": analysis_id,
            },
        )
        db.commit()

        return {
            "id": analysis_id,
            "application_id": application_id,
            "status": "completed",
            "summary": summary,
            "keywords": keywords,
            "improvement_points": improvement_points,
        }

    except Exception as exc:
        db.execute(
            text(
                """
                UPDATE ai_analyses
                SET
                    status = 'failed',
                    raw_response = :raw_response
                WHERE id = :analysis_id
                """
            ),
            {
                "raw_response": json.dumps(
                    {"error": str(exc)},
                    ensure_ascii=False,
                ),
                "analysis_id": analysis_id,
            },
        )
        db.commit()

        raise HTTPException(
            status_code=502,
            detail="AI analysis failed.",
        ) from exc


def parse_json_list(value) -> list[str]:
    if value is None:
        return []

    if isinstance(value, list):
        return to_string_list(value)

    if isinstance(value, str):
        try:
            parsed = json.loads(value)
        except json.JSONDecodeError:
            return []

        return to_string_list(parsed)

    return []


@router.get("/ai-analysis/latest")
def get_latest_ai_analysis(
    application_id: int,
    db: Session = Depends(get_db),
):
    row = db.execute(
        text(
            """
            SELECT
                id,
                application_id,
                status,
                summary,
                keywords,
                improvement_points
            FROM ai_analyses
            WHERE application_id = :application_id
              AND status = 'completed'
            ORDER BY id DESC
            LIMIT 1
            """
        ),
        {"application_id": application_id},
    ).mappings().first()

    if row is None:
        return {"analysis": None}

    return {
        "analysis": {
            "id": int(row["id"]),
            "application_id": int(row["application_id"]),
            "status": row["status"],
            "summary": row["summary"] or "",
            "keywords": parse_json_list(row["keywords"]),
            "improvement_points": parse_json_list(
                row["improvement_points"]
            ),
        }
    }
