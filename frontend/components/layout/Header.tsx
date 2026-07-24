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
    <header className="border-b border-slate-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="leading-tight">
          <p className="text-sm font-bold text-slate-900">Techzeron</p>
          <p className="text-sm font-bold text-slate-900">Startup Lab</p>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`pb-1 ${
                  active
                    ? "border-b-2 border-slate-900 font-medium text-slate-900"
                    : "hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {user ? (
          <div className="flex items-center gap-3">
            <Link href="/mypage" className="text-sm text-slate-700 hover:underline">
              {user.name} 様
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signup"
              className="rounded-md border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              新規会員登録
            </Link>
            <Link
              href="/login"
              className="rounded-md bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              ログイン
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
