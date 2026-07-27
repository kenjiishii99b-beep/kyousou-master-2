// 展示管理（F07）用の型定義
// 仕様書 3.2「/api/admin/exhibitions」相当を想定

export type ExhibitionStatus = "pending" | "exhibiting" | "finished" | "cancelled";

export const STATUS_LABEL: Record<ExhibitionStatus, string> = {
  pending: "予定",
  exhibiting: "展示中",
  finished: "終了",
  cancelled: "中止",
};

// カレンダーの帯・凡例・バッジで共通利用する配色
export const STATUS_COLOR: Record<ExhibitionStatus, { bar: string; dot: string; badge: string }> = {
  pending: { bar: "bg-blue-200 text-blue-900", dot: "bg-blue-500", badge: "bg-blue-50 text-blue-700" },
  exhibiting: {
    bar: "bg-emerald-200 text-emerald-900",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700",
  },
  finished: { bar: "bg-slate-200 text-slate-700", dot: "bg-slate-400", badge: "bg-slate-100 text-slate-600" },
  cancelled: { bar: "bg-red-200 text-red-900", dot: "bg-red-500", badge: "bg-red-50 text-red-600" },
};

export interface ExhibitionItem {
  id: string;
  showroomName: string;
  companyName: string;
  categories: string[];
  periodFrom: string;
  periodTo: string;
  status: ExhibitionStatus;
}
