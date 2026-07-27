"use client";

import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/mypage/ProfileCard";
import { ApplicationHistory } from "@/components/mypage/ApplicationHistory";
import { ReportHistory } from "@/components/mypage/ReportHistory";
import { fetchMypage } from "@/lib/api/mypage";
import { MypageResponse } from "@/types/mypage";

export default function MypagePage() {
  const [data, setData] = useState<MypageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMypage()
      .then(setData)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "取得に失敗しました。"),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="h-40 animate-pulse rounded-lg bg-slate-100" />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-slate-600">
        {error ?? "マイページ情報が取得できませんでした。"}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div>
        <h1 className="mb-4 text-xl font-bold text-slate-900">マイページ</h1>
        {data.profile && <ProfileCard profile={data.profile} />}
      </div>

      <section>
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          展示申請履歴
        </h2>
        <ApplicationHistory items={data.applications} />
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-slate-900">
          レポート履歴
        </h2>
        <ReportHistory items={data.reports} />
      </section>
    </main>
  );
}
