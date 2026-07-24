"use client";

import { useEffect, useState } from "react";
import { AdminCalendar } from "@/components/admin/AdminCalendar";
import { ExhibitionTable } from "@/components/admin/ExhibitionTable";
import { UpcomingList } from "@/components/admin/UpcomingList";
import { StatusModal } from "@/components/admin/StatusModal";
import { fetchExhibitions, updateExhibitionStatus } from "@/lib/api/exhibitions";
import { ExhibitionItem, ExhibitionStatus, STATUS_LABEL } from "@/types/exhibition";

type Tab = "calendar" | "list" | "byStatus";

const TABS: { key: Tab; label: string }[] = [
  { key: "calendar", label: "カレンダー" },
  { key: "list", label: "一覧" },
  { key: "byStatus", label: "ステータス別" },
];

const STATUS_FILTERS: ExhibitionStatus[] = ["pending", "exhibiting", "finished", "cancelled"];

export default function AdminExhibitionsPage() {
  const [tab, setTab] = useState<Tab>("calendar");
  const [items, setItems] = useState<ExhibitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selected, setSelected] = useState<ExhibitionItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<ExhibitionStatus>("pending");

  const load = () => {
    setLoading(true);
    fetchExhibitions()
      .then((res) => setItems(res.items))
      .catch((e) => setError(e instanceof Error ? e.message : "取得に失敗しました。"))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleUpdate = async (status: ExhibitionStatus, reason?: string) => {
    if (!selected) return;
    await updateExhibitionStatus(selected.id, status, reason);
    load();
  };

  const upcoming = items.filter((i) => i.status === "pending" || i.status === "exhibiting");

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-xl font-bold text-slate-900">展示管理</h1>

      <div className="mb-4 flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`border-b-2 px-3 py-2 text-sm font-medium ${
              tab === t.key
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {loading ? (
        <div className="h-64 animate-pulse rounded-lg bg-slate-100" />
      ) : (
        <>
          {tab === "calendar" && (
            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <AdminCalendar
                exhibitions={items}
                currentMonth={currentMonth}
                onMonthChange={setCurrentMonth}
                onSelect={setSelected}
              />
              <UpcomingList items={upcoming} onSelect={setSelected} />
            </div>
          )}

          {tab === "list" && <ExhibitionTable items={items} onSelect={setSelected} />}

          {tab === "byStatus" && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      statusFilter === s
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                ))}
              </div>
              <ExhibitionTable
                items={items.filter((i) => i.status === statusFilter)}
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
