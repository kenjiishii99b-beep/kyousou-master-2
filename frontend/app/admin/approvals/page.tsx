"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import {
  fetchExhibitions,
  updateExhibitionStatus,
} from "@/lib/api/exhibitions";
import { ExhibitionItem } from "@/types/exhibition";

export default function AdminApprovalsPage() {
  const [items, setItems] = useState<ExhibitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchExhibitions();
      setItems(
        response.items.filter((item) => item.status === "pending"),
      );
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "\u5c55\u793a\u7533\u8acb\u306e\u53d6\u5f97\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleApprove = async (item: ExhibitionItem) => {
    const confirmed = window.confirm(
      `${item.companyName}\u306e\u5c55\u793a\u7533\u8acb\u3092\u627f\u8a8d\u3057\u307e\u3059\u304b\uff1f`,
    );

    if (!confirmed) return;

    setProcessingId(item.id);
    setError(null);

    try {
      await updateExhibitionStatus(item.id, "approved");
      await load();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "\u627f\u8a8d\u51e6\u7406\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (item: ExhibitionItem) => {
    const reason = window.prompt(
      "\u5374\u4e0b\u7406\u7531\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    );

    if (reason === null) return;

    if (!reason.trim()) {
      setError("\u5374\u4e0b\u7406\u7531\u306f\u5fc5\u9808\u3067\u3059\u3002");
      return;
    }

    setProcessingId(item.id);
    setError(null);

    try {
      await updateExhibitionStatus(
        item.id,
        "rejected",
        reason.trim(),
      );
      await load();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "\u5374\u4e0b\u51e6\u7406\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      );
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
          <Clock3 className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {"\u5c55\u793a\u627f\u8a8d\u753b\u9762"}
          </h1>
          <p className="text-sm text-slate-500">
            {
              "\u30b9\u30bf\u30fc\u30c8\u30a2\u30c3\u30d7\u304b\u3089\u5c4a\u3044\u305f\u5c55\u793a\u7533\u8acb\u3092\u78ba\u8a8d\u3057\u307e\u3059\u3002"
            }
          </p>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-9 w-9 text-emerald-500" />
          <p className="font-medium text-slate-700">
            {"\u627f\u8a8d\u5f85\u3061\u306e\u5c55\u793a\u7533\u8acb\u306f\u3042\u308a\u307e\u305b\u3093\u3002"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div>
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                      {"\u7533\u8acb\u4e2d"}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    {item.companyName}
                    <span className="ml-2 text-base font-medium text-slate-600">
                      ｜{item.productName || "製品名未登録"}
                    </span>
                  </h2>

                  <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-slate-500">
                        {"\u30b7\u30e7\u30fc\u30eb\u30fc\u30e0"}
                      </dt>
                      <dd className="font-medium text-slate-800">
                        {item.showroomName}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-slate-500">
                        {"\u5c55\u793a\u671f\u9593"}
                      </dt>
                      <dd className="font-medium text-slate-800">
                        {item.periodFrom} {"\uff5e"} {item.periodTo}
                      </dd>
                    </div>

                    <div className="sm:col-span-2">
                      <dt className="text-slate-500">
                        {"\u30ab\u30c6\u30b4\u30ea"}
                      </dt>
                      <dd className="font-medium text-slate-800">
                        {item.categories.join(", ") || "-"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex shrink-0 gap-3">
                  <button
                    type="button"
                    onClick={() => handleReject(item)}
                    disabled={processingId === item.id}
                    className="flex items-center gap-2 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4" />
                    {"\u5374\u4e0b\u3059\u308b"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(item)}
                    disabled={processingId === item.id}
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {processingId === item.id
                      ? "\u51e6\u7406\u4e2d..."
                      : "\u627f\u8a8d\u3059\u308b"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

