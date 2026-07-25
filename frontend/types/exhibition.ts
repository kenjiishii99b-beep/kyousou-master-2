export type ExhibitionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "exhibiting"
  | "finished"
  | "cancelled";

export const STATUS_LABEL: Record<ExhibitionStatus, string> = {
  pending: "\u7533\u8acb\u4e2d",
  approved: "\u627f\u8a8d\u6e08\u307f",
  rejected: "\u5374\u4e0b",
  exhibiting: "\u5c55\u793a\u4e2d",
  finished: "\u7d42\u4e86",
  cancelled: "\u4e2d\u6b62",
};

export const STATUS_COLOR: Record<
  ExhibitionStatus,
  { bar: string; dot: string; badge: string }
> = {
  pending: {
    bar: "bg-blue-100 text-blue-800",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800",
  },
  approved: {
    bar: "bg-emerald-100 text-emerald-800",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-800",
  },
  rejected: {
    bar: "bg-red-100 text-red-800",
    dot: "bg-red-500",
    badge: "bg-red-100 text-red-800",
  },
  exhibiting: {
    bar: "bg-emerald-600 text-white",
    dot: "bg-emerald-600",
    badge: "bg-emerald-600 text-white",
  },
  finished: {
    bar: "bg-slate-200 text-slate-700",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600",
  },
  cancelled: {
    bar: "border border-orange-400 bg-orange-200 text-orange-900",
    dot: "bg-orange-500",
    badge: "border border-orange-300 bg-orange-200 text-orange-900",
  },
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
