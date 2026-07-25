import { MypageResponse } from "@/types/mypage";

export async function fetchMypage(): Promise<MypageResponse> {
  const res = await fetch("/api/mypage", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? "マイページ情報の取得に失敗しました。");
  }

  return res.json();
}
