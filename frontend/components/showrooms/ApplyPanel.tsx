"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type ApplyPanelProps = {
  showroomId: number;
};

export default function ApplyPanel({
  showroomId,
}: ApplyPanelProps) {
  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <p className="text-sm font-semibold text-gray-500">
        出展検討中の方へ
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900 leading-snug">
        このショールームに申請する
      </h2>

      <p className="mt-4 text-sm leading-7 text-gray-500">
        申請承認後、担当スタッフより搬入日程等の
        お打ち合わせのご連絡を差し上げます。
      </p>

      <Link
        href={`/apply?showroomId=${showroomId}`}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0e2147] px-6 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
      >
        この枠で展示申請へ進む
        <ArrowUpRight className="h-4 w-4" />
      </Link>

      <p className="mt-5 text-center text-xs leading-5 text-gray-400">
        ※ 申請完了時点では予約確定とはなりません。
        <br />
        担当者からのご連絡後に正式確定となります。
      </p>

    </aside>
  );
}