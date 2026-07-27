const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export async function fetchMypage() {
  // ブラウザのストレージからアクセストークンを取得
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const res = await fetch(`${API_BASE_URL}/api/mypage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);

    throw new Error(
      err?.detail ||
        err?.message ||
        "マイページ情報の取得に失敗しました。"
    );
  }

  return res.json();
}