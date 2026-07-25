import { SurveyAnswers, SurveyDefinition } from "@/types/survey";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function fetchSurvey(
  token: string,
): Promise<SurveyDefinition> {
  const res = await fetch(`/api/surveys/${encodeURIComponent(token)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);

    if (res.status === 404) {
      throw new Error(
        body?.error?.message ??
          "アンケートが見つかりません。リンクの有効期限が切れている可能性があります。",
      );
    }

    throw new Error(
      body?.error?.message ?? "アンケートの取得に失敗しました。",
    );
  }

  return res.json();
}

interface SubmitSurveyResponse {
  message: string;
  answer_id: number;
  respondent_token: string;
}

export async function submitSurveyAnswers(
  token: string,
  answers: SurveyAnswers,
): Promise<SubmitSurveyResponse> {
  const rating =
    typeof answers.q1 === "number"
      ? answers.q1
      : Number(answers.q1);

  const visitPurpose =
    typeof answers.q2 === "string" ? answers.q2 : null;

  const comment =
    typeof answers.q3 === "string" && answers.q3.trim()
      ? answers.q3.trim()
      : null;

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("満足度を1〜5で選択してください。");
  }

  if (!visitPurpose) {
    throw new Error("来場目的を選択してください。");
  }

  const res = await fetch(
    `${API_BASE_URL}/api/surveys/${encodeURIComponent(token)}/responses`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        rating,
        visit_purpose: visitPurpose,
        comment,
      }),
    },
  );

  if (!res.ok) {
    const body = await res.json().catch(() => null);

    throw new Error(
      body?.detail ??
        body?.error?.message ??
        "アンケートの送信に失敗しました。",
    );
  }

  return res.json();
}
