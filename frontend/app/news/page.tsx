'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ChevronDown,
  ChevronUp,
  Bell,
  Calendar,
  Info,
  Wrench,
  Search
} from 'lucide-react';

// お知らせの型定義
type NewsItem = {
  id: string;
  date: string;
  category: 'お知らせ' | 'イベント' | 'メンテナンス';
  title: string;
  content: string;
};

// サンプルお知らせデータ
const newsData: NewsItem[] = [
  {
    id: 'NEWS-001',
    date: '2024/06/01',
    category: 'お知らせ',
    title: '「Techzeron Startup Lab」サービス正式リリースのお知らせ',
    content: `平素より格別のご高配を賜り、厚く御礼申し上げます。

本日より、住生活領域のスタートアップ企業とショールームをつなぐプラットフォーム「Techzeron Startup Lab」を正式にリリースいたしました。

【主な提供機能】
・全国の提携ショールームの検索および展示枠の空き状況確認
・オンラインでの展示申請手続き
・来場者からのリアルタイムフィードバック収集・分析ダッシュボード

スタートアップ企業の皆様の商品・サービスの検証（PoC）やマーケティング支援を強力にサポートしてまいります。
今後とも「Techzeron Startup Lab」をよろしくお願いいたします。`
  },
  {
    id: 'NEWS-002',
    date: '2024/05/28',
    category: 'イベント',
    title: '【7/10開催】スタートアップ向けショールーム活用セミナー',
    content: `スタートアップ企業の皆様を対象としたオンラインセミナーを開催いたします。

【セミナー概要】
■ 日時：2024年7月10日（水）14:00〜16:00
■ 形式：オンライン（Zoom）／ 参加無料
■ 対象：住宅設備・家電・インテリア領域のプロダクトを開発中・販売中のスタートアップ企業様
■ アジェンダ：
  1. ショールームを活用した効率的なPoCの実践法
  2. 来場者アンケートから見る「購入意向」を引き出す見せ方
  3. Q&A・個別相談会

ご参加をご希望の方は、イベント詳細ページよりお申し込みください。`
  },
  {
    id: 'NEWS-003',
    date: '2024/05/15',
    category: 'お知らせ',
    title: 'ショールーム「名古屋」追加オープンのお知らせ',
    content: `展示可能なショールーム拠点として、新たに「Techzeron Startup Lab 名古屋」が加わりました。

■ 新拠点の概要
・拠点名：Techzeron Startup Lab 名古屋
・所在地：愛知県名古屋市中村区名駅4-1-1
・対象カテゴリ：キッチン、バス・洗面、スマートホーム機器

本日より「ショールーム検索」画面および「展示申請」画面から選択・申請が可能となっております。東海エリアでの展開をご検討中の企業様はぜひご活用ください。`
  },
  {
    id: 'NEWS-004',
    date: '2024/05/10',
    category: 'メンテナンス',
    title: 'システムメンテナンスのお知らせ（6/8 0:00〜6:00）',
    content: `システム基盤の更新および機能追加に伴い、以下の日程でシステムメンテナンスを実施いたします。

■ メンテナンス日時
2024年6月8日（土） 00:00 〜 06:00（予定）

■ 影響範囲
上記時間帯は、本プラットフォームへのログイン、展示検索、新規申請、管理画面の操作を含む全てのサービスがご利用いただけません。

ご不便をおかけいたしますが、ご理解とご協力のほどよろしくお願い申し上げます。`
  }
];

export default function NewsPage() {
  // 開いているお知らせのIDを保持（複数同時開きも可能な設計）
  const [openIds, setOpenIds] = useState<string[]>([]);
  // カテゴリフィルター
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');
  // 検索キーワード
  const [searchQuery, setSearchQuery] = useState<string>('');

  // アコーディオンの開閉切り替え
  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // カテゴリバッジのスタイル
  const getCategoryBadge = (category: NewsItem['category']) => {
    switch (category) {
      case 'お知らせ':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded text-[11px] font-bold flex-shrink-0">
            <Info className="w-3 h-3" />
            お知らせ
          </span>
        );
      case 'イベント':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded text-[11px] font-bold flex-shrink-0">
            <Calendar className="w-3 h-3" />
            イベント
          </span>
        );
      case 'メンテナンス':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded text-[11px] font-bold flex-shrink-0">
            <Wrench className="w-3 h-3" />
            メンテナンス
          </span>
        );
    }
  };

  // フィルタリング処理
  const filteredNews = newsData.filter((item) => {
    const matchesCategory =
      selectedCategory === 'すべて' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
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
              <Link
                href="/news"
                className="text-gray-900 border-b-2 border-gray-900 pb-4 pt-4 font-bold"
              >
                お知らせ
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
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* ページタイトル */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#0e2147]" />
            お知らせ
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            プラットフォームからの重要なお知らせやイベント情報をご確認いただけます。
          </p>
        </div>

        {/* フィルター＆キーワード検索 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* カテゴリタブ */}
          <div className="flex flex-wrap gap-1.5 text-xs font-medium w-full sm:w-auto">
            {['すべて', 'お知らせ', 'イベント', 'メンテナンス'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg transition ${
                  selectedCategory === category
                    ? 'bg-[#0e2147] text-white font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 検索ボックス */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="お知らせを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:bg-white focus:border-gray-400 transition"
            />
          </div>
        </div>

        {/* お知らせリスト（プルダウン/アコーディオン） */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
          {filteredNews.map((item) => {
            const isOpen = openIds.includes(item.id);

            return (
              <div key={item.id} className="transition">
                {/* 見出し（クリック可能領域） */}
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 min-w-0 flex-1">
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-medium text-gray-400 font-mono">
                        {item.date}
                      </span>
                      {getCategoryBadge(item.category)}
                    </div>
                    <span className="text-sm font-bold text-gray-900 truncate">
                      {item.title}
                    </span>
                  </div>

                  {/* 開閉状態を示す矢印アイコン */}
                  <div className="flex-shrink-0 text-gray-400">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* プルダウンで表示される本文エリア */}
                {isOpen && (
                  <div className="px-6 py-5 bg-slate-50/50 border-t border-gray-100 text-xs text-gray-700 leading-relaxed whitespace-pre-line space-y-2">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}

          {filteredNews.length === 0 && (
            <div className="p-12 text-center text-gray-400 text-xs space-y-1">
              <p className="font-bold text-gray-600 text-sm">該当するお知らせはありません</p>
              <p>条件を変更して再度お試しください。</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}