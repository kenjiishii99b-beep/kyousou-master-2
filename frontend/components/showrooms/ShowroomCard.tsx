import { FACILITY_OPTIONS, Showroom } from "@/types/showroom";
import Image from "next/image";
import Link from "next/link";

const LABEL_MAP = Object.fromEntries(
  FACILITY_OPTIONS?.map((f) => [f.code, f.label]) ?? [],
);

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='12'>No Image</text></svg>";

export function ShowroomCard({ showroom }: { showroom: Showroom }) {
  const imageUrl =
    showroom.thumbnailUrl && showroom.thumbnailUrl.trim() !== ""
      ? showroom.thumbnailUrl
      : FALLBACK_IMAGE;

  const targetId =
    showroom.id ?? (showroom as any).showroom_id ?? (showroom as any)._id;

  return (
    <Link
      href={`/showrooms/${targetId}`}
      className="flex gap-4 rounded-lg border border-slate-200 p-3 transition-shadow hover:shadow-md bg-white"
    >
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md bg-slate-100 border border-slate-100">
        <Image
          src={imageUrl}
          alt={showroom.name ?? "ショールーム"}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <p className="truncate font-semibold text-slate-900">{showroom.name}</p>
        <p className="truncate text-xs text-slate-500">
          {showroom.prefecture}
          {showroom.city}
        </p>

        <div className="flex flex-wrap gap-1 pt-1">
          {showroom.facilities?.map((code) => (
            <span
              key={code}
              className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600"
            >
              {LABEL_MAP[code] ?? code}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
          <span>
            月間来場者数{" "}
            {(
              showroom.monthlyVisitors ?? (showroom as any).monthly_visitors
            )?.toLocaleString() ?? 0}
            人
          </span>
          <span>展示可能期間 {showroom.availableFrom ?? "随時"}〜</span>
        </div>
      </div>
    </Link>
  );
}
