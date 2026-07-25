import { Download, FileText } from "lucide-react";
import { ReportHistoryItem } from "@/types/mypage";

export function ReportHistory({ items }: { items: ReportHistoryItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
        まだレポートがありません。展示が終了すると、ここに結果レポートが表示されます。
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
      {items.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-slate-400" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{item.title}</p>
              <p className="text-xs text-slate-400">{item.date}</p>
            </div>
          </div>
          <a
            href={item.downloadUrl}
            download
            className="flex shrink-0 items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-3.5 w-3.5" />
            ダウンロード
          </a>
        </li>
      ))}
    </ul>
  );
}
