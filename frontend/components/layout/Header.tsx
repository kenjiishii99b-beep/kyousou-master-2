"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle } from "lucide-react";

import { useAuth } from "@/lib/auth/AuthContext";

const NAV_ITEMS = [
  {
    href: "/",
    label: "\u30c8\u30c3\u30d7",
  },
  {
    href: "/showrooms",
    label: "\u30b7\u30e7\u30fc\u30eb\u30fc\u30e0\u691c\u7d22",
  },
  {
    href: "/applications/new",
    label: "\u5c55\u793a\u95a2\u9023",
  },
  {
    href: "/surveys/9eeb3fe7-4c05-4933-910c-d9b20f83831d",
    label: "\u30a2\u30f3\u30b1\u30fc\u30c8",
  },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

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
          {NAV_ITEMS.map((item) => {
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
                {"\u30de\u30a4\u30da\u30fc\u30b8"}
              </span>

              <span className="hidden text-xs text-slate-300 lg:inline">
                {user.name} {"\u69d8"}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => void handleLogout()}
              className="rounded-md border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {"\u30ed\u30b0\u30a2\u30a6\u30c8"}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/signup"
              className="rounded-md border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {"\u65b0\u898f\u4f1a\u54e1\u767b\u9332"}
            </Link>

            <Link
              href="/login"
              className="rounded-md bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              {"\u30ed\u30b0\u30a4\u30f3"}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
