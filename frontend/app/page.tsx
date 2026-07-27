'use client';

import React from 'react';
import Link from 'next/link';
import {
  Search,
  FileEdit,
  BarChart3,
  User,
  ChevronDown,
  Image as ImageIcon
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* 共通ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
              Techzeron <span className="text-gray-500 font-normal">Startup Lab</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/search" className="text-gray-600 hover:text-gray-900 pb-4 pt-4">
                ショールーム検索
              </Link>
              <Link href="/apply" className="text-gray-600 hover:text-gray-900 pb-4 pt-4">
                展示申請
              </Link>
              <Link href="/manage" className="text-gray-600 hover:text-gray-900 pb-4 pt-4">
                展示管理
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <span className="font-medium">株式会社サンプル</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        
        {/* 1. ヒーローセクション */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              住生活領域の共創で、<br />
              未来のくらしをつくる。
            </h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              Techzeron Startup Labは、住設のショールームを活用し、スタートアップ企業の商品・サービス展示、実証実験（PoC）・顧客フィードバック収集を支援するプラットフォームです。
            </p>
            <div>
              <button className="bg-[#0e2147] text-white text-sm font-bold px-6 py-3 rounded-md hover:bg-slate-800 transition shadow-sm">
                サービスについて詳しく見る
              </button>
            </div>
          </div>
          <div className="bg-slate-100 rounded-xl h-64 md:h-72 flex flex-col items-center justify-center text-gray-400 gap-3 border border-slate-200">
            <div className="w-16 h-12 bg-slate-300 rounded-md flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
            <span className="text-xs font-medium">画像準備中</span>
          </div>
        </section>

        {/* 2. ご利用の流れ */}
        <section className="space-y-8 pt-4">
          <h2 className="text-xl font-bold text-gray-900">ご利用の流れ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* STEP 1 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0e2147] text-white flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-400 font-bold tracking-wider">STEP 1</p>
              <h3 className="font-bold text-gray-900 text-base">ショールームを探す</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                条件を指定して、全国のショールームから最適な展示場所を検索できます。
              </p>
            </div>

            {/* STEP 2 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0e2147] text-white flex items-center justify-center mb-4">
                <FileEdit className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-400 font-bold tracking-wider">STEP 2</p>
              <h3 className="font-bold text-gray-900 text-base">展示申請</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                展示したい期間・カテゴリを選んで申請するだけ。最短即日で受付完了します。
              </p>
            </div>

            {/* STEP 3 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#0e2147] text-white flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-400 font-bold tracking-wider">STEP 3</p>
              <h3 className="font-bold text-gray-900 text-base">フィードバック収集</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                来場者アンケートやダッシュボードで、来場者の反応をリアルタイムに確認できます。
              </p>
            </div>

          </div>
        </section>

        {/* 3. お知らせ & イベント情報 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
          
          {/* 左側：お知らせ (7列) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">お知らせ</h2>
              <Link href="/news" className="text-xs text-blue-600 hover:underline">
                すべてのお知らせを見る
              </Link>
            </div>
            
            <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
              
              <div className="py-3.5 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded font-medium flex-shrink-0">
                    お知らせ
                  </span>
                  <span className="text-gray-800 font-medium truncate">
                    「Techzeron Startup Lab」サービス正式リリースのお知らせ
                  </span>
                </div>
                <span className="text-gray-400 flex-shrink-0">2024/06/01</span>
              </div>

              <div className="py-3.5 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded font-medium flex-shrink-0">
                    イベント
                  </span>
                  <span className="text-gray-800 font-medium truncate">
                    【7/10開催】スタートアップ向けショールーム活用セミナー
                  </span>
                </div>
                <span className="text-gray-400 flex-shrink-0">2024/05/28</span>
              </div>

              <div className="py-3.5 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded font-medium flex-shrink-0">
                    お知らせ
                  </span>
                  <span className="text-gray-800 font-medium truncate">
                    ショールーム「名古屋」追加オープンのお知らせ
                  </span>
                </div>
                <span className="text-gray-400 flex-shrink-0">2024/05/15</span>
              </div>

              <div className="py-3.5 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded font-medium flex-shrink-0">
                    お知らせ
                  </span>
                  <span className="text-gray-800 font-medium truncate">
                    システムメンテナンスのお知らせ（6/8 0:00〜6:00）
                  </span>
                </div>
                <span className="text-gray-400 flex-shrink-0">2024/05/10</span>
              </div>

            </div>
          </div>

          {/* 右側：イベント情報 (5列) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">イベント情報</h2>
              <a href="#" className="text-xs text-blue-600 hover:underline">すべて見る</a>
            </div>

            <div className="border border-gray-100 bg-slate-50/50 rounded-xl p-5 space-y-3">
              <span className="text-xs text-gray-400 font-medium">7.10 (水)</span>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">
                スタートアップ向けショールーム活用セミナー
              </h3>
              <p className="text-xs text-gray-500">
                14:00〜16:00 ／ オンライン開催（参加無料）
              </p>
            </div>
          </div>

        </section>

      </main>
    </div>
  );
}