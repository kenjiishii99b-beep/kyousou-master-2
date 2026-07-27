'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  ChevronDown,
  CheckCircle2,
  ArrowLeft,
  Send,
  Building2,
  Calendar,
  Package,
  FileText
} from 'lucide-react';

export default function ApplyConfirmPage() {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 送信処理（擬似処理）
  const handleSubmit = () => {
    if (!isAgreed) return;
    setIsSubmitting(true);

    // 1.5秒後に完了状態へ移行
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // 送信完了画面
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex items-center justify-center p-6">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl border border-gray-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-gray-900">展示申請が完了しました</h1>
            <p className="text-xs text-gray-500 leading-relaxed">
              申請内容の確認メールを送信いたしました。<br />
              運営事務局にて内容を確認のうえ、3営業日以内にご連絡いたします。
            </p>
          </div>
          <div className="pt-4 space-y-3">
            <Link
              href="/manage"
              className="block w-full py-3 bg-[#0e2147] text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition shadow-sm"
            >
              展示管理画面で確認する
            </Link>
            <Link
              href="/"
              className="block w-full py-3 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition"
            >
              ホームへ戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 入力内容確認画面
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
              <Link
                href="/apply"
                className="text-gray-900 border-b-2 border-gray-900 pb-4 pt-4 font-bold"
              >
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
      <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* ステップバー */}
        <div className="flex items-center justify-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">1</span>
            <span>入力</span>
          </div>
          <div className="w-12 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2 text-[#0e2147] font-bold">
            <span className="w-6 h-6 rounded-full bg-[#0e2147] text-white flex items-center justify-center">2</span>
            <span>確認</span>
          </div>
          <div className="w-12 h-px bg-gray-200"></div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-100 border flex items-center justify-center text-gray-400">3</span>
            <span>完了</span>
          </div>
        </div>

        {/* ページタイトル */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">申請内容の確認</h1>
          <p className="text-xs text-gray-500">
            内容にお間違いがないかご確認のうえ、「送信する」ボタンを押してください。
          </p>
        </div>

        {/* 確認カード群 */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100 overflow-hidden">
          
          {/* ショールーム情報 */}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0e2147]">
              <Building2 className="w-4 h-4" />
              <span>申請対象ショールーム</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg space-y-1">
              <p className="text-sm font-bold text-gray-900">Techzeron Startup Lab 東京（新宿）</p>
              <p className="text-xs text-gray-500">東京都新宿区西新宿1-1-1 / ブースA（大型展示スペース）</p>
            </div>
          </div>

          {/* 展示概要 */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0e2147]">
              <Package className="w-4 h-4" />
              <span>展示プロダクト情報</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block mb-0.5">プロダクト名</span>
                <span className="font-bold text-gray-800">スマート水栓「EcoFlow-1」</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">展示カテゴリ</span>
                <span className="font-bold text-gray-800">水まわり・キッチン設備</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-0.5">電源・水道利用</span>
                <span className="font-bold text-gray-800">電源あり / 水道接続あり</span>
              </div>
            </div>
          </div>

          {/* 希望期間 */}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0e2147]">
              <Calendar className="w-4 h-4" />
              <span>展示希望期間</span>
            </div>
            <div className="text-xs font-bold text-gray-800 bg-slate-50 p-3 rounded-lg inline-block">
              2026年08月01日（土） 〜 2026年08月31日（月） 【1ヶ月間】
            </div>
          </div>

          {/* 補足・メッセージ */}
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0e2147]">
              <FileText className="w-4 h-4" />
              <span>補足事項・PoCの目的</span>
            </div>
            <p className="text-xs text-gray-700 bg-slate-50 p-4 rounded-lg leading-relaxed whitespace-pre-line">
              新開発の節水センサ機能に関する来場者（一般施主様）からの定性フィードバック収集および、工務店様向けの事前予約獲得を目的としています。
            </p>
          </div>

        </div>

        {/* 利用規約同意チェック */}
        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm text-center space-y-3">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-[#0e2147] focus:ring-[#0e2147] cursor-pointer"
            />
            <span className="text-xs text-gray-700 font-medium">
              <a href="#" className="text-blue-600 hover:underline">ショールーム利用規約</a> および <a href="#" className="text-blue-600 hover:underline">プライバシーポリシー</a> に同意する
            </span>
          </label>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-100 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            入力画面に戻る
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isAgreed || isSubmitting}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-3 rounded-lg text-xs font-bold text-white transition shadow-sm ${
              isAgreed && !isSubmitting
                ? 'bg-[#0e2147] hover:bg-slate-800 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span>送信中...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>この内容で送信する</span>
              </>
            )}
          </button>
        </div>

      </main>
    </div>
  );
}
