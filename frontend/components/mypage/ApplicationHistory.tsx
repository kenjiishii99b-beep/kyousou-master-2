import Link from "next/link";
import { ApplicationHistoryItem, STATUS_LABEL } from "@/types/mypage";

const STATUS_STYLE: Record<ApplicationHistoryItem["status"], string> = {
  pending: "bg-blue-50 text-blue-700",
  exhibiting: "bg-emerald-50 text-emerald-700",
  finished: "bg-slate-100 text-slate-500",
  cancelled: "bg-red-50 text-red-600",
};

export function ApplicationHistory({
  items = [],
}: {
  items?: ApplicationHistoryItem[];
}) {
  // items が null または undefined の場合でも空配列として安全に処理
  const safeItems = items ?? [];

  if (safeItems.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
        まだ展示申請の履歴がありません。
        <Link href="/showrooms" className="ml-1 text-blue-600 hover:underline">
          ショールームを探す
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
      {safeItems.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between gap-4 px-4 py-3"
        >
          <div className="min-w-0 flex-1">
            <Link
              href={`/showrooms/${item.showroomId}`}
              className="truncate text-sm font-medium text-slate-900 hover:underline"
            >
              {item.showroomName}
            </Link>
            <p className="mt-0.5 text-xs text-slate-500">
              {item.periodFrom}〜{item.periodTo} ／{" "}
              {item.categories?.join("、") ?? ""}
            </p>
          </div>
          <span
            className={`shrink-0 rounded px-2 py-1 text-xs font-medium ${STATUS_STYLE[item.status] ?? "bg-slate-100 text-slate-700"}`}
          >
            {STATUS_LABEL[item.status] ?? item.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
