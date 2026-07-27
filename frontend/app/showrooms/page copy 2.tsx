"use client";

import { useEffect, useState } from "react";
import { SearchFilter } from "@/components/showrooms/SearchFilter";
import { ShowroomList } from "@/components/showrooms/ShowroomList";
import { MapView } from "@/components/showrooms/MapView";
import { fetchShowrooms } from "@/lib/api/showrooms";
import { DEFAULT_FILTERS, SearchFilters, Showroom } from "@/types/showroom";

export default function ShowroomSearchPage() {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [items, setItems] = useState<Showroom[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);

  const runSearch = async (nextFilters: SearchFilters, append: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchShowrooms(nextFilters);
      setItems((prev) => (append ? [...prev, ...res.items] : res.items));
      setTotal(res.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "検索に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  // 初回表示時
  useEffect(() => {
    runSearch(DEFAULT_FILTERS, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    const next = { ...filters, page: 1 };
    setFilters(next);
    runSearch(next, false);
  };

  // 💡 地図上の都道府県がクリックされた時の処理を追加
  const handleSelectPrefecture = (prefectureName: string) => {
    const next = { ...filters, prefecture: prefectureName, page: 1 };
    setFilters(next);
    runSearch(next, false);
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    runSearch(DEFAULT_FILTERS, false);
  };

  const handleLoadMore = () => {
    const next = { ...filters, page: filters.page + 1 };
    setFilters(next);
    runSearch(next, true);
  };

  const handleSaveCondition = () => {
    console.log("save condition", filters);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 space-y-1">
        <h1 className="text-xl font-bold text-slate-900">ショールーム検索</h1>
        <p className="text-sm text-slate-500">
          条件を指定して、最適なショールームを検索できます。
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <SearchFilter
          filters={filters}
          onChange={setFilters}
          onSearch={handleSearch}
          onReset={handleReset}
          onSaveCondition={handleSaveCondition}
        />

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-end gap-2 text-sm">
            <span className="text-slate-600">地図で表示</span>
            <button
              type="button"
              role="switch"
              aria-checked={showMap}
              onClick={() => setShowMap((v) => !v)}
              className={`h-5 w-9 rounded-full transition-colors ${
                showMap ? "bg-slate-900" : "bg-slate-300"
              }`}
            >
              <span
                className={`block h-4 w-4 translate-y-0.5 rounded-full bg-white transition-transform ${
                  showMap ? "translate-x-4.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <div
            className={`grid gap-6 ${
              showMap ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {/* 💡 Prop名を items から showrooms へ変更し、都道府県選択イベントを接続 */}
            {showMap && (
              <MapView
                showrooms={items}
                selectedPrefecture={filters.prefecture}
                onSelectPrefecture={handleSelectPrefecture}
              />
            )}

            <ShowroomList
              items={items}
              total={total}
              loading={loading}
              hasMore={items.length < total}
              onLoadMore={handleLoadMore}
              onReset={handleReset}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
