'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  User,
  ChevronDown,
  Calendar,
  MapPin,
  Clock,
  FileText,
} from 'lucide-react';

// FastAPIから返ってくる申請データの形
type ExhibitionApplication = {
  id: number;
  applicant_member_id: number;
  showroom_id: number;
  product_name: string;
  product_description: string | null;
  exhibition_purpose: string | null;
  requested_start_date: string;
  requested_end_date: string;
  required_space: string | null;
  setup_requirements: string | null;
  status: string;
  reviewed_by_member_id: number | null;
  reviewed_at: string | null;
  review_comment: string | null;
};

export default function ManagePage() {
  // APIから取得した申請一覧を入れる箱
  const [applications, setApplications] = useState<
    ExhibitionApplication[]
  >([]);

  // 読み込み中かどうか
  const [isLoading, setIsLoading] = useState(true);

  // エラーメッセージ
  const [error, setError] = useState('');

  // ステータス絞り込み
  const [selectedStatus, setSelectedStatus] =
    useState('all');

  // 画面を開いたときにFastAPIから申請一覧を取得
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(
          'http://127.0.0.1:8000/exhibition_applications'
        );

        if (!response.ok) {
          throw new Error('申請一覧の取得に失敗しました');
        }

        const data = await response.json();

        setApplications(data.results);
      } catch (err) {
        console.error(err);
        setError(
          '展示申請一覧を取得できませんでした。FastAPIが起動しているか確認してください。'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // showroom_idをショールーム名に変換
  const getShowroomName = (showroomId: number) => {
    if (showroomId === 1) {
      return '栄スマートホームショールーム';
    }

    if (showroomId === 2) {
      return '丸の内モダンオフィス展示場';
    }

    if (showroomId === 3) {
      return '梅田ライフスタイルスタジオ';
    }

    return '不明なショールーム';
  };

  // statusを日本語に変換
  const getStatusText = (status: string) => {
    if (status === 'pending') {
      return '審査中';
    }

    if (status === 'approved') {
      return '承認済み';
    }

    if (status === 'active') {
      return '展示中';
    }

    if (status === 'ended') {
      return '終了';
    }

    return status;
  };

  // ステータスの見た目
  const getStatusClass = (status: string) => {
    if (status === 'pending') {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }

    if (status === 'approved') {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }

    if (status === 'active') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }

    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  // 選択したステータスだけ表示
  const filteredApplications =
    selectedStatus === 'all'
      ? applications
      : applications.filter(
          (item) => item.status === selectedStatus
        );

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
                className="text-gray-600 hover:text-gray-900 pb-4 pt-4"
              >
                展示申請
              </Link>

              <Link
                href="/manage"
                className="text-gray-900 border-b-2 border-gray-900 pb-4 pt-4 font-bold"
              >
                展示管理
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border">
              <User className="w-4 h-4 text-gray-600" />
            </div>

            <span className="font-medium">
              株式会社サンプル
            </span>

            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </header>

      {/* メイン */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* タイトル */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              展示管理
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              申請した展示の一覧とステータスを確認できます。
            </p>
          </div>

          <Link
            href="/apply"
            className="inline-flex items-center justify-center bg-[#0e2147] text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-slate-800 transition"
          >
            ＋ 新しく展示を申請する
          </Link>
        </div>

        {/* ステータス絞り込み */}
        <div className="bg-white p-2 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-2 text-xs">
          <button
            type="button"
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-lg ${
              selectedStatus === 'all'
                ? 'bg-[#0e2147] text-white font-bold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            すべて ({applications.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('pending')}
            className={`px-4 py-2 rounded-lg ${
              selectedStatus === 'pending'
                ? 'bg-[#0e2147] text-white font-bold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            審査中 (
            {
              applications.filter(
                (item) => item.status === 'pending'
              ).length
            }
            )
          </button>

          <button
            type="button"
            onClick={() => setSelectedStatus('approved')}
            className={`px-4 py-2 rounded-lg ${
              selectedStatus === 'approved'
                ? 'bg-[#0e2147] text-white font-bold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            承認済み (
            {
              applications.filter(
                (item) => item.status === 'approved'
              ).length
            }
            )
          </button>
        </div>

        {/* 読み込み中 */}
        {isLoading && (
          <div className="bg-white p-10 rounded-xl border border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              展示申請一覧を読み込んでいます...
            </p>
          </div>
        )}

        {/* エラー */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* 一覧 */}
        {!isLoading && !error && (
          <div className="space-y-4">
            {filteredApplications.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4"
              >
                {/* 上部 */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="text-xs font-mono font-bold text-gray-400">
                    申請ID：{item.id}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusClass(
                      item.status
                    )}`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    {getStatusText(item.status)}
                  </span>
                </div>

                {/* 内容 */}
                <div className="space-y-3">
                  <h2 className="text-base font-bold text-gray-900">
                    {item.product_name}
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />

                    <span className="font-semibold">
                      {getShowroomName(item.showroom_id)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-400" />

                    <span>
                      {item.requested_start_date} 〜{' '}
                      {item.requested_end_date}
                    </span>
                  </div>

                  {item.product_description && (
                    <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {item.product_description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* 0件 */}
            {filteredApplications.length === 0 && (
              <div className="bg-white p-12 rounded-xl border border-gray-200 text-center">
                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />

                <p className="text-sm font-bold text-gray-700">
                  該当する申請情報がありません
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}