"use client";

import { Search, FileEdit, BarChart3 } from "lucide-react";

export default function FlowSection() {
  return (
    <section className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900">
        ご利用の流れ
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

        {/* STEP1 */}
        <div className="space-y-3">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0e2147] text-white">
            <Search className="h-5 w-5" />
          </div>

          <p className="text-xs font-bold tracking-wider text-gray-400">
            STEP1
          </p>

          <h3 className="text-lg font-bold text-gray-900">
            ショールーム検索
          </h3>

          <p className="text-sm leading-relaxed text-gray-500">
            条件を指定して、全国のショールームから最適な展示場所を検索できます。
          </p>
        </div>

        {/* STEP2 */}
        <div className="space-y-3">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0e2147] text-white">
            <FileEdit className="h-5 w-5" />
          </div>

          <p className="text-xs font-bold tracking-wider text-gray-400">
            STEP2
          </p>

          <h3 className="text-lg font-bold text-gray-900">
            展示申請
          </h3>

          <p className="text-sm leading-relaxed text-gray-500">
            展示したい期間・カテゴリを選択して申請するだけ。最短即日で受付できます。
          </p>
        </div>

        {/* STEP3 */}
        <div className="space-y-3">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0e2147] text-white">
            <BarChart3 className="h-5 w-5" />
          </div>

          <p className="text-xs font-bold tracking-wider text-gray-400">
            STEP3
          </p>

          <h3 className="text-lg font-bold text-gray-900">
            フィードバック収集
          </h3>

          <p className="text-sm leading-relaxed text-gray-500">
            来場者アンケートやダッシュボードで、展示効果や分析結果を確認できます。
          </p>
        </div>

      </div>
    </section>
  );
}