"use client";

import { Calendar, CheckCircle2, MapPin } from "lucide-react";

type ShowroomHeaderProps = {
  category: string;
  name: string;
  address: string;
  availableFrom: string;
  available: boolean;
};

export default function ShowroomHeader({
  category,
  name,
  address,
  availableFrom,
  available,
}: ShowroomHeaderProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          {/* カテゴリ */}
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-[#0e2147]">
            {category}
          </span>

          {/* タイトル */}
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            {name}
          </h1>

        </div>

        {/* 空き状況 */}
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
            available
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />

          {available
            ? "空きあり（即時予約可）"
            : "現在利用できません"}
        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-8 border-t pt-5 text-sm text-gray-600">

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {address}
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          利用可能開始時期：{availableFrom}～
        </div>

      </div>

    </section>
  );
}