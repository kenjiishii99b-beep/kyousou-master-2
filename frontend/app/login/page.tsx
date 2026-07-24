"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Azure Functions のURL（.env.localから取得）
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);

        throw new Error(
          err?.detail ||
            err?.message ||
            "メールアドレスまたはパスワードが間違っています。",
        );
      }

      const data = await res.json();

      // JWT保存
      localStorage.setItem("access_token", data.access_token);

      // マイページへ遷移
      router.push("/mypage");
    } catch (err: any) {
      setError(err.message || "ログインに失敗しました。");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-xl font-bold text-slate-900">ログイン</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              メールアドレス
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレスを入力"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              パスワード
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-slate-300" />
              ログインしたままにする
            </label>

            <a href="#" className="text-blue-600 hover:underline">
              パスワードをお忘れの方はこちら
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-slate-900 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            ログイン
          </button>
        </form>

        <div className="my-6 flex items-center before:flex-1 before:border-t before:border-slate-200 after:flex-1 after:border-t after:border-slate-200">
          <p className="mx-4 text-xs text-slate-400">または</p>
        </div>

        <button className="w-full rounded-md border border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
          管理者アカウントでログイン
        </button>

        <p className="mt-6 text-center text-xs text-slate-500">
          アカウントをお持ちでない方は{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            新規会員登録
          </Link>
        </p>
      </div>
    </div>
  );
}
