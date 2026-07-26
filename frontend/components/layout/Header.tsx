"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";

import { useAuth } from "@/lib/auth/AuthContext";

const STARTUP_NAV_ITEMS = [
  {
    href: "/",
    label: "トップ",
  },
  {
    href: "/showrooms",
    label: "ショールーム検索",
  },
  {
    href: "/applications/new",
    label: "展示関連",
  },
  {
    href: "/surveys/9eeb3fe7-4c05-4933-910c-d9b20f83831d",
    label: "アンケート",
  },
];

const ADMIN_NAV_ITEMS = [
  {
    href: "/",
    label: "トップ",
  },
  {
    href: "/showrooms",
    label: "ショールーム検索",
  },
  {
    href: "/admin/approvals",
    label: "承認一覧",
  },
  {
    href: "/admin/exhibitions",
    label: "展示申請一覧",
  },
  {
    href: "/admin/dashboard",
    label: "ダッシュボード",
  },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "admin";
  const navItems = isAdmin
    ? ADMIN_NAV_ITEMS
    : STARTUP_NAV_ITEMS;

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b border-slate-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="leading-tight">
          <p className="text-sm font-bold text-slate-900">
            Techzeron
          </p>
          <p className="text-sm font-bold text-slate-900">
            Startup Lab
          </p>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
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
            <Link
              href="/mypage"
              className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition ${
                pathname.startsWith("/mypage")
                  ? "bg-slate-700 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              <UserCircle className="h-4 w-4" />

              <span>
                {isAdmin
                  ? "管理者ログイン中"
                  : "マイページ"}
              </span>

              {!isAdmin && (
                <span className="hidden text-xs text-slate-300 lg:inline">
                  {user.name} 様
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => void handleLogout()}
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
