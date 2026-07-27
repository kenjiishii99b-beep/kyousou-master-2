"use client";

import Image from "next/image";
import { DEFAULT_SHOWROOM_IMAGE } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          住生活領域の共創で、
          <br />
          未来のくらしをつくる。
        </h1>

        <p className="text-sm text-gray-600 leading-relaxed">
          Techzeron Startup Labは、住設のショールームを活用し、
          スタートアップ企業の商品・サービス展示、
          実証実験（PoC）・顧客フィードバック収集を支援する
          プラットフォームです。
        </p>

        <button className="rounded-md bg-[#0e2147] px-6 py-3 text-sm font-bold text-white hover:bg-slate-800">
          サービスについて詳しく見る
        </button>
      </div>

      <div className="relative h-72 overflow-hidden rounded-xl border border-slate-200">
        <Image
          src={DEFAULT_SHOWROOM_IMAGE}
          alt="Techzeron Startup Lab"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
