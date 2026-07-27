"use client";

import SearchHeader from "./SearchHeader";
import ShowroomCard from "./ShowroomCard";

import { Showroom } from "@/types/showroom";

type ShowroomListProps = {
  showrooms: Showroom[];
  total: number;
};

export default function ShowroomList({ showrooms, total }: ShowroomListProps) {
  return (
    <div className="space-y-6">
      {/* 件数 */}
      <SearchHeader total={total} />

      {/* 一覧 */}
      <div className="space-y-4">
        {showrooms.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-gray-500">
            該当するショールームはありません。
          </div>
        ) : (
          showrooms.map((showroom) => (
            <ShowroomCard
              key={showroom.id}
              id={showroom.id}
              name={showroom.name}
              address={showroom.address}
              thumbnailUrl={showroom.thumbnailUrl}
              categories={showroom.facilities}
              monthlyVisitors={showroom.monthlyVisitors}
              availableFrom={showroom.availableFrom}
            />
          ))
        )}
      </div>

      {/* さらに表示 */}
      {showrooms.length > 0 && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            さらに表示する
          </button>
        </div>
      )}
    </div>
  );
}
