'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  User,
  ChevronDown,
  MapPin,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Building2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

// ショールームのダミーデータベース（IDごとに表示を切替）
const showroomDataList: Record<
  string,
  {
    title: string;
    category: string;
    address: string;
    access: string;
    spaceType: string;
    size: string;
    features: string[];
    status: string;
    availableDates: string;
    description: string;
  }
> = {
  sapporo: {
    title: 'Techzeron Startup Lab 札幌',
    category: '住宅設備・インテリア総合',
    address: '北海道札幌市中央区北4条西4-1-1',
    access: 'JR札幌駅 南口徒歩2分 / 地下鉄さっぽろ駅 直結',
    spaceType: 'ブースA（大型展示スペース）',
    size: 'W3.0m × D2.0m × H2.4m',
    features: ['電源完備 (100V/200V)', '給排水設備対応', 'Wi-Fi完備', '無人モニタリングカメラ設置'],
    status: '空きあり',
    availableDates: '2026年08月01日 〜',
    description:
      '北海道エリアの建築関係者や一般施主が多く訪れる旗艦ショールームです。広々としたスペースでキッチン・バス等の大型実機展示に最適です。',
  },
  hakodate: {
    title: 'Techzeron Startup Lab 函館',
    category: '住宅設備・建材',
    address: '北海道函館市若松町12-8',
    access: 'JR函館駅 徒歩5分',
    spaceType: 'ブースB（標準展示スペース）',
    size: 'W2.0m × D1.5m × H2.2m',
    features: ['電源完備 (100V)', 'Wi-Fi完備', 'スポット照明あり'],
    status: '空きあり',
    availableDates: '2026年08月15日 〜',
    description:
      '函館駅から徒歩圏内の利便性の高い展示エリアです。地域密着型のB2B展示やプロモーションに適しています。',
  },
  sendai: {
    title: 'Techzeron Startup Lab 仙台',
    category: '住宅設備・スマートホーム',
    address: '宮城県仙台市青葉区中央3-2-1',
    access: 'JR仙台駅 西口徒歩3分',
    spaceType: 'ブースA（大型展示スペース）',
    size: 'W3.5m × D2.0m × H2.4m',
    features: ['電源完備 (100V/200V)', '給排水設備対応', 'Wi-Fi完備', 'サイネージモニター完備'],
    status: '空きあり',
    availableDates: '2026年08月01日 〜',
    description:
      '東北エリアの中心地に位置し、工務店・設計事務所向けの新製品発表やPoC実証実験にベストな環境です。',
  },
};

export default function ShowroomDetailPage() {
  const params = useParams();
const id = params?.id as string;

const [showroom, setShowroom] = useState<any>(null);

useEffect(() => {
  fetch(`http://127.0.0.1:8000/api/showrooms/${id}`)
    .then((res) => res.json())
    .then((data) => setShowroom(data));
}, [id]);

if (!showroom) {
  return <div className="p-10">読み込み中...</div>;
}

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
              <Link
                href="/search"
                className="text-gray-900 border-b-2 border-gray-900 pb-4 pt-4 font-bold"
              >
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
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* 戻るボタン */}
        <div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            検索結果一覧に戻る
          </Link>
        </div>

        {/* ヒーローセクション */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-block px-3 py-1 bg-slate-100 text-[#0e2147] text-xs font-bold rounded-full">
              {showroom.category}
            </span>
           <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            展示可能（即時予約可）
           </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 leading-snug">{showroom.name}</h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{showroom.pref}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>利用可能開始時期: 展示可能</span>
            </div>
          </div>
        </div>

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* 左側：詳細 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-200 border border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center text-gray-500 gap-2">
              <Building2 className="w-10 h-10 text-gray-400" />
              <span className="text-xs font-medium">ショールーム内観プレビュー画像</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
              <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
                スペース概要
              </h2>
              <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                {showroom.description}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
                ブース仕様・設備
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg space-y-1">
                  <dt className="text-gray-400">区画・ブース種別</dt>
                  <dd className="font-bold text-gray-800">展示スペース</dd>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg space-y-1">
                  <dt className="text-gray-400">展示スペース寸法</dt>
                  <dd className="font-bold text-gray-800">未設定</dd>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg sm:col-span-2 space-y-1">
                  <dt className="text-gray-400 mb-1">付属設備・対応環境</dt>
                 <dd>
                   <p className="text-xs text-gray-500">
                     設備情報は未登録です
                   </p>
                 </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* 右側：固定アクションパネル */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6 sticky top-20">
            <div className="space-y-2">
              <span className="text-xs text-gray-400 font-medium">出展検討中の方へ</span>
              <h3 className="text-base font-bold text-gray-900">このショールームに申請する</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                申請承認後、担当スタッフより搬入日程等の事前お打ち合わせのご連絡を差し上げます。
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <Link
                href="/apply"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#0e2147] text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition shadow-sm"
              >
                <span>この枠で展示申請へ進む</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
              <p className="text-[10px] text-gray-400 text-center">
                ※ 申請完了時点では予約確定とはなりません
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}