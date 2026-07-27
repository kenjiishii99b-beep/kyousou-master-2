import Link from "next/link";
import { ReportHistoryItem } from "@/types/mypage";

interface ReportHistoryProps {
  items?: ReportHistoryItem[];
}

export function ReportHistory({ items = [] }: ReportHistoryProps) {
  // items が null や undefined の場合でも安全に処理
  const safeItems = items ?? [];

  if (safeItems.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
        まだレポートがありません。展示が終了すると、ここに結果レポートが表示されます。
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
            <p className="truncate text-sm font-medium text-slate-900">
              {item.title}
            </p>

            {/* ReportHistoryItem の型に合わせて date を表示 */}
            <p className="mt-0.5 text-xs text-slate-500">
              {item.date}
            </p>
          </div>

          <Link
            href={item.downloadUrl}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            ダウンロード
          </Link>
        </li>
      ))}
    </ul>
  );
}