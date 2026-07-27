"use client";

import { FileUp, FileText } from "lucide-react";

type AttachmentSectionProps = {
  required?: boolean;
};

export default function AttachmentSection({
  required = false,
}: AttachmentSectionProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="text-xl font-bold text-gray-900">
        添付資料
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        商品カタログ・提案資料・商品画像などを添付してください。
      </p>

      <div className="mt-8">

        <label
          htmlFor="attachment"
          className="
            flex
            min-h-[220px]
            w-full
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            border-gray-300
            bg-gray-50
            transition
            hover:border-blue-500
            hover:bg-blue-50
          "
        >
          <FileUp className="h-12 w-12 text-gray-400" />

          <p className="mt-4 text-lg font-semibold text-gray-700">
            ファイルをドラッグ＆ドロップ
          </p>

          <p className="mt-2 text-sm text-gray-500">
            またはクリックして選択
          </p>

          <p className="mt-6 text-xs text-gray-400">
            PDF / Word / Excel / PowerPoint / JPG / PNG
          </p>

          <input
            id="attachment"
            type="file"
            multiple
            required={required}
            className="hidden"
          />
        </label>

      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-4">

        <div className="flex items-center gap-2">

          <FileText className="h-5 w-5 text-gray-500" />

          <span className="font-medium">
            添付可能なファイル
          </span>

        </div>

        <ul className="mt-3 space-y-2 text-sm text-gray-600">
          <li>・PDF</li>
          <li>・Word (.doc / .docx)</li>
          <li>・Excel (.xls / .xlsx)</li>
          <li>・PowerPoint (.ppt / .pptx)</li>
          <li>・JPEG / PNG</li>
          <li>・1ファイル最大20MB</li>
        </ul>

      </div>

    </section>
  );
}