const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface RatingBreakdownItem {
  rating: number;
  count: number;
}

export interface PurposeBreakdownItem {
  label: string;
  count: number;
  percentage: number;
}

export interface DashboardData {
  total_responses: number;
  average_rating: number;
  positive_rate: number;
  comment_rate: number;
  rating_breakdown: RatingBreakdownItem[];
  purpose_breakdown: PurposeBreakdownItem[];
}

export interface AiAnalysisData {
  id: number;
  application_id: number;
  status: "completed" | "running" | "failed";
  summary: string;
  keywords: string[];
  improvement_points: string[];
}

export async function fetchDashboard(
  surveyId?: number,
  showroomId?: number,
  companyName?: string,
): Promise<DashboardData> {
  const params = new URLSearchParams();

  if (surveyId !== undefined) {
    params.set("survey_id", String(surveyId));
  }

  if (showroomId !== undefined) {
    params.set("showroom_id", String(showroomId));
  }

  if (companyName !== undefined) {
    params.set("company_name", companyName);
  }

  const query = params.toString();
  const url = `${API_BASE_URL}/api/admin/dashboard${
    query ? `?${query}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.detail ??
        body?.error?.message ??
        "ダッシュボード情報の取得に失敗しました。",
    );
  }

  return response.json();
}

export async function runAiAnalysis(
  applicationId: number,
): Promise<AiAnalysisData> {
  const url =
    `${API_BASE_URL}/api/admin/ai-analysis` +
    `?application_id=${applicationId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.detail ??
        body?.error?.message ??
        "AI分析の実行に失敗しました。",
    );
  }

  return response.json();
}

export async function fetchLatestAiAnalysis(
  applicationId: number,
): Promise<AiAnalysisData | null> {
  const url =
    `${API_BASE_URL}/api/admin/ai-analysis/latest` +
    `?application_id=${applicationId}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.detail ??
        body?.error?.message ??
        "保存済みAI分析の取得に失敗しました。",
    );
  }

  const body = await response.json();

  return body.analysis ?? null;
}


export interface DeleteSurveyResponsesResult {
  message: string;
  company_name: string;
  deleted_count: number;
}

export async function deleteCompanySurveyResponses(
  companyName: string,
): Promise<DeleteSurveyResponsesResult> {
  const params = new URLSearchParams({
    company_name: companyName,
  });

  const url =
    `${API_BASE_URL}/api/admin/dashboard/responses?` +
    params.toString();

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(
      body?.detail ??
        body?.error?.message ??
        "??????????????????",
    );
  }

  return response.json();
}
