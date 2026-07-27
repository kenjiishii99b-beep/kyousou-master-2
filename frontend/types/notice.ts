// トップページ（F01）用の型定義
// 仕様書 3.2「/api/notices」相当を想定

export type NoticeType = "notice" | "event";

export interface NoticeItem {
  id: string;
  type: NoticeType;
  title: string;
  date: string; // ISO date (YYYY-MM-DD)
}

export interface EventInfo {
  id: string;
  title: string;
  date: string; // ISO date
  time: string; // 例: "14:00〜16:00"
  format: string; // 例: "オンライン開催（参加無料）"
}
