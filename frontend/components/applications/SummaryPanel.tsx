import { FACILITY_OPTIONS } from "@/types/showroom";
import { ApplicationFormData } from "@/types/application";

const LABEL_MAP = Object.fromEntries(FACILITY_OPTIONS.map((f) => [f.code, f.label]));

export function SummaryPanel({ form }: { form: ApplicationFormData }) {
  return (
    <aside className="h-fit rounded-lg border border-slate-200 p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-900">申請内容サマリー</h2>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs text-slate-400">ショールーム</dt>
          <dd className="text-slate-700">{form.showroomName || "未選択"}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400">展示期間</dt>
          <dd className="text-slate-700">
            {form.periodFrom && form.periodTo
              ? `${form.periodFrom}〜${form.periodTo}`
              : "未選択"}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400">展示カテゴリ</dt>
          <dd className="text-slate-700">
            {form.categories.length > 0
              ? form.categories.map((c) => LABEL_MAP[c]).join("、")
              : "未選択"}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
