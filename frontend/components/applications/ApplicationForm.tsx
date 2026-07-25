"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
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
import { DEFAULT_FILTERS, FACILITY_OPTIONS, FacilityCode, Showroom } from "@/types/showroom";
import { ApplicationFormData, EMPTY_APPLICATION_FORM } from "@/types/application";
import { submitApplication } from "@/lib/api/applications";
import { fetchShowrooms } from "@/lib/api/showrooms";
import { SummaryPanel } from "./SummaryPanel";

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS: { step: Step; label: string }[] = [
  { step: 1, label: "申請情報入力" },
  { step: 2, label: "展示内容入力" },
  { step: 3, label: "確認" },
  { step: 4, label: "申請完了" },
];


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

export function ApplicationForm({ initialShowroomId }: { initialShowroomId?: string }) {
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [showroomLoading, setShowroomLoading] = useState(true);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<ApplicationFormData>({
    ...EMPTY_APPLICATION_FORM,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchShowrooms({
      ...DEFAULT_FILTERS,
      page: 1,
      limit: 100,
    })
      .then(({ items }) => {
        if (!active) return;

        setShowrooms(items);

        if (initialShowroomId) {
          const initialShowroom = items.find(
            (showroom) => String(showroom.id) === initialShowroomId,
          );

          if (initialShowroom) {
            setForm((prev) => ({
              ...prev,
              showroomId: String(initialShowroom.id),
              showroomName: initialShowroom.name,
            }));
          }
        }
      })
      .catch(() => {
        if (active) {
          setError("???????????????????");
        }
      })
      .finally(() => {
        if (active) {
          setShowroomLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [initialShowroomId]);

  const update = <K extends keyof ApplicationFormData>(
    field: K,
    value: ApplicationFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (code: FacilityCode) => {
    const next = form.categories.includes(code)
      ? form.categories.filter((c) => c !== code)
      : [...form.categories, code];
    update("categories", next);
  };

  const handleShowroomChange = (id: string) => {
    const showroom = showrooms.find((s) => String(s.id) === id);
    update("showroomId", id);
    update("showroomName", showroom?.name ?? "");
  };

  const validateStep1 = () => {
    if (!form.showroomId) return "ショールームを選択してください。";
    if (!form.periodFrom || !form.periodTo) return "希望展示期間を入力してください。";
    if (form.periodFrom > form.periodTo) return "期間の指定が正しくありません。";
    const days =
      (new Date(form.periodTo).getTime() - new Date(form.periodFrom).getTime()) /
      (1000 * 60 * 60 * 24);
    if (days > 30) return "期間は最大30日間まで選択可能です。";
    if (form.categories.length === 0) return "展示カテゴリを1つ以上選択してください。";
    return null;
  };

  const validateStep2 = () => {
    if (!form.exhibitTitle || !form.exhibitDescription) {
      return "展示内容を入力してください。";
    }
    return null;
  };

  const goNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep(2);
  };

  const goNextFromStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep2();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep(3);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await submitApplication(form);
      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "申請の送信に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        {STEP_LABELS.map((s, index) => (
          <div key={s.step} className="flex items-center gap-2">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-medium ${
                step >= s.step ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {s.step}
            </span>
            <span className={step === s.step ? "font-medium text-slate-900" : ""}>
              {s.label}
            </span>
            {index < STEP_LABELS.length - 1 && <span className="text-slate-300">→</span>}
          </div>
        ))}
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <div className={step < 3 ? "grid gap-6 lg:grid-cols-[1fr_280px]" : ""}>
        {step === 1 && (
          <form onSubmit={goNextFromStep1} className="space-y-6">
            <h1 className="text-lg font-bold text-slate-900">展示申請</h1>

            <div className="space-y-4 rounded-lg border border-slate-200 p-4">
              <h2 className="text-sm font-semibold text-slate-900">
                ショールーム・期間の選択
              </h2>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">ショールーム</label>
                <select
                  value={form.showroomId}
                  disabled={showroomLoading}
                  onChange={(e) => handleShowroomChange(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                >
                  <option value="">選択してください</option>
                  {showrooms.map((s) => (
                    <option key={s.id} value={String(s.id)}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">希望展示期間</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={form.periodFrom}
                    onChange={(e) => update("periodFrom", e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                  <span className="text-slate-400">→</span>
                  <input
                    type="date"
                    value={form.periodTo}
                    onChange={(e) => update("periodTo", e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <p className="text-xs text-slate-400">※期間は最大30日間まで選択可能です。</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  展示カテゴリ（複数選択可）
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {FACILITY_OPTIONS.map(({ code, label }) => {
                    const Icon = ICONS[code];
                    const active = form.categories.includes(code);
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => toggleCategory(code)}
                        className={`flex flex-col items-center gap-1 rounded-md border px-2 py-3 text-[11px] ${
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
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800 sm:w-auto sm:px-8"
            >
              次へ進む
            </button>
          </form>
        )}

        {step === 1 && <SummaryPanel form={form} />}

        {step === 2 && (
          <form onSubmit={goNextFromStep2} className="space-y-6">
            <h1 className="text-lg font-bold text-slate-900">展示内容入力</h1>

            <div className="space-y-4 rounded-lg border border-slate-200 p-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">展示タイトル</label>
                <input
                  value={form.exhibitTitle}
                  onChange={(e) => update("exhibitTitle", e.target.value)}
                  placeholder="例：スマート収納システム"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">展示内容の説明</label>
                <textarea
                  value={form.exhibitDescription}
                  onChange={(e) => update("exhibitDescription", e.target.value)}
                  placeholder="展示する商品・サービスの概要、来場者に伝えたいポイントなどを入力してください。"
                  rows={6}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-md border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                戻る
              </button>
              <button
                type="submit"
                className="rounded-md bg-slate-900 px-8 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                次へ進む
              </button>
            </div>
          </form>
        )}

        {step === 2 && <SummaryPanel form={form} />}
      </div>

      {step === 3 && (
        <div className="space-y-6">
          <h1 className="text-lg font-bold text-slate-900">申請内容の確認</h1>

          <dl className="space-y-3 rounded-lg border border-slate-200 p-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">ショールーム</dt>
              <dd className="text-slate-900">{form.showroomName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">展示期間</dt>
              <dd className="text-slate-900">
                {form.periodFrom}〜{form.periodTo}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">展示カテゴリ</dt>
              <dd className="text-slate-900">
                {form.categories
                  .map((c) => FACILITY_OPTIONS.find((f) => f.code === c)?.label)
                  .join("、")}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">展示タイトル</dt>
              <dd className="mt-1 text-slate-900">{form.exhibitTitle}</dd>
            </div>
            <div>
              <dt className="text-slate-500">展示内容の説明</dt>
              <dd className="mt-1 whitespace-pre-wrap text-slate-900">
                {form.exhibitDescription}
              </dd>
            </div>
          </dl>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-md border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              修正する
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-md bg-slate-900 px-8 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "送信中..." : "申請を送信する"}
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-lg font-bold text-slate-900">申請が完了しました</h1>
          <p className="text-sm text-slate-600">
            展示申請を受け付けました。審査結果はマイページ、またはメールでご連絡します。
          </p>
          <Link
            href="/mypage"
            className="inline-block rounded-md bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            マイページへ
          </Link>
        </div>
      )}
    </div>
  );
}
