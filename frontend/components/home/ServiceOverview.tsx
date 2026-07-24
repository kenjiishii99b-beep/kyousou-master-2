import { Search, FileEdit, BarChart3 } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "ショールームを探す",
    description: "条件を指定して、全国のショールームから最適な展示場所を検索できます。",
  },
  {
    icon: FileEdit,
    title: "展示申請",
    description: "展示したい期間・カテゴリを選んで申請するだけ。最短即日で受付完了します。",
  },
  {
    icon: BarChart3,
    title: "フィードバック収集",
    description: "来場者アンケートやダッシュボードで、来場者の反応をリアルタイムに確認できます。",
  },
];

export function ServiceOverview() {
  return (
    <section className="border-t border-slate-100 py-10">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">ご利用の流れ</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.title} className="space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white">
              <step.icon className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium text-slate-400">STEP {index + 1}</p>
            <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
            <p className="text-xs leading-relaxed text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
