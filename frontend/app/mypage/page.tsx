"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart3, CalendarDays, ClipboardCheck } from "lucide-react";
import { ProfileCard } from "@/components/mypage/ProfileCard";
import { ApplicationHistory } from "@/components/mypage/ApplicationHistory";
import { ReportHistory } from "@/components/mypage/ReportHistory";
import { fetchMypage } from "@/lib/api/mypage";
import { useAuth } from "@/lib/auth/AuthContext";
import { MypageResponse } from "@/types/mypage";

export default function MypagePage() {
  const { user } = useAuth();
  const [data, setData] = useState<MypageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMypage()
      .then(setData)
      .catch((e) =>
        setError(
          e instanceof Error
            ? e.message
            : "\u30de\u30a4\u30da\u30fc\u30b8\u306e\u53d6\u5f97\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
        ),
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
        {error ??
          "\u30de\u30a4\u30da\u30fc\u30b8\u60c5\u5831\u3092\u53d6\u5f97\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002"}
      </main>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div>
        <h1 className="mb-4 text-xl font-bold text-slate-900">
          {"\u30de\u30a4\u30da\u30fc\u30b8"}
        </h1>
        <ProfileCard profile={data.profile} />
      </div>

      {isAdmin ? (
        <section>
          <h2 className="mb-3 text-base font-semibold text-slate-900">
            {"\u7ba1\u7406\u8005\u30e1\u30cb\u30e5\u30fc"}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/admin/approvals"
              className="group rounded-xl border border-blue-200 bg-blue-50 p-5 transition hover:border-blue-400 hover:bg-blue-100"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                <ClipboardCheck className="h-5 w-5" />
              </div>

              <p className="font-semibold text-slate-900">
                {"\u5c55\u793a\u627f\u8a8d\u753b\u9762"}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {
                  "\u30b9\u30bf\u30fc\u30c8\u30a2\u30c3\u30d7\u304b\u3089\u5c4a\u3044\u305f\u5c55\u793a\u7533\u8acb\u3092\u78ba\u8a8d\u3057\u3001\u627f\u8a8d\u307e\u305f\u306f\u5374\u4e0b\u3057\u307e\u3059\u3002"
                }
              </p>
            </Link>

            <Link
              href="/admin/exhibitions"
              className="group rounded-xl border border-emerald-200 bg-emerald-50 p-5 transition hover:border-emerald-400 hover:bg-emerald-100"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm">
                <CalendarDays className="h-5 w-5" />
              </div>

              <p className="font-semibold text-slate-900">
                {"\u5c55\u793a\u7ba1\u7406\u753b\u9762"}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {
                  "\u627f\u8a8d\u6e08\u307f\u306e\u5c55\u793a\u3092\u30ab\u30ec\u30f3\u30c0\u30fc\u3084\u4e00\u89a7\u3067\u78ba\u8a8d\u3057\u3001\u5c55\u793a\u4e2d\u30fb\u7d42\u4e86\u306a\u3069\u306e\u72b6\u614b\u3092\u7ba1\u7406\u3057\u307e\u3059\u3002"
                }
              </p>
            </Link>

            <Link
              href="/admin/dashboard"
              className="group rounded-xl border border-violet-200 bg-violet-50 p-5 transition hover:border-violet-400 hover:bg-violet-100"
            >
              <div
              className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl shadow-md"
              style={{ backgroundColor: "#6d28d9" }}
            >
              <BarChart3
                className="h-7 w-7"
                color="#ffffff"
                strokeWidth={2.5}
              />
            </div>

              <p className="font-semibold text-slate-900">
                {"\u30a2\u30f3\u30b1\u30fc\u30c8\u30c0\u30c3\u30b7\u30e5\u30dc\u30fc\u30c9"}
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {"\u30c6\u30b9\u30c8\u30b9\u30bf\u30fc\u30c8\u30a2\u30c3\u30d7\u682a\u5f0f\u4f1a\u793e\u306b\u7d10\u3065\u304f\u30a2\u30f3\u30b1\u30fc\u30c8\u56de\u7b54\u3092\u4e00\u5143\u7684\u306b\u78ba\u8a8d\u3057\u307e\u3059\u3002"}
              </p>
            </Link>
          </div>
        </section>
      ) : (
        <>
          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">
              {"\u5c55\u793a\u7533\u8acb\u5c65\u6b74"}
            </h2>
            <ApplicationHistory items={data.applications} />
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">
              {"\u30ec\u30dd\u30fc\u30c8\u5c65\u6b74"}
            </h2>
            <ReportHistory items={data.reports} />
          </section>
        </>
      )}
    </main>
  );
}
