'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Utensils,
  Bath,
  Toilet,
  ShowerHead,
  Grid3X3,
  DoorOpen,
  Palette,
  Layers,
  ChevronDown,
  User,
} from 'lucide-react';

// APIから受け取るショールームデータの形
type Showroom = {
  id: number;
  name: string;
  pref: string;
  region: string;
  category: string;
  target: string;
  image: string;
  description: string;
  map_url: string;
};

// カテゴリ定義
const categories = [
  { id: 'kitchen', label: 'キッチン', icon: Utensils },
  { id: 'bath', label: 'バス', icon: Bath },
  { id: 'toilet', label: 'トイレ', icon: Toilet },
  { id: 'washroom', label: '洗面', icon: ShowerHead },
  { id: 'tile', label: 'タイル・建材', icon: Grid3X3 },
  { id: 'door', label: '窓・ドア', icon: DoorOpen },
  { id: 'exterior', label: '外装・エクステリア', icon: Palette },
  { id: 'other', label: 'その他', icon: Layers },
];

export default function SearchPage() {
  // カテゴリ選択
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // APIから取得したショールーム一覧
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);

  // 読み込み状態
  const [isLoading, setIsLoading] = useState(true);

  // エラーメッセージ
  const [error, setError] = useState('');

  // カテゴリの選択・解除
  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // 画面を開いたとき、FastAPIからショールーム一覧を取得
  useEffect(() => {
    const fetchShowrooms = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(
          'http://127.0.0.1:8000/api/showrooms'
        );

        if (!response.ok) {
          throw new Error('APIからデータを取得できませんでした');
        }

        const data = await response.json();

        setShowrooms(data.results);
      } catch (err) {
        console.error(err);
        setError('ショールーム情報を取得できませんでした。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowrooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 共通ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-gray-900"
            >
              Techzeron{' '}
              <span className="text-gray-500 font-normal">
                Startup Lab
              </span>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/search"
                className="text-gray-900 border-b-2 border-gray-900 pb-4 pt-4 font-bold"
              >
                ショールーム検索
              </Link>

              <Link
                href="/apply"
                className="text-gray-600 hover:text-gray-900 pb-4 pt-4"
              >
                展示申請
              </Link>

              <Link
                href="/manage"
                className="text-gray-600 hover:text-gray-900 pb-4 pt-4"
              >
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ページタイトル */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            ショールーム検索
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            条件を指定して、最適なショールームを検索できます。
          </p>
        </div>

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 左側：検索条件 */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">検索条件</h2>

              <button
                type="button"
                onClick={() => setSelectedCategories([])}
                className="text-xs text-gray-500 hover:text-gray-800 border px-2 py-1 rounded bg-gray-50"
              >
                リセット
              </button>
            </div>

            {/* 都道府県 */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                都道府県
              </label>

              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="">選択してください</option>
                  <option value="東京都">東京都</option>
                  <option value="愛知県">愛知県</option>
                  <option value="大阪府">大阪府</option>
                </select>

                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* 地域 */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                地域
              </label>

              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="">選択してください</option>
                  <option value="関東">関東</option>
                  <option value="中部">中部</option>
                  <option value="近畿">近畿</option>
                </select>

                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* 展示カテゴリー */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                展示カテゴリー（複数選択可）
              </label>

              <div className="grid grid-cols-4 gap-2">
                {categories.map((categoryItem) => {
                  const Icon = categoryItem.icon;
                  const isSelected = selectedCategories.includes(
                    categoryItem.id
                  );

                  return (
                    <button
                      key={categoryItem.id}
                      type="button"
                      onClick={() => toggleCategory(categoryItem.id)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/30 text-blue-700'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5 mb-1" />

                      <span className="text-[10px] leading-tight">
                        {categoryItem.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 来場者属性 */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                来場者属性
              </label>

              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-500 pr-8 focus:outline-none">
                  <option value="">選択してください</option>
                  <option value="ファミリー向け">
                    ファミリー向け
                  </option>
                  <option value="ビジネス向け">
                    ビジネス向け
                  </option>
                  <option value="一般向け">一般向け</option>
                </select>

                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* 検索ボタン */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                className="w-full bg-[#0e2147] text-white text-sm font-bold py-3 rounded-lg hover:bg-slate-800 transition"
              >
                この条件で検索する
              </button>

              <button
                type="button"
                className="w-full border border-blue-500 text-blue-600 text-xs font-medium py-2 rounded-lg hover:bg-blue-50 transition text-center"
              >
                条件を保存する
              </button>
            </div>
          </div>

          {/* 右側：検索結果 */}
          <div className="lg:col-span-8 space-y-4">
            {/* 件数表示 */}
            <div className="flex justify-between items-center bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="font-bold text-gray-900 text-sm">
                検索結果：{showrooms.length}件
              </span>
            </div>

            {/* 読み込み中 */}
            {isLoading && (
              <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  ショールーム情報を読み込んでいます...
                </p>
              </div>
            )}

            {/* エラー */}
            {error && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* 検索結果カード一覧 */}
            {!isLoading && !error && (
              <div className="space-y-4">
                {showrooms.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex gap-4 items-center min-w-0">
                      {/* ショールーム画像 */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-200"
                      />

                      <div className="space-y-1.5 min-w-0">
                        {/* 詳細画面へのリンク */}
                        <Link
                          href={`/search/${item.id}`}
                          className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition block truncate"
                        >
                          {item.name}
                        </Link>

                        {/* 所在地 */}
                        <p className="text-xs text-gray-500 truncate">
                          {item.pref}・{item.region}
                        </p>

                        {/* カテゴリと来場者属性 */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
                            {item.category}
                          </span>

                          <span className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
                            {item.target}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 説明文 */}
                    <div className="sm:border-l sm:border-gray-100 sm:pl-6 pt-3 sm:pt-0 border-t border-gray-100 sm:border-t-0 max-w-xs">
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}

                {/* 0件の場合 */}
                {showrooms.length === 0 && (
                  <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
                    <p className="text-sm text-gray-500">
                      該当するショールームがありません。
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}