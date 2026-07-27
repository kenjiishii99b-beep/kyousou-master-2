"use client";

import Link from "next/link";
import { ArrowLeft, Save, Send } from "lucide-react";

type SubmitSectionProps = {
  isSubmitting?: boolean;
};

export default function SubmitSection({
  isSubmitting = false,
}: SubmitSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">

        {/* 左側 */}
        <Link
          href="/showrooms"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-gray-300
            px-6
            py-3
            text-sm
            font-semibold
            text-gray-700
            transition
            hover:bg-gray-100
          "
        >
          <ArrowLeft className="h-4 w-4" />
          ショールームへ戻る
        </Link>

        {/* 右側 */}
        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              border-gray-300
              bg-white
              px-6
              py-3
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-100
            "
          >
            <Save className="h-4 w-4" />
            下書き保存
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-[#0E2147]
              px-8
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#16315f]
              disabled:cursor-not-allowed
              disabled:bg-gray-400
            "
          >
            <Send className="h-4 w-4" />

            {isSubmitting
              ? "送信中..."
              : "展示申請する"}
          </button>

        </div>

      </div>

    </section>
  );
}