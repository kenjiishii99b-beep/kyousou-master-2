const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface SurveyResponseItem {
  answer_id: number;
  survey_id: number;
  schedule_id: number;
  survey_title: string;
  showroom_id: number;
  showroom_name: string | null;
  exhibition_title: string | null;
  rating: number;
  visit_purpose: string | null;
  comment: string | null;
  ai_analysis_status: string;
  answered_at: string;
}

export interface SurveyResponsesResult {
  items: SurveyResponseItem[];
  total: number;
}

export async function fetchSurveyResponses(): Promise<SurveyResponsesResult> {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/survey-responses`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.detail ??
        body?.error?.message ??
        "アンケート回答の取得に失敗しました。",
    );
  }

  return response.json();
}