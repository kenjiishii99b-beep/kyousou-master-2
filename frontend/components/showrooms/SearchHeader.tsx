"use client";

type SearchHeaderProps = {
  total: number;
};

export default function SearchHeader({
  total,
}: SearchHeaderProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">
          検索結果：
          <span className="ml-1 text-[#0e2147]">
            {total}件
          </span>
        </h2>

        <span className="text-sm text-gray-500">
          条件に一致したショールーム
        </span>
      </div>
    </div>
  );
}