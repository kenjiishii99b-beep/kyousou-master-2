"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check } from "lucide-react";
import { signup } from "@/lib/api/auth";
import { SignupPayload } from "@/types/auth";

type Step = 1 | 2 | 3;

const STEP_LABELS: { step: Step; label: string }[] = [
  { step: 1, label: "基本情報入力" },
  { step: 2, label: "確認" },
  { step: 3, label: "登録完了" },
];

const EMPTY_FORM: SignupPayload = {
  lastName: "",
  firstName: "",
  companyName: "",
  email: "",
  password: "",
};

export function SignupForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<SignupPayload>(EMPTY_FORM);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof SignupPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (
      !form.lastName ||
      !form.firstName ||
      !form.companyName ||
      !form.email ||
      !form.password
    ) {
      return "すべての項目を入力してください。";
    }
    if (form.password.length < 8) {
      return "パスワードは8文字以上で入力してください。";
    }
    if (form.password !== passwordConfirm) {
      return "パスワードが一致しません。";
    }
    if (!agreed) {
      return "利用規約・プライバシーポリシーへの同意が必要です。";
    }
    return null;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateStep1();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await signup(form);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "登録に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        {STEP_LABELS.map((s, index) => (
          <div key={s.step} className="flex items-center gap-2">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-medium ${
                step >= s.step
                  ? "bg-slate-900 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {s.step}
            </span>
            <span
              className={step === s.step ? "font-medium text-slate-900" : ""}
            >
              {s.label}
            </span>
            {index < STEP_LABELS.length - 1 && (
              <span className="text-slate-300">→</span>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-4">
          <h1 className="text-lg font-bold text-slate-900">新規会員登録</h1>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">氏名</label>
            <div className="flex gap-2">
              <input
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="姓を入力"
                className="w-1/2 rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="名を入力"
                className="w-1/2 rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">会社名</label>
            <input
              value={form.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="会社名を入力"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              メールアドレス
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="メールアドレスを入力"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              パスワード
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="8文字以上の半角英数字を入力"
                className="w-full rounded-md border border-slate-300 px-3 py-2 pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              パスワード（確認用）
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="確認のため再度入力"
                className="w-full rounded-md border border-slate-300 px-3 py-2 pr-10 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPasswordConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-slate-500">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-slate-300"
            />
            <span>
              ご登録いただくことで、
              <Link href="/terms" className="text-blue-600 hover:underline">
                利用規約
              </Link>
              ・
              <Link href="/privacy" className="text-blue-600 hover:underline">
                プライバシーポリシー
              </Link>
              に同意したものとみなします。
            </span>
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            確認画面へ進む
          </button>

          <p className="text-center text-sm text-slate-600">
            すでにアカウントをお持ちの方は{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              こちら
            </Link>
          </p>
        </form>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h1 className="text-lg font-bold text-slate-900">入力内容の確認</h1>
          <dl className="space-y-2 rounded-lg border border-slate-100 p-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">氏名</dt>
              <dd className="text-slate-900">
                {form.lastName} {form.firstName}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">会社名</dt>
              <dd className="text-slate-900">{form.companyName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">メールアドレス</dt>
              <dd className="text-slate-900">{form.email}</dd>
            </div>
          </dl>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full rounded-md border border-slate-300 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              修正する
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "登録中..." : "登録する"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Check className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-lg font-bold text-slate-900">
            登録が完了しました
          </h1>
          <p className="text-sm text-slate-600">
            ご登録ありがとうございます。マイページにて申請状況等をご確認いただけます。
          </p>
          <button
            onClick={() => router.push("/mypage")}
            className="inline-block rounded-md bg-slate-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            マイページへ移動する
          </button>
        </div>
      )}
    </div>
  );
}
