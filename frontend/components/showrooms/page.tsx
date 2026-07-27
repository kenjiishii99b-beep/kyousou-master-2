"use client";

import SearchFilter from "@/components/showrooms/SearchFilter";
import ShowroomList from "@/components/showrooms/ShowroomList";

export default function ShowroomsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* タイトル */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ショールーム検索
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          条件を指定してショールームを検索できます。
        </p>
      </div>

      {/* レイアウト */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* 左側：検索条件 */}
        <aside className="lg:col-span-4">
          <SearchFilter />
        </aside>

        {/* 右側：検索結果 */}
        <section className="lg:col-span-8">
          <ShowroomList />
        </section>
      </div>
    </main>
  );
}