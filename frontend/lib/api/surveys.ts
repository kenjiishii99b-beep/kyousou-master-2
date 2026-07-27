import { SurveyAnswers, SurveyDefinition } from "@/types/survey";

// FastAPIのURLを定義
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function fetchSurvey(token: string): Promise<SurveyDefinition> {
  // 取得処理はNext.jsのAPIルート（先ほど直したGETのroute.ts）をそのまま使います
  const res = await fetch(`/api/surveys/${token}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    if (res.status === 404) {
      throw new Error(body?.error?.message ?? "アンケートが見つかりません。リンクの有効期限が切れている可能性があります。");
    }
    throw new Error(body?.error?.message ?? "アンケートの取得に失敗しました。");
  }

  return res.json();
}

export async function submitSurveyAnswers(
  token: string,
  answers: SurveyAnswers
): Promise<{ success: boolean }> {
  // 1. フロントエンドの回答データ(q1, q2, q3)をFastAPIが期待する型(rating, purpose, comment)に変換
  const payload = {
    rating: Number(answers["q1"]) || 0,
    purpose: String(answers["q2"]) || "未回答",
    comment: String(answers["q3"]) || "",
  };

  // 2. バックエンド(FastAPI)の /api/feedback/ エンドポイントへ直接POST送信
  const res = await fetch(`${API_BASE_URL}/api/feedback/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    // サーバーエラーの詳細を画面に返すようにして原因を見やすくします
    throw new Error(`送信エラー: ${res.status} - ${errorText}`);
  }

  return { success: true };
}