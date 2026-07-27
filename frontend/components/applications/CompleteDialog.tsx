"use client";

import Link from "next/link";
import { CheckCircle2, FileText, Home } from "lucide-react";

type CompleteDialogProps = {
  open: boolean;
  applicationNo?: string;
  onClose: () => void;
};

export default function CompleteDialog({
  open,
  applicationNo,
  onClose,
}: CompleteDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">

        {/* アイコン */}
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* タイトル */}
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
          展示申請を受け付けました
        </h2>

        {/* 説明 */}
        <p className="mt-4 text-center text-sm leading-7 text-gray-600">
          ご申請ありがとうございます。
          <br />
          内容を確認後、担当者よりご連絡いたします。
        </p>

        {/* 受付番号 */}
        {applicationNo && (
          <div className="mt-8 rounded-xl bg-blue-50 p-5">

            <p className="text-xs font-medium text-gray-500">
              受付番号
            </p>

            <p className="mt-2 text-xl font-bold tracking-wider text-blue-700">
              {applicationNo}
            </p>

          </div>
        )}

        {/* ボタン */}
        <div className="mt-8 grid gap-3">

          <Link
            href="/mypage"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#0E2147]
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#16315f]
            "
          >
            <Home className="h-5 w-5" />
            マイページへ
          </Link>

          <Link
            href="/showrooms"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-gray-300
              px-6
              py-3
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-100
            "
          >
            <FileText className="h-5 w-5" />
            ショールーム一覧へ
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              border
              border-gray-300
              px-6
              py-3
              text-sm
              font-medium
              text-gray-600
              transition
              hover:bg-gray-100
            "
          >
            閉じる
          </button>

        </div>

      </div>

    </div>
  );
}