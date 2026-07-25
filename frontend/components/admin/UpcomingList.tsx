import { ExhibitionItem, STATUS_COLOR, STATUS_LABEL } from "@/types/exhibition";

export function UpcomingList({
  items,
  onSelect,
}: {
  items: ExhibitionItem[];
  onSelect: (item: ExhibitionItem) => void;
}) {
  const sorted = [...items].sort((a, b) => a.periodFrom.localeCompare(b.periodFrom));

  return (
    <aside className="space-y-3">
      <h2 className="text-sm font-semibold text-slate-900">今後の展示予定</h2>
      <ul className="space-y-2">
        {sorted.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="w-full rounded-lg border border-slate-200 p-3 text-left hover:bg-slate-50"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-slate-900">
                  {item.showroomName}
                </p>
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium ${STATUS_COLOR[item.status].badge}`}
                >
                  {STATUS_LABEL[item.status]}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">
                {item.periodFrom}〜{item.periodTo}
              </p>
            </button>
          </li>
        ))}
      </ul>
      <a href="#" className="block text-right text-xs text-blue-600 hover:underline">
        すべての展示一覧を見る
      </a>
    </aside>
  );
}
