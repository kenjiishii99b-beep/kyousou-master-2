import { Showroom } from "@/types/showroom";
import { ShowroomCard } from "./ShowroomCard";

interface ShowroomListProps {
  items: Showroom[];
  total: number;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onReset: () => void;
}

export function ShowroomList({
  items,
  total,
  loading,
  hasMore,
  onLoadMore,
  onReset,
}: ShowroomListProps) {
  if (loading && items.length === 0) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-lg bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-slate-300 py-16 text-center">
        <p className="text-sm text-slate-600">
          条件に一致するショールームが見つかりませんでした。
        </p>
        <button
          type="button"
          onClick={onReset}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          条件をリセットする
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">検索結果：{total}件</p>

      <div className="space-y-3">
        {items.map((showroom) => (
          <ShowroomCard key={showroom.id} showroom={showroom} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loading}
            className="rounded-md border border-slate-300 px-6 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {loading ? "読み込み中..." : "さらに表示する"}
          </button>
        </div>
      )}
    </div>
  );
}
