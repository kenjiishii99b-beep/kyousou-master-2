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


export interface DeleteAllExhibitionsResult {
  message: string;
  deleted_exhibitions: number;
  deleted_schedules: number;
  deleted_ai_analyses: number;
}

export async function deleteAllExhibitions(): Promise<DeleteAllExhibitionsResult> {
  const res = await fetch("/api/admin/exhibitions", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);

    throw new Error(
      body?.error?.message ??
        "\u5c55\u793a\u30c7\u30fc\u30bf\u306e\u524a\u9664\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
    );
  }

  return res.json();
}
