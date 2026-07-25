import Link from "next/link";

import {
  ExhibitionItem,
  STATUS_COLOR,
  STATUS_LABEL,
} from "@/types/exhibition";

export function UpcomingList({
  items,
  onSelect,
}: {
  items: ExhibitionItem[];
  onSelect: (item: ExhibitionItem) => void;
}) {
  const sorted = [...items].sort((a, b) =>
    a.periodFrom.localeCompare(b.periodFrom),
  );

  return (
    <aside className="space-y-3">
      <h2 className="text-sm font-semibold text-slate-900">
        今後の展示予定
      </h2>

      {sorted.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
          今後の展示予定はありません。
        </div>
      ) : (
        <ul className="space-y-2">
          {sorted.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="w-full rounded-lg border border-slate-200 p-3 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 truncate text-sm font-semibold text-slate-900">
                    {item.productName || "製品名未登録"}
                  </p>

                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium ${
                      STATUS_COLOR[item.status].badge
                    }`}
                  >
                    {STATUS_LABEL[item.status]}
                  </span>
                </div>

                <p className="mt-1 truncate text-xs text-slate-600">
                  {item.companyName}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {item.showroomName}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {item.periodFrom} ～ {item.periodTo}
                </p>
              </button>
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/admin/exhibitions"
        className="block text-right text-xs text-blue-600 hover:underline"
      >
        すべての展示一覧を見る
      </Link>
    </aside>
  );
}
