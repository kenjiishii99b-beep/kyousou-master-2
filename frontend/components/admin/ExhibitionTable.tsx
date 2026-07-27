import { ExhibitionItem, STATUS_COLOR, STATUS_LABEL } from "@/types/exhibition";

export function ExhibitionTable({
  items,
  onSelect,
}: {
  items: ExhibitionItem[];
  onSelect: (item: ExhibitionItem) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
        該当する展示はありません。
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs text-slate-500">
          <tr>
            <th className="px-4 py-2 font-medium">ショールーム</th>
            <th className="px-4 py-2 font-medium">企業名</th>
            <th className="px-4 py-2 font-medium">期間</th>
            <th className="px-4 py-2 font-medium">カテゴリ</th>
            <th className="px-4 py-2 font-medium">ステータス</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((item) => (
            <tr
              key={item.id}
              onClick={() => onSelect(item)}
              className="cursor-pointer hover:bg-slate-50"
            >
              <td className="px-4 py-3 font-medium text-slate-900">{item.showroomName}</td>
              <td className="px-4 py-3 text-slate-600">{item.companyName}</td>
              <td className="px-4 py-3 text-slate-600">
                {item.periodFrom}〜{item.periodTo}
              </td>
              <td className="px-4 py-3 text-slate-600">{item.categories.join("、")}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${STATUS_COLOR[item.status].badge}`}
                >
                  {STATUS_LABEL[item.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
