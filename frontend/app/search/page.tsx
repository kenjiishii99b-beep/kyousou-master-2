"use client";

import { useCallback, useEffect, useState } from "react";

import { SearchFilter } from "@/components/showrooms/SearchFilter";
import { ShowroomList } from "@/components/showrooms/ShowroomList";

import { fetchShowrooms } from "@/lib/api/showrooms";

import {
  SearchFilters,
  Showroom,
} from "@/types/showroom";

const DEFAULT_FILTERS: SearchFilters = {
  prefecture: "",
  area: "",
  categories: [],
  visitorAttribute: "",
};

export default function ShowroomSearchPage() {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

  const [showrooms, setShowrooms] = useState<Showroom[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [total, setTotal] = useState(0);

  //--------------------------------------------------
  // 検索実行
  //--------------------------------------------------

  const runSearch = useCallback(
    async (nextFilters: SearchFilters = filters, showLoading = true) => {
      try {
        if (showLoading) {
          setLoading(true);
        }

        setError("");

        const response = await fetchShowrooms(nextFilters);

        setShowrooms(response.items);
        setTotal(response.total);
      } catch (e) {
        console.error(e);

        setShowrooms([]);
        setTotal(0);

        setError("ショールーム情報の取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  //--------------------------------------------------
  // 初回読込
  //--------------------------------------------------

  useEffect(() => {
    runSearch(DEFAULT_FILTERS);
  }, [runSearch]);

  //--------------------------------------------------
  // 検索ボタン
  //--------------------------------------------------

  const handleSearch = () => {
    runSearch(filters);
  };

  //--------------------------------------------------
  // リセット
  //--------------------------------------------------

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);

    runSearch(DEFAULT_FILTERS);
  };

  //--------------------------------------------------
  // 条件保存（仮）
  //--------------------------------------------------

  const handleSaveCondition = () => {
    alert("検索条件保存は今後実装予定です。");
  };

  //--------------------------------------------------
  // ここから画面
  //--------------------------------------------------

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">ショールーム検索</h1>

        <p className="text-sm text-slate-500 mt-2">
          条件を指定してショールームを検索できます。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
        <SearchFilter
          filters={filters}
          onChange={setFilters}
          onSearch={handleSearch}
          onReset={handleReset}
          onSaveCondition={handleSaveCondition}
        />

        {/* ← 次回ここから続き */}
        <div className="space-y-4">
          {/* 件数表示 */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">検索結果</h2>

            <span className="text-sm text-slate-600">{total} 件</span>
          </div>

          {/* ローディング */}
          {loading && (
            <div className="rounded-lg border border-slate-200 bg-white p-10 text-center">
              <p className="text-slate-500">
                ショールーム情報を読み込んでいます...
              </p>
            </div>
          )}

          {/* エラー */}
          {!loading && error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-6">
              <p className="text-red-600">{error}</p>
            </div>
          )}

         
          {/* 一覧 */}
          {!loading && !error && (
            <ShowroomList
              items={showrooms}
              total={total}
              loading={loading}
              hasMore={false}
              onLoadMore={() => {}}
              onReset={handleReset}
            />
          )}
          
          
        </div>
      </div>
    </main>
  );
}