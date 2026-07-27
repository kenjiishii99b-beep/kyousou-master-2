"use client";

import ApplyPanel from "@/components/showrooms/ApplyPanel";
import BackButton from "@/components/showrooms/BackButton";
import FacilitySection from "@/components/showrooms/FacilitySection";
import ShowroomHeader from "@/components/showrooms/ShowroomHeader";
import ShowroomImage from "@/components/showrooms/ShowroomImage";
import SummarySection from "@/components/showrooms/SummarySection";

export default function ShowroomDetailPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
      {/* 戻る */}
      <BackButton />

      {/* ヘッダー */}
      <ShowroomHeader
        category="住宅設備・インテリア総合"
        name="Techzeron Startup Lab 札幌"
        address="北海道札幌市中央区北4条西4-1-1"
        availableFrom="2026年8月1日"
        available={true}
      />

      {/* 画像 + 申請 */}
      <section className="grid gap-8 lg:grid-cols-12">
        {/* 左側 */}
        <div className="lg:col-span-8">
          <ShowroomImage imageUrl="" alt="Techzeron Startup Lab 札幌" />
        </div>

        {/* 右側 */}
        <div className="lg:col-span-4">
          <ApplyPanel showroomId={1} />
        </div>
      </section>

      {/* スペース概要 */}
      <SummarySection
        summary={`北海道エリア最大級の住設ショールームです。

キッチン・浴室・洗面・トイレなど幅広い展示を行っています。

スタートアップ企業のPoCや新商品の展示実績も多数あり、
一般来場者へのアンケート取得にも対応しています。

企業向け展示会・イベント利用も可能です。`}
      />

      {/* ブース仕様・設備 */}
      <FacilitySection
        boothType="オープン展示"
        boothSize="幅3.0m × 奥行2.5m"
        power="100V・15A ×2"
        wifi="利用可能"
        parking="搬入車2台まで"
        carryIn="平日9:00～17:00"
      />
    </main>
  );
}
