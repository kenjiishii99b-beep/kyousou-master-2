"use client";

import Link from "next/link";

const notices = [
{
id: 1,
category: "お知らせ",
title: "「Techzeron Startup Lab」サービス正式リリースのお知らせ",
date: "2024/06/01",
color: "blue",
},
{
id: 2,
category: "イベント",
title: "【7/10開催】スタートアップ向けショールーム活用セミナー",
date: "2024/05/28",
color: "amber",
},
{
id: 3,
category: "お知らせ",
title: "ショールーム「名古屋」追加オープンのお知らせ",
date: "2024/05/15",
color: "blue",
},
{
id: 4,
category: "お知らせ",
title: "システムメンテナンスのお知らせ（6/8 0:00〜6:00）",
date: "2024/05/10",
color: "blue",
},
];

export default function NoticeSection() {
return (
<section className="space-y-4">
  <div className="flex items-center justify-between">
    <h2 className="text-xl font-bold text-gray-900">
      お知らせ
    </h2>

    <Link href="/news" className="text-xs text-blue-600 hover:underline">
    すべてのお知らせを見る
    </Link>
  </div>

  <div className="divide-y divide-gray-100 border-y border-gray-100">
    {notices.map((notice) => (
    <div key={notice.id} className="flex items-center justify-between gap-4 py-3.5 text-xs">
      <div className="flex min-w-0 items-center gap-3">
        <span className={`flex-shrink-0 rounded px-2.5 py-1 font-medium ${ notice.color==="blue"
          ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600" }`}>
          {notice.category}
        </span>

        <span className="truncate font-medium text-gray-800">
          {notice.title}
        </span>
      </div>

      <span className="flex-shrink-0 text-gray-400">
        {notice.date}
      </span>
    </div>
    ))}
  </div>
</section>
);
}