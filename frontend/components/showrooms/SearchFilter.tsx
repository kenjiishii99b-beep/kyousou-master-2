"use client";

import {
  CookingPot,
  Bath,
  Toilet,
  ShowerHead,
  Building2,
  DoorOpen,
  Trees,
  Layers,
} from "lucide-react";

import CategoryButton from "./CategoryButton";
import { PREFECTURES } from "@/lib/prefectures";

import {
  SearchFilters,
  FacilityCode,
} from "@/types/showroom";

type SearchFilterProps = {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
};

const categories: {
  code: FacilityCode;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  {
    code: "kitchen",
    label: "キッチン",
    icon: CookingPot,
  },
  {
    code: "bath",
    label: "バス",
    icon: Bath,
  },
  {
    code: "toilet",
    label: "トイレ",
    icon: Toilet,
  },
  {
    code: "washroom",
    label: "洗面",
    icon: ShowerHead,
  },
  {
    code: "tile_material",
    label: "タイル・建材",
    icon: Building2,
  },
  {
    code: "window_door",
    label: "窓・ドア",
    icon: DoorOpen,
  },
  {
    code: "exterior",
    label: "外装・エクステリア",
    icon: Trees,
  },
  {
    code: "other",
    label: "その他",
    icon: Layers,
  },
];

export default function SearchFilter({
  filters,
  onFiltersChange,
  onSearch,
}: SearchFilterProps) {
  const toggleCategory = (category: FacilityCode) => {
    const exists = filters.categories.includes(category);

    const categories = exists
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFiltersChange({
      ...filters,
      categories,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      prefecture: "",
      area: "",
      categories: [],
      visitorAttribute: "",
      page: 1,
      limit: 10,
    });
  };

  const handlePrefectureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      prefecture: e.target.value,
      page: 1,
    });
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      area: e.target.value,
      page: 1,
    });
  };

  const handleVisitorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      visitorAttribute: e.target.value,
      page: 1,
    });
  };

  const handleSearch = () => {
    onSearch();
  };

  // ↓↓↓ Part2 はここから return (...) が始まります
  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">検索条件</h2>

        <button
          onClick={resetFilters}
          className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
        >
          リセット
        </button>
      </div>

      <div className="space-y-6">
        {/* 都道府県 */}
        <div>
          <label className="mb-2 block text-sm font-medium">都道府県</label>

          <select
            value={filters.prefecture}
            onChange={handlePrefectureChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm"
          >
            <option value="">選択してください</option>

            {PREFECTURES.map((prefecture) => (
              <option key={prefecture} value={prefecture}>
                {prefecture}
              </option>
            ))}
          </select>
        </div>

        {/* 地域 */}
        <div>
          <label className="mb-2 block text-sm font-medium">地域</label>

          <select
            value={filters.area}
            onChange={handleAreaChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm"
          >
            <option value="">選択してください</option>
            <option value="北海道・東北">北海道・東北</option>
            <option value="関東">関東</option>
            <option value="中部">中部</option>
            <option value="近畿">近畿</option>
            <option value="中国">中国</option>
            <option value="四国">四国</option>
            <option value="九州・沖縄">九州・沖縄</option>
          </select>
        </div>

        {/* 展示カテゴリ */}
        <div>
          <label className="mb-3 block text-sm font-medium">
            展示カテゴリ
            <span className="ml-2 text-xs text-gray-500">（複数選択可）</span>
          </label>

          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <CategoryButton
                key={category.code}
                icon={category.icon}
                label={category.label}
                selected={filters.categories.includes(category.code)}
                onClick={() => toggleCategory(category.code)}
              />
            ))}
          </div>
        </div>

        {/* 来場者属性 */}
        <div>
          <label className="mb-2 block text-sm font-medium">来場者属性</label>

          <select
            value={filters.visitorAttribute}
            onChange={handleVisitorChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm"
          >
            <option value="">選択してください</option>

            <option value="住宅購入検討者">住宅購入検討者</option>

            <option value="リフォーム検討者">リフォーム検討者</option>

            <option value="法人">法人</option>
          </select>
        </div>

        {/* 検索 */}
        <button
          onClick={handleSearch}
          className="w-full rounded-lg bg-[#0e2147] py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          この条件で検索する
        </button>

        {/* 保存（今後実装） */}
        <button className="w-full rounded-lg border border-blue-600 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50">
          条件を保存する
        </button>
      </div>
    </aside>
  );
}