import { NoticeItem, EventInfo } from "@/types/notice";

interface NoticesResponse {
  notices: NoticeItem[];
  events: EventInfo[];
}

export async function fetchNotices(): Promise<NoticesResponse> {
  const res = await fetch("/api/notices", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message ?? "お知らせの取得に失敗しました。");
  }

  return res.json();
}
