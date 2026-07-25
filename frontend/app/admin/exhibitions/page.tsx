"use client";

import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import { AdminCalendar } from "@/components/admin/AdminCalendar";
import { ExhibitionTable } from "@/components/admin/ExhibitionTable";
import { UpcomingList } from "@/components/admin/UpcomingList";
import { StatusModal } from "@/components/admin/StatusModal";
import {
  deleteAllExhibitions,
  fetchExhibitions,
  updateExhibitionStatus,
} from "@/lib/api/exhibitions";
import {
  ExhibitionItem,
  ExhibitionStatus,
  STATUS_LABEL,
} from "@/types/exhibition";

type Tab = "calendar" | "list" | "byStatus";

const TABS: { key: Tab; label: string }[] = [
  { key: "calendar", label: "\u30ab\u30ec\u30f3\u30c0\u30fc" },
  { key: "list", label: "\u4e00\u89a7" },
  {
    key: "byStatus",
    label: "\u30b9\u30c6\u30fc\u30bf\u30b9\u5225",
  },
];

const STATUS_FILTERS: ExhibitionStatus[] = [
  "pending",
  "approved",
  "rejected",
  "exhibiting",
  "finished",
  "cancelled",
];

export default function AdminExhibitionsPage() {
  const [tab, setTab] = useState<Tab>("calendar");
  const [items, setItems] = useState<ExhibitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] =
    useState<string | null>(null);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selected, setSelected] =
    useState<ExhibitionItem | null>(null);

  const [statusFilter, setStatusFilter] =
    useState<ExhibitionStatus>("pending");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchExhibitions();
      setItems(result.items);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "\u5c55\u793a\u4e00\u89a7\u306e\u53d6\u5f97\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleUpdate = async (
    status: ExhibitionStatus,
    reason?: string,
  ) => {
    if (!selected) {
      return;
    }

    await updateExhibitionStatus(
      selected.id,
      status,
      reason,
    );

    setSelected(null);
    await load();
  };

  const handleDeleteAll = async () => {
    const confirmation = window.prompt(
      "\u7533\u8acb\u4e2d\u304b\u3089\u4e2d\u6b62\u307e\u3067\u3001\u3059\u3079\u3066\u306e\u5c55\u793a\u3068\u95a2\u9023\u30c7\u30fc\u30bf\u3092\u524a\u9664\u3057\u307e\u3059\u3002\n\n\u3053\u306e\u64cd\u4f5c\u306f\u5143\u306b\u623b\u305b\u307e\u305b\u3093\u3002\n\u5b9f\u884c\u3059\u308b\u5834\u5408\u306f\u300c\u3059\u3079\u3066\u524a\u9664\u300d\u3068\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
    );

    if (confirmation === null) {
      return;
    }

    if (
      confirmation !==
      "\u3059\u3079\u3066\u524a\u9664"
    ) {
      setError(
        "\u78ba\u8a8d\u6587\u5b57\u304c\u6b63\u3057\u304f\u3042\u308a\u307e\u305b\u3093\u3002\u524a\u9664\u306f\u5b9f\u884c\u3055\u308c\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
      );
      return;
    }

    setDeleting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await deleteAllExhibitions();

      setSelected(null);
      setItems([]);

      setSuccessMessage(
        `${result.deleted_exhibitions}\u4ef6\u306e\u5c55\u793a\u3092\u524a\u9664\u3057\u307e\u3057\u305f\u3002`,
      );

      await load();
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "\u5c55\u793a\u30c7\u30fc\u30bf\u306e\u524a\u9664\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      );
    } finally {
      setDeleting(false);
    }
  };

  const upcoming = items.filter(
    (item) =>
      item.status === "approved" ||
      item.status === "exhibiting",
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-slate-900">
          {"\u5c55\u793a\u7ba1\u7406"}
        </h1>
      </div>

      <div className="mb-4 flex gap-1 border-b border-slate-200">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`border-b-2 px-3 py-2 text-sm font-medium ${
              tab === item.key
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {successMessage && (
        <p className="mb-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {successMessage}
        </p>
      )}

      {loading ? (
        <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
      ) : (
        <>
          {tab === "calendar" && (
            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <AdminCalendar
                exhibitions={items.filter((item) => item.status !== "cancelled")}
                currentMonth={currentMonth}
                onMonthChange={setCurrentMonth}
                onSelect={setSelected}
              />

              <UpcomingList
                items={upcoming}
                onSelect={setSelected}
              />
            </div>
          )}

          {tab === "list" && (
            <ExhibitionTable
              items={items}
              onSelect={setSelected}
            />
          )}

          {tab === "byStatus" && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      setStatusFilter(status)
                    }
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      statusFilter === status
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {STATUS_LABEL[status]}
                  </button>
                ))}
              </div>

              <ExhibitionTable
                items={items.filter(
                  (item) =>
                    item.status === statusFilter,
                )}
                onSelect={setSelected}
              />
            </div>
          )}
        </>
      )}

      {selected && (
        <StatusModal
          item={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
}
