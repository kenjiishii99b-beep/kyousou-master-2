import html
import json

from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import get_db
from . import models_user
from .users import get_current_member


router = APIRouter(
    prefix="/api/mypage",
    tags=["mypage-reports"],
)


def parse_json_list(value) -> list[str]:
    if value is None:
        return []

    if isinstance(value, list):
        return [str(item) for item in value]

    if isinstance(value, str):
        try:
            parsed = json.loads(value)
        except json.JSONDecodeError:
            return []

        if isinstance(parsed, list):
            return [str(item) for item in parsed]

    return []


@router.get("/reports")
def get_report_history(
    member: models_user.Member = Depends(get_current_member),
    db: Session = Depends(get_db),
):
    rows = db.execute(
        text(
            """
            SELECT
                aa.id,
                aa.application_id,
                aa.summary,
                aa.keywords,
                aa.improvement_points,
                aa.created_at,
                e.title,
                e.company_name,
                sh.name AS showroom_name
            FROM ai_analyses aa
            JOIN (
                SELECT
                    application_id,
                    MAX(id) AS latest_id
                FROM ai_analyses
                WHERE status = 'completed'
                GROUP BY application_id
            ) latest
                ON latest.latest_id = aa.id
            JOIN exhibitions e
                ON e.id = aa.application_id
            LEFT JOIN showrooms sh
                ON sh.id = e.showroom_id
            WHERE e.member_id = :member_id
            ORDER BY aa.created_at DESC, aa.id DESC
            """
        ),
        {
            "member_id": member.id,
        },
    ).mappings().all()

    return {
        "reports": [
            {
                "id": str(row["id"]),
                "title": (
                    f"{row['title']} \u0041\u0049\u5206\u6790\u30ec\u30dd\u30fc\u30c8"
                    if row["title"]
                    else "\u0041\u0049\u5206\u6790\u30ec\u30dd\u30fc\u30c8"
                ),
                "date": row["created_at"].date().isoformat(),
                "showroomName": row["showroom_name"] or "",
                "companyName": row["company_name"] or "",
                "summary": row["summary"] or "",
                "downloadUrl": (
                    "http://127.0.0.1:8000"
                    f"/api/mypage/reports/{row['id']}/download"
                ),
            }
            for row in rows
        ]
    }


@router.get("/reports/{analysis_id}/download")
def download_report(
    analysis_id: int,
    db: Session = Depends(get_db),
):
    row = db.execute(
        text(
            """
            SELECT
                aa.id,
                aa.summary,
                aa.keywords,
                aa.improvement_points,
                aa.created_at,
                e.title,
                e.company_name,
                sh.name AS showroom_name
            FROM ai_analyses aa
            JOIN exhibitions e
                ON e.id = aa.application_id
            LEFT JOIN showrooms sh
                ON sh.id = e.showroom_id
            WHERE aa.id = :analysis_id
              AND aa.status = 'completed'
            """
        ),
        {"analysis_id": analysis_id},
    ).mappings().first()

    if row is None:
        raise HTTPException(
            status_code=404,
            detail="Report not found.",
        )

    keywords = parse_json_list(row["keywords"])
    improvement_points = parse_json_list(
        row["improvement_points"]
    )

    keyword_html = "".join(
        f"<li>{html.escape(item)}</li>"
        for item in keywords
    ) or "<li>\u306a\u3057</li>"

    improvement_html = "".join(
        f"<li>{html.escape(item)}</li>"
        for item in improvement_points
    ) or "<li>\u306a\u3057</li>"

    report_html = f"""
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>AI\u5206\u6790\u30ec\u30dd\u30fc\u30c8</title>
  <style>
    body {{
      max-width: 850px;
      margin: 40px auto;
      padding: 0 24px;
      font-family: Arial, "Yu Gothic", sans-serif;
      color: #1e293b;
      line-height: 1.8;
    }}
    h1 {{
      border-bottom: 3px solid #334155;
      padding-bottom: 12px;
    }}
    h2 {{
      margin-top: 32px;
      padding-left: 12px;
      border-left: 5px solid #475569;
    }}
    .info {{
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
    }}
    .summary {{
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
      white-space: pre-wrap;
    }}
    li {{
      margin-bottom: 8px;
    }}
  </style>
</head>
<body>
  <h1>AI\u5206\u6790\u30ec\u30dd\u30fc\u30c8</h1>

  <div class="info">
    <div><strong>\u5c55\u793a\u540d\uff1a</strong>{html.escape(row["title"] or "")}</div>
    <div><strong>\u4f01\u696d\u540d\uff1a</strong>{html.escape(row["company_name"] or "")}</div>
    <div><strong>\u30b7\u30e7\u30fc\u30eb\u30fc\u30e0\uff1a</strong>{html.escape(row["showroom_name"] or "")}</div>
    <div><strong>\u4f5c\u6210\u65e5\u6642\uff1a</strong>{row["created_at"].strftime("%Y-%m-%d %H:%M")}</div>
  </div>

  <h2>\u5168\u4f53\u8981\u7d04</h2>
  <div class="summary">{html.escape(row["summary"] or "")}</div>

  <h2>\u30ad\u30fc\u30ef\u30fc\u30c9</h2>
  <ul>{keyword_html}</ul>

  <h2>\u6539\u5584\u30dd\u30a4\u30f3\u30c8</h2>
  <ol>{improvement_html}</ol>
</body>
</html>
"""
    return Response(
        content=report_html,
        media_type="text/html; charset=utf-8",
        headers={
            "Content-Disposition": (
                f'inline; filename="ai-report-{analysis_id}.html"'
            )
        },
    )
