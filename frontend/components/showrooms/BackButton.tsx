"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <Link
      href="/showrooms"
      className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#0e2147] transition"
    >
      <ArrowLeft className="h-4 w-4" />
      検索結果一覧に戻る
    </Link>
  );
}