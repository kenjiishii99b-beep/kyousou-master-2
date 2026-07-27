"use client";

import { DEFAULT_SHOWROOM_IMAGE } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export type ShowroomCardProps = {
  id: number;
  name: string;
  address: string;
  thumbnailUrl?: string;
  categories: string[];
  monthlyVisitors: number;
  availableFrom: string;
};

export default function ShowroomCard({
  id,
  name,
  address,
  thumbnailUrl,
  categories,
  monthlyVisitors,
  availableFrom,
}: ShowroomCardProps) {
  const imageUrl =
    thumbnailUrl && thumbnailUrl.trim() !== ""
      ? thumbnailUrl
      : DEFAULT_SHOWROOM_IMAGE;

  return (
    <Link href={`/showrooms/${id}`}>
      <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md">
        <div className="flex gap-5">
          {/* サムネイル */}
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          {/* 中央 */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>

            <p className="mt-1 text-sm text-gray-500">{address}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* 右側 */}
          <div className="flex w-44 flex-col items-end justify-center border-l border-gray-200 pl-6">
            <div className="text-sm text-gray-500">月間来場者数</div>

            <div className="text-2xl font-bold text-[#0e2147]">
              {monthlyVisitors.toLocaleString()}人
            </div>

            <div className="mt-4 text-sm text-gray-500">展示可能期間</div>

            <div className="font-semibold">{availableFrom}～</div>
          </div>
        </div>
      </article>
    </Link>
  );
}
