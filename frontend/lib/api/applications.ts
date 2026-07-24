const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export interface ApplicationPayload {
  showroom_id: number;
  showroom_name: string;
  period_from: string;
  period_to: string;
  category: string;
  notes?: string;
}

export async function submitApplication(payload: ApplicationPayload) {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  if (!token) {
    throw new Error("ログインが必要です。");
  }

  const res = await fetch(`${API_BASE_URL}/api/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    let errorMessage = "申請の送信に失敗しました。";

    if (typeof errorData.detail === "string") {
      errorMessage = errorData.detail;
    } else if (Array.isArray(errorData.detail)) {
      errorMessage = errorData.detail
        .map((e: any) => `${e.loc?.at(-1)}: ${e.msg}`)
        .join(" / ");
    } else if (errorData.message) {
      errorMessage = errorData.message;
    }

    throw new Error(errorMessage);
  }

  return res.json();
}