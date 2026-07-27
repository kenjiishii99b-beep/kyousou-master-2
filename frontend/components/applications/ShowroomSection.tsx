"use client";

import {
  Bath,
  ChefHat,
  DoorOpen,
  Grid2X2,
  Palette,
  SquareStack,
  Toilet,
  Waves,
} from "lucide-react";

const categories = [
  { id: "kitchen", label: "キッチン", icon: ChefHat },
  { id: "bath", label: "バス", icon: Bath },
  { id: "toilet", label: "トイレ", icon: Toilet },
  { id: "wash", label: "洗面", icon: Waves },
  { id: "tile", label: "タイル・建材", icon: Grid2X2 },
  { id: "door", label: "窓・ドア", icon: DoorOpen },
  { id: "exterior", label: "外装・エクステリア", icon: Palette },
  { id: "other", label: "その他", icon: SquareStack },
];

export default function ShowroomSection() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="text-xl font-bold text-gray-900">
        ショールーム・期間の選択
      </h2>

      <div className="mt-8 space-y-6">

        {/* ショールーム */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            ショールーム
          </label>

          <select className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600">
            <option>選択してください</option>
            <option>札幌ショールーム</option>
            <option>仙台ショールーム</option>
            <option>東京ショールーム</option>
            <option>大阪ショールーム</option>
          </select>
        </div>

        {/* 展示期間 */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            希望展示期間
          </label>

          <div className="flex items-center gap-3">
            <input
              type="date"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
            />

            <span className="text-gray-500">→</span>

            <input
              type="date"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            ※期間は最大30日間まで選択可能です。
          </p>
        </div>

        {/* 展示カテゴリ */}
        <div>
          <label className="mb-4 block text-sm font-semibold">
            展示カテゴリ（複数選択可）
          </label>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-6
                    transition
                    hover:border-blue-600
                    hover:bg-blue-50
                  "
                >
                  <div className="flex flex-col items-center gap-3">

                    <Icon className="h-7 w-7 text-gray-500" />

                    <span className="text-sm font-medium">
                      {item.label}
                    </span>

                  </div>
                </button>
              );
            })}

          </div>
        </div>

      </div>

    </section>
  );
}