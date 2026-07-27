import { ShowroomDetail } from "@/types/showroomDetail";

// 仕様書 3.2: GET /api/showrooms/{id}
// ショールーム詳細、設備、写真、空き状況を返却。

export async function fetchShowroomDetail(id: string): Promise<ShowroomDetail> {
  const res = await fetch(`/api/showrooms/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    // 仕様書 3.3 共通エラーコード形式: { error: { code, message } }
    const body = await res.json().catch(() => null);
    if (res.status === 404) {
      throw new Error(body?.error?.message ?? "指定のショールームが見つかりません。");
    }
    throw new Error(body?.error?.message ?? "詳細情報の取得に失敗しました。");
  }

  return res.json();
}
