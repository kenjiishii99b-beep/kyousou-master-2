"use client";

import { useEffect, useMemo, useState } from "react";
import { FACILITY_OPTIONS, Showroom } from "@/types/showroom";
import Image from "next/image";
import Link from "next/link";

const LABEL_MAP = Object.fromEntries(
  FACILITY_OPTIONS.map((facility) => [facility.code, facility.label]),
);

const DEFAULT_IMAGE = "/images/showrooms/showroom-main-v2.jpg";

const LOCAL_IMAGE_RULES = [
  { keyword: "札幌", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "仙台", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "さいたま", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "東京", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "横浜", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "金沢", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "名古屋", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "京都", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "大阪", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "広島", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "福岡", src: "/images/showrooms/showroom-main-v2.jpg" },
  { keyword: "那覇", src: "/images/showrooms/showroom-main-v2.jpg" },
];

function getLocalImage(showroom: Showroom) {
  const searchableText = [
    showroom.name,
    showroom.prefecture,
    showroom.city,
  ].join(" ");

  return LOCAL_IMAGE_RULES.find(({ keyword }) =>
    searchableText.includes(keyword),
  )?.src;
}

function getImageCandidates(showroom: Showroom) {
  const candidates = [
    getLocalImage(showroom),
    showroom.thumbnailUrl?.trim(),
    DEFAULT_IMAGE,
  ].filter((src): src is string => Boolean(src));

  return Array.from(new Set(candidates));
}

export function ShowroomCard({ showroom }: { showroom: Showroom }) {
  const imageCandidates = useMemo(
    () => getImageCandidates(showroom),
    [showroom],
  );
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex(0);
  }, [showroom.id, showroom.thumbnailUrl]);

  const imageSrc = imageCandidates[imageIndex] ?? DEFAULT_IMAGE;

  const handleImageError = () => {
    setImageIndex((current) =>
      current < imageCandidates.length - 1 ? current + 1 : current,
    );
  };

  return (
    <Link
      href={`/showrooms/${showroom.id}`}
      className="flex gap-4 rounded-lg border border-slate-200 p-3 transition-shadow hover:shadow-md"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-slate-100">
        <Image
          src={imageSrc}
          alt={`${showroom.name}の外観`}
          fill
          sizes="112px"
          className="object-cover"
          onError={handleImageError}
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate font-semibold text-slate-900">{showroom.name}</p>

        <p className="truncate text-xs text-slate-500">
          {showroom.prefecture}
          {showroom.city}
        </p>

        <div className="flex flex-wrap gap-1 pt-1">
          {showroom.facilities.map((code) => (
            <span
              key={code}
              className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600"
            >
              {LABEL_MAP[code]}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-500">
          <span className="whitespace-nowrap">
            月間来場者数 {showroom.monthlyVisitors.toLocaleString()}人
          </span>
          <span className="whitespace-nowrap">
            展示可能期間 {showroom.availableFrom}〜
          </span>
        </div>
      </div>
    </Link>
  );
}
