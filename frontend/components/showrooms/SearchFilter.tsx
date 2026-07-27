"use client";

import { FACILITY_OPTIONS, FacilityCode, SearchFilters } from "@/types/showroom";
import {
  UtensilsCrossed,
  Bath,
  ShowerHead,
  Droplets,
  LayoutGrid,
  DoorOpen,
  Building2,
  MoreHorizontal,
} from "lucide-react";

const ICONS: Record<FacilityCode, React.ComponentType<{ className?: string }>> = {
  kitchen: UtensilsCrossed,
  bath: Bath,
  toilet: ShowerHead,
  washroom: Droplets,
  tile_material: LayoutGrid,
  window_door: DoorOpen,
  exterior: Building2,
  other: MoreHorizontal,
};

const PREFECTURES = ["北海道", "東京都", "愛知県", "大阪府", "福岡県"]; // TODO: マスタAPIに置き換え
const AREAS = ["北海道・東北", "関東", "中部", "近畿", "中国・四国", "九州・沖縄"];
const VISITOR_ATTRIBUTES = ["ファミリー層", "単身層", "シニア層", "リフォーム検討層"];

interface SearchFilterProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  onReset: () => void;
  onSaveCondition: () => void;
}

export function SearchFilter({
  filters,
  onChange,
  onSearch,
  onReset,
  onSaveCondition,
}: SearchFilterProps) {
  const toggleCategory = (code: FacilityCode) => {
    const next = filters.categories.includes(code)
      ? filters.categories.filter((c) => c !== code)
      : [...filters.categories, code];
    onChange({ ...filters, categories: next });
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900">検索条件</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-slate-500 hover:text-slate-700"
        >
          リセット
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">都道府県</label>
        <select
          value={filters.prefecture}
          onChange={(e) => onChange({ ...filters, prefecture: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">選択してください</option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">地域</label>
        <select
          value={filters.area}
          onChange={(e) => onChange({ ...filters, area: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">選択してください</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          展示カテゴリ（複数選択可）
        </label>
        <div className="grid grid-cols-4 gap-2">
          {FACILITY_OPTIONS.map(({ code, label }) => {
            const Icon = ICONS[code];
            const active = filters.categories.includes(code);
            return (
              <button
                key={code}
                type="button"
                onClick={() => toggleCategory(code)}
                aria-pressed={active}
                className={`flex flex-col items-center gap-1 rounded-md border px-2 py-3 text-[11px] transition-colors ${
                  active
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-center leading-tight">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">来場者属性</label>
        <select
          value={filters.visitorAttribute}
          onChange={(e) =>
            onChange({ ...filters, visitorAttribute: e.target.value })
          }
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">任意選択してください</option>
          {VISITOR_ATTRIBUTES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={onSearch}
          className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          この条件で検索する
        </button>
        <button
          type="button"
          onClick={onSaveCondition}
          className="w-full rounded-md border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          条件を保存する
        </button>
      </div>
    </aside>
  );
}
