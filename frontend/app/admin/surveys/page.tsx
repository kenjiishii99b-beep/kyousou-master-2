"use client";

import { useEffect, useMemo, useState } from "react";
import {
  fetchSurveyResponses,
  SurveyResponseItem,
} from "@/lib/api/adminSurveys";

export default function AdminSurveyResponsesPage() {
  const [items, setItems] = useState<SurveyResponseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadResponses = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchSurveyResponses();
      setItems(data.items);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "アンケート回答の取得に失敗しました。",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResponses();
  }, []);

  const averageRating = useMemo(() => {
    if (items.length === 0) return 0;

    const total = items.reduce(
      (sum, item) => sum + Number(item.rating ?? 0),
      0,
    );

    return total / items.length;
  }, [items]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            アンケート回答一覧
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            保存されたアンケート回答を確認できます。
          </p>
        </div>

        <button
          type="button"
          onClick={loadResponses}
          disabled={loading}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {loading ? "更新中..." : "最新情報に更新"}
        </button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">回答件数</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {items.length}
            <span className="ml-1 text-base font-normal">件</span>
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">平均満足度</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">
            {averageRating.toFixed(1)}
            <span className="ml-1 text-base font-normal">/ 5</span>
          </p>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading && (
        <div className="h-40 animate-pulse rounded-lg bg-slate-100" />
      )}

      {!loading && !error && items.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 py-16 text-center">
          <p className="text-sm text-slate-500">
            アンケート回答はまだありません。
          </p>
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-slate-600">
                  回答日時
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-slate-600">
                  ショールーム
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-slate-600">
                  展示内容
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-center font-medium text-slate-600">
                  満足度
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-slate-600">
                  来場目的
                </th>
                <th className="min-w-72 px-4 py-3 text-left font-medium text-slate-600">
                  コメント
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-medium text-slate-600">
                  AI分析
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {items.map((item) => (
                <tr key={item.answer_id} className="hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {new Date(item.answered_at).toLocaleString("ja-JP")}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {item.showroom_name ?? "未設定"}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {item.exhibition_title ?? item.survey_title}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-center font-semibold text-slate-900">
                    {item.rating} / 5
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 text-slate-700">
                    {item.visit_purpose ?? "未回答"}
                  </td>

                  <td className="px-4 py-3 text-slate-700">
                    {item.comment ?? "コメントなし"}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {item.ai_analysis_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}