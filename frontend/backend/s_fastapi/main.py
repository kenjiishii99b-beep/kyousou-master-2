# ======================================================
# main.py  —  ショールーム検索・申請システム バックエンド API
# ======================================================
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# 【重要】Next.js（3000番ポート）からの接続を許可するCORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================================================
# 【モックデータ】ショールームの一覧（器）
# ======================================================
dummy_showrooms = [
    {
        "id": 1,
        "name": "栄スマートホームショールーム",
        "pref": "愛知県",
        "region": "中部",
        "category": "スマート家電",
        "target": "ファミリー向け",
        "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80",
        "description": "最新のIoT家電やAIを活用した快適な暮らしを体験できる、最先端のショールームです。駅から徒歩3分。",
        "map_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.4277719602334!2d136.90642907632617!3d35.17091497275466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x600376d66e5e4e63%3A0x7d0188941ccbe6d0!2z5qCE6aeF!5e0!3m2!1sja!2sjp!4v1710000000000!5m2!1sja!2sjp"
    },
    {
        "id": 2,
        "name": "丸の内モダンオフィス展示場",
        "pref": "東京都",
        "region": "関東",
        "category": "オフィス家具",
        "target": "ビジネス向け",
        "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
        "description": "多様な働き方に合わせた快適なオフィス環境と、デザイン性の高いインテリア家具をご提案します。",
        "map_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280303808788!2d139.76493617634863!3d35.68116077258758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x60188bfbd89f700b%3A0x2bae3706862ce36e!2z5p2x5Lqs6aeF!5e0!3m2!1sja!2sjp!4v1710000000000!5m2!1sja!2sjp"
    },
    {
        "id": 3,
        "name": "梅田ライフスタイルスタジオ",
        "pref": "大阪府",
        "region": "近畿",
        "category": "インテリア",
        "target": "一般向け",
        "image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80",
        "description": "北欧スタイルの家具を中心に、日々の暮らしに彩りを与えるコーディネートを多数展示しています。",
        "map_url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.111718042973!2d135.4935496763056!3d34.702489772922625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x6000e68d925de187%3A0x2d114f04c7d0e6c3!2z5aSn6Ziq6aeF!5e0!3m2!1sja!2sjp!4v1710000000000!5m2!1sja!2sjp"
    }
]

# ======================================================
# 【モックデータ】展示申請（予約）の一覧
# ⚠️メモリ上に保存するため、FastAPIを再起動するとリセットされます
# ======================================================
dummy_reservations = [
    {
        "id": 1,
        "applicant_member_id": 2,
        "showroom_id": 1,
        "product_name": "スマートホーム展示デバイス",
        "product_description": "商品の概要説明サンプル",
        "exhibition_purpose": "ユーザー検証のため",
        "requested_start_date": "2026-08-01",
        "requested_end_date": "2026-08-31",
        "required_space": "幅2m×奥行1m",
        "setup_requirements": "100V電源が必要",
        "status": "pending",  # 初期ステータス（申請中）
        "reviewed_by_member_id": None,
        "reviewed_at": None,
        "review_comment": None
    }
]

# 展示申請を受け取るためのデータ構造の定義（フロントから送信される9項目）
class ExhibitionApplicationCreate(BaseModel):
    applicant_member_id: int
    showroom_id: int
    product_name: str
    product_description: Optional[str] = None
    exhibition_purpose: Optional[str] = None
    requested_start_date: str
    requested_end_date: str
    required_space: Optional[str] = None
    setup_requirements: Optional[str] = None


# ======================================================
# ① ヘルスチェック
# ======================================================
@app.get("/")
def read_root():
    return {"message": "Showroom API is running!"}


# ======================================================
# ➁ F3：ショールーム検索エンドポイント（AND検索・完全一致）
# ======================================================
@app.get("/api/showrooms")
def get_showrooms(
    pref: Optional[str] = Query(None),
    region: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    target: Optional[str] = Query(None)
):
    results = []
    for item in dummy_showrooms:
        if pref and item["pref"] != pref:
            continue
        if region and item["region"] != region:
            continue
        if category and item["category"] != category:
            continue
        if target and item["target"] != target:
            continue
        results.append(item)
        
    return {"results": results, "total": len(results)}
# ======================================================
# F4：ショールーム詳細取得
# ======================================================
@app.get("/api/showrooms/{showroom_id}")
def get_showroom_detail(showroom_id: int):
    for showroom in dummy_showrooms:
        if showroom["id"] == showroom_id:
            return showroom

    return {
        "status": "error",
        "message": "指定されたショールームが見つかりません"
    }

# ======================================================
# ➂ F5：展示申請（データ受け取りの器：9項目対応）
# ======================================================
@app.post("/exhibition_applications")
@app.post("/api/appointments")  # 互換性のため旧URLも残してあります
def create_exhibition_application(req: ExhibitionApplicationCreate):
    new_res = {
        "id": len(dummy_reservations) + 1,
        "applicant_member_id": req.applicant_member_id,
        "showroom_id": req.showroom_id,
        "product_name": req.product_name,
        "product_description": req.product_description,
        "exhibition_purpose": req.exhibition_purpose,
        "requested_start_date": req.requested_start_date,
        "requested_end_date": req.requested_end_date,
        "required_space": req.required_space,
        "setup_requirements": req.setup_requirements,
        "status": "pending",  # バックエンドで自動付与
        "reviewed_by_member_id": None,
        "reviewed_at": None,
        "review_comment": None
    }
    dummy_reservations.append(new_res)
    return {"status": "success", "message": "申請が完了しました", "data": new_res}


# ======================================================
# ④ F8：展示管理（予約一覧テーブル用）
# ======================================================
@app.get("/exhibition_applications")
@app.get("/api/reservations")  # 互換性のため旧URLも残してあります
def get_reservations():
    # 開始日付順（昇順）に並び替えて返す
    sorted_res = sorted(dummy_reservations, key=lambda x: x["requested_start_date"])
    return {"results": sorted_res, "total": len(sorted_res)}