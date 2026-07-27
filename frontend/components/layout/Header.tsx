"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

const NAV_ITEMS = [
  { href: "/", label: "トップ" },
  { href: "/showrooms", label: "ショールーム検索" },
  { href: "/applications/new", label: "展示関連" },
  { href: "/surveys/test123", label: "アンケート" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* ロゴ */}
        <Link href="/" className="leading-tight">
          <p className="text-xl font-bold text-slate-900">Techzeron</p>
          <p className="text-lg font-medium text-slate-600">Startup Lab</p>
        </Link>

        {/* メニュー */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b-2 pb-1 text-sm font-medium transition-colors ${
                  active
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-600 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 右側 */}
        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/mypage"
              className="text-sm font-medium text-slate-700 hover:underline"
            >
              {user.name} 様
            </Link>

            <Link
              href="/mypage"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
            >
              マイページ
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/signup"
              className="rounded-md border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              新規会員登録
            </Link>

            <Link
              href="/login"
              className="rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              ログイン
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
