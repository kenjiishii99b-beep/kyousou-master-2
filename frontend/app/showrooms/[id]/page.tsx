"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  CalendarDays,
  Users,
  Navigation,
} from "lucide-react";
import { fetchShowroomDetail } from "@/lib/api/showroomDetail";
import { ShowroomDetail } from "@/types/showroomDetail";
import { PhotoGallery } from "@/components/showrooms/PhotoGallery";
import { FacilityTags } from "@/components/showrooms/FacilityTags";
import { VisitorProfileCard } from "@/components/showrooms/VisitorProfileCard";
import { StaticMapView } from "@/components/showrooms/StaticMapView";

export default function ShowroomDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [showroom, setShowroom] = useState<ShowroomDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);
    setShowroom(null);

    fetchShowroomDetail(params.id)
      .then((data) => {
        if (!cancelled) {
          setShowroom(data);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : "取得に失敗しました。",
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="h-80 animate-pulse rounded-lg bg-slate-100" />
      </main>
    );
  }

  if (error || !showroom) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center">
        <p className="text-sm text-slate-600">
          {error ?? "ショールームが見つかりませんでした。"}
        </p>
        <button
          type="button"
          onClick={() => router.push("/showrooms")}
          className="mt-4 rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          検索画面へ戻る
        </button>
      </main>
    );
  }

  const monthlyVisitors = Number(showroom.monthlyVisitors ?? 0);
  const photos = Array.isArray(showroom.photos) ? showroom.photos : [];
  const facilities = Array.isArray(showroom.facilities)
    ? showroom.facilities
    : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <PhotoGallery photos={photos} alt={showroom.name} />

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {showroom.name}
            </h1>

            <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
              <MapPin className="h-4 w-4 shrink-0" />
              {showroom.prefecture}
              {showroom.city}
              {showroom.address}
            </p>

            <dl className="mt-3 space-y-1.5 text-sm text-slate-600">
              <div className="flex items-start gap-2">
                <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  {showroom.access || "アクセス情報は準備中です"}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  営業時間 {showroom.businessHours || "10:00〜17:00"}
                  {" ／ "}
                  休館日 {showroom.closedDays || "水曜日"}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span className="whitespace-nowrap">
                  月間来場者数 約
                  {Number.isFinite(monthlyVisitors)
                    ? monthlyVisitors.toLocaleString()
                    : "0"}
                  人
                </span>
              </div>

              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <span>
                  展示可能期間 {showroom.availableFrom || "随時"}
                  {showroom.availableTo
                    ? `〜${showroom.availableTo}`
                    : "〜"}
                </span>
              </div>
            </dl>
          </div>

          <FacilityTags facilities={facilities} />

          {showroom.visitorProfile && (
            <VisitorProfileCard profile={showroom.visitorProfile} />
          )}
        </div>

        <aside className="space-y-4">
          <StaticMapView
            key={showroom.id}
            locations={[showroom]}
            className="mx-auto aspect-square w-full max-w-64"
          />

          <div className="space-y-2">
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/applications/new?showroomId=${showroom.id}`,
                )
              }
              className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              展示申請へ進む
            </button>

            <button
              type="button"
              className="w-full rounded-md border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              空き状況確認
            </button>

            <button
              type="button"
              className="w-full rounded-md border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              問い合わせる
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
