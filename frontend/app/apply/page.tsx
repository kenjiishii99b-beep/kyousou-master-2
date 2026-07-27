'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ChevronDown,
  CheckCircle2,
  Send,
} from 'lucide-react';

export default function ApplyPage() {
  // APIへ送る9項目
  const [showroomId, setShowroomId] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [exhibitionPurpose, setExhibitionPurpose] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [requiredSpace, setRequiredSpace] = useState('');
  const [setupRequirements, setSetupRequirements] = useState('');

  // 画面の状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // 展示申請をFastAPIへ送信
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');

    // 必須項目の確認
    if (
      !showroomId ||
      !productName.trim() ||
      !startDate ||
      !endDate
    ) {
      setError('必須項目を入力してください。');
      return;
    }

    if (endDate < startDate) {
      setError('終了日は開始日以降にしてください。');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/exhibition_applications',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // 認証機能は対象外なので、今回は固定値2
            applicant_member_id: 2,

            showroom_id: Number(showroomId),
            product_name: productName,
            product_description: productDescription || null,
            exhibition_purpose: exhibitionPurpose || null,
            requested_start_date: startDate,
            requested_end_date: endDate,
            required_space: requiredSpace || null,
            setup_requirements: setupRequirements || null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('展示申請の送信に失敗しました。');
      }

      const data = await response.json();
      console.log('申請成功:', data);

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        '展示申請を送信できませんでした。FastAPIが起動しているか確認してください。'
      );
    } finally {
      setIsSubmitting(false);
    }
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
            <h1 className="text-xl font-bold text-gray-900">
              展示申請が完了しました
            </h1>

            <p className="text-xs text-gray-500 leading-relaxed">
              展示申請を受け付けました。
              <br />
              展示管理画面から申請内容を確認できます。
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Link
              href="/manage"
              className="block w-full py-3 bg-[#0e2147] text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition shadow-sm"
            >
              展示管理画面で確認する
            </Link>

            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="block w-full py-3 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition"
            >
              続けて申請する
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                className="text-gray-600 hover:text-gray-900 pb-4 pt-4"
              >
                ショールーム検索
              </Link>

              <Link
                href="/apply"
                className="text-gray-900 border-b-2 border-gray-900 pb-4 pt-4 font-bold"
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
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            展示申請
          </h1>

          <p className="text-xs text-gray-500 mt-1">
            展示を希望するショールームと商品情報を入力してください。
          </p>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* ショールーム・展示期間 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-gray-900">
              ショールーム・展示期間
            </h2>

            {/* showroom_id */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                ショールーム
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="relative">
                <select
                  value={showroomId}
                  onChange={(event) =>
                    setShowroomId(event.target.value)
                  }
                  required
                  className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">
                    選択してください
                  </option>

                  <option value="1">
                    栄スマートホームショールーム
                  </option>

                  <option value="2">
                    丸の内モダンオフィス展示場
                  </option>

                  <option value="3">
                    梅田ライフスタイルスタジオ
                  </option>
                </select>

                <ChevronDown className="w-5 h-5 text-gray-500 absolute right-4 top-3 pointer-events-none" />
              </div>
            </div>

            {/* 日付 */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                展示希望期間
                <span className="text-red-500 ml-1">*</span>
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) =>
                    setStartDate(event.target.value)
                  }
                  required
                  className="w-full flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <span className="text-gray-400">
                  〜
                </span>

                <input
                  type="date"
                  value={endDate}
                  onChange={(event) =>
                    setEndDate(event.target.value)
                  }
                  required
                  className="w-full flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* 商品情報 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-gray-900">
              展示商品情報
            </h2>

            {/* product_name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                展示商品名
                <span className="text-red-500 ml-1">*</span>
              </label>

              <input
                type="text"
                value={productName}
                onChange={(event) =>
                  setProductName(event.target.value)
                }
                required
                placeholder="例：スマートホーム展示デバイス"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* product_description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                商品説明
                <span className="text-xs font-normal text-gray-400 ml-2">
                  任意
                </span>
              </label>

              <textarea
                value={productDescription}
                onChange={(event) =>
                  setProductDescription(event.target.value)
                }
                rows={4}
                placeholder="商品の概要や特徴を入力してください"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* exhibition_purpose */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                展示目的
                <span className="text-xs font-normal text-gray-400 ml-2">
                  任意
                </span>
              </label>

              <textarea
                value={exhibitionPurpose}
                onChange={(event) =>
                  setExhibitionPurpose(event.target.value)
                }
                rows={3}
                placeholder="例：ユーザー検証や認知度向上のため"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* 設置条件 */}
          <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-gray-900">
              展示スペース・設置条件
            </h2>

            {/* required_space */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                必要な展示スペース
                <span className="text-xs font-normal text-gray-400 ml-2">
                  任意
                </span>
              </label>

              <input
                type="text"
                value={requiredSpace}
                onChange={(event) =>
                  setRequiredSpace(event.target.value)
                }
                placeholder="例：幅2m × 奥行1m"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* setup_requirements */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                設置条件
                <span className="text-xs font-normal text-gray-400 ml-2">
                  任意
                </span>
              </label>

              <textarea
                value={setupRequirements}
                onChange={(event) =>
                  setSetupRequirements(event.target.value)
                }
                rows={3}
                placeholder="例：100V電源、水道接続が必要"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* 送信ボタン */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 px-10 py-3 rounded-lg text-sm font-bold text-white transition shadow-sm ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#0e2147] hover:bg-slate-800'
              }`}
            >
              <Send className="w-4 h-4" />

              {isSubmitting
                ? '送信中...'
                : '展示申請を送信する'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}