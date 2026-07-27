"use client";

import Link from "next/link";
import { CalendarDays, MapPin, Image as ImageIcon } from "lucide-react";

const events = [
  {
    id: 1,
    title: "スタートアップ交流会",
    date: "2024/07/10",
    place: "東京ショールーム",
  },
  {
    id: 2,
    title: "展示企業説明会",
    date: "2024/07/24",
    place: "大阪ショールーム",
  },
];

export default function EventSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          イベント
        </h2>

        <Link
          href="/events"
          className="text-xs text-blue-600 hover:underline"
        >
          一覧を見る
        </Link>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
          >
            {/* サムネイル */}
            <div className="flex h-40 items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center text-gray-400">
                <ImageIcon className="h-10 w-10" />
                <span className="mt-2 text-xs">
                  イベント画像
                </span>
              </div>
            </div>

            {/* 内容 */}
            <div className="space-y-3 p-4">
              <h3 className="font-semibold text-gray-900">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CalendarDays className="h-4 w-4" />
                {event.date}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {event.place}
              </div>

              <Link
                href={`/events/${event.id}`}
                className="inline-block pt-2 text-sm font-medium text-blue-600 hover:underline"
              >
                詳細を見る →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}