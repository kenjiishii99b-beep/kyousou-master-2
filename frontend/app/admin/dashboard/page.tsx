"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AiAnalysisData,
  DashboardData,
  fetchDashboard,
  fetchLatestAiAnalysis,
  runAiAnalysis,
} from "@/lib/api/dashboard";

const APPLICATION_ID = 1;

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [aiAnalysis, setAiAnalysis] =
    useState<AiAnalysisData | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [dashboardResult, latestAnalysis] =
        await Promise.all([
          fetchDashboard(),
          fetchLatestAiAnalysis(APPLICATION_ID),
        ]);

      setData(dashboardResult);
      setAiAnalysis(latestAnalysis);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "ダッシュボード情報の取得に失敗しました。",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const handleRunAiAnalysis = async () => {
    setAiLoading(true);
    setAiError(null);

    try {
      const result = await runAiAnalysis(APPLICATION_ID);
      setAiAnalysis(result);
    } catch (e) {
      setAiError(
        e instanceof Error
          ? e.message
          : "AI分析の実行に失敗しました。",
      );
    } finally {
      setAiLoading(false);
    }
  };

  const maxRatingCount = useMemo(() => {
    if (!data || data.rating_breakdown.length === 0) {
      return 1;
    }

    return Math.max(
      ...data.rating_breakdown.map((item) => item.count),
      1,
    );
  }, [data]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            アンケートダッシュボード
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            保存されたアンケート回答を集計して表示します。
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/surveys"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            回答一覧を見る
          </Link>

          <button
            type="button"
            onClick={() => void loadDashboard()}
            disabled={loading}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "更新中..." : "最新情報に更新"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading && (
        <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
      )}

      {!loading && data && (
        <div className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              label="回答件数"
              value={`${data.total_responses}件`}
            />
            <KpiCard
              label="平均満足度"
              value={`${data.average_rating.toFixed(1)} / 5`}
            />
            <KpiCard
              label="高評価率"
              value={`${data.positive_rate.toFixed(1)}%`}
              description="満足度4・5の割合"
            />
            <KpiCard
              label="コメント回答率"
              value={`${data.comment_rate.toFixed(1)}%`}
            />
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="mb-5 font-semibold text-slate-900">
                満足度分布
              </h2>

              <div className="space-y-4">
                {data.rating_breakdown
                  .slice()
                  .reverse()
                  .map((item) => {
                    const width =
                      (item.count / maxRatingCount) * 100;

                    return (
                      <div
                        key={item.rating}
                        className="flex items-center gap-3"
                      >
                        <span className="w-10 shrink-0 text-sm text-slate-600">
                          ★{item.rating}
                        </span>

                        <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-slate-700"
                            style={{ width: `${width}%` }}
                          />
                        </div>

                        <span className="w-12 shrink-0 text-right text-sm text-slate-600">
                          {item.count}件
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="mb-5 font-semibold text-slate-900">
                来場目的
              </h2>

              {data.purpose_breakdown.length === 0 ? (
                <p className="text-sm text-slate-500">
                  来場目的の回答がありません。
                </p>
              ) : (
                <div className="space-y-4">
                  {data.purpose_breakdown.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3"
                    >
                      <span className="w-20 shrink-0 text-sm text-slate-600">
                        {item.label}
                      </span>

                      <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-slate-700"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>

                      <span className="w-28 shrink-0 text-right text-sm text-slate-600">
                        {item.count}件・
                        {item.percentage.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  AI分析
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  自由記述をもとに、全体要約・キーワード・改善点を生成します。
                </p>
              </div>

              <button
                type="button"
                onClick={() => void handleRunAiAnalysis()}
                disabled={
                  aiLoading || data.total_responses === 0
                }
                className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {aiLoading ? "AI分析中..." : "AI分析を実行"}
              </button>
            </div>

            {aiError && (
              <p className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                {aiError}
              </p>
            )}

            {!aiAnalysis && !aiLoading && (
              <div className="mt-4 rounded-md bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                「AI分析を実行」を押すと、分析結果がここに表示されます。
              </div>
            )}

            {aiLoading && (
              <div className="mt-4 animate-pulse rounded-md bg-slate-100 px-4 py-8 text-center text-sm text-slate-500">
                アンケート回答を分析しています...
              </div>
            )}

            {aiAnalysis && !aiLoading && (
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    全体要約
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap rounded-md bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                    {aiAnalysis.summary ||
                      "要約は生成されませんでした。"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    キーワード
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {aiAnalysis.keywords.length > 0 ? (
                      aiAnalysis.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full bg-violet-50 px-3 py-1 text-sm text-violet-700"
                        >
                          {keyword}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        キーワードはありません。
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    改善ポイント
                  </h3>

                  {aiAnalysis.improvement_points.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {aiAnalysis.improvement_points.map(
                        (point, index) => (
                          <li
                            key={`${index}-${point}`}
                            className="flex gap-3 rounded-md bg-amber-50 px-4 py-3 text-sm leading-6 text-slate-700"
                          >
                            <span className="font-semibold text-amber-700">
                              {index + 1}.
                            </span>
                            <span>{point}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-slate-500">
                      改善ポイントはありません。
                    </p>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

function KpiCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>

      {description && (
        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

