"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/api/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }

    setLoading(true);
    try {
      await login({ email, password, keepLoggedIn });
      router.push("/mypage");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h1 className="text-lg font-bold text-slate-900">ログイン</h1>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレスを入力"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-700">パスワード</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            className="w-full rounded-md border border-slate-300 px-3 py-2 pr-10 text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input
            type="checkbox"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
            className="rounded border-slate-300"
          />
          ログインしたままにする
        </label>
        <Link href="/password-reset" className="text-blue-600 hover:underline">
          パスワードをお忘れの方はこちら
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "ログイン中..." : "ログイン"}
      </button>

      <div className="text-center text-xs text-slate-400">または</div>

      <Link
        href="/login?as=admin"
        className="block w-full rounded-md border border-slate-300 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        管理者アカウントでログイン
      </Link>

      <p className="text-center text-sm text-slate-600">
        アカウントをお持ちでない方は{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          新規会員登録
        </Link>
      </p>
    </form>
  );
}
