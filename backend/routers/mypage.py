from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import get_db
from .models_member import Member
from .models_application import ExhibitionApplication
from typing import Optional

# 💡 prefix を "/api/mypage" に正しく設定
router = APIRouter(
    prefix="/api/mypage",
    tags=["mypage"]
)


@router.get("/")
def get_mypage_data(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None)
):
    print("💡 [デバッグ] マイページAPIが呼び出されました！")

    # 1. トークンチェック
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="認証されていません。ログインしてください。")

    # 2. トークンからユーザーIDを取り出す
    token = authorization.replace("Bearer ", "")
    try:
        target_user_id = int(token.split("-")[-1])
        print(f"✅ [デバッグ] 認証成功: ユーザーID {target_user_id} のデータを取得します。")
    except ValueError:
        raise HTTPException(status_code=401, detail="無効なトークンです。")

    # 3. 会員情報を取得
    member = db.query(Member).filter(Member.id == target_user_id).first()

    if not member:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")

    # 4. DBからログイン中ユーザーの展示申請履歴を取得
    applications = (
        db.query(ExhibitionApplication)
        .filter(ExhibitionApplication.applicant_member_id == target_user_id)
        .all()
    )

    # 5. フロントエンド（Next.js）の型に合わせて整形
    formatted_applications = []
    for app in applications:
        formatted_applications.append({
            "id": str(app.id),
            "showroomId": str(app.showroom_id),
            "showroomName": app.product_name or "展示申請",
            "periodFrom": str(app.requested_start_date) if app.requested_start_date else "",
            "periodTo": str(app.requested_end_date) if app.requested_end_date else "",
            "categories": ["展示申請"],
            "status": app.status or "pending",
        })

    name_parts = member.display_name.split(" ") if member.display_name else ["", ""]
    last_name = name_parts[0]
    first_name = name_parts[1] if len(name_parts) > 1 else ""

    return {
        "profile": {
            "lastName": last_name,
            "firstName": first_name,
            "companyName": member.organization_name,
            "email": member.email,
            "phone": "未登録"
        },
        "applications": formatted_applications,
        "reports": []
    }