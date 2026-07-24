import { ExhibitionItem, ExhibitionStatus } from "@/types/exhibition";

export async function fetchExhibitions(): Promise<{ items: ExhibitionItem[] }> {
  const res = await fetch("/api/admin/exhibitions", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? "展示一覧の取得に失敗しました。");
  }

  return res.json();
}

export async function updateExhibitionStatus(
  id: string,
  status: ExhibitionStatus,
  reason?: string
): Promise<{ item: ExhibitionItem }> {
  const res = await fetch(`/api/admin/exhibitions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, reason }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? "ステータスの更新に失敗しました。");
  }

  return res.json();
}
