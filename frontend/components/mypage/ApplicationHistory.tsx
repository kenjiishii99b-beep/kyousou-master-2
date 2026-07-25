import Link from "next/link";

import {
  ApplicationHistoryItem,
  STATUS_LABEL,
} from "@/types/mypage";

const STATUS_STYLE: Record<
  ApplicationHistoryItem["status"],
  string
> = {
  pending: "bg-blue-50 text-blue-700",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-50 text-red-700",
  exhibiting: "bg-emerald-50 text-emerald-700",
  finished: "bg-slate-100 text-slate-500",
  cancelled: "bg-orange-50 text-orange-700",
};

export function ApplicationHistory({
  items,
}: {
  items: ApplicationHistoryItem[];
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
        {
          "\u307e\u3060\u5c55\u793a\u7533\u8acb\u306e\u5c65\u6b74\u304c\u3042\u308a\u307e\u305b\u3093\u3002"
        }

        <Link
          href="/showrooms"
          className="ml-1 text-blue-600 hover:underline"
        >
          {
            "\u30b7\u30e7\u30fc\u30eb\u30fc\u30e0\u3092\u63a2\u3059"
          }
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-start justify-between gap-4 px-4 py-4"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-slate-900">
              {item.productName ||
                "\u88fd\u54c1\u540d\u672a\u767b\u9332"}
            </p>

            <Link
              href={`/showrooms/${item.showroomId}`}
              className="mt-1 block truncate text-sm text-slate-600 hover:underline"
            >
              {item.showroomName}
            </Link>

            <p className="mt-1 text-xs text-slate-500">
              {item.periodFrom}
              {" \uff5e "}
              {item.periodTo}

              {item.categories.length > 0 && (
                <>
                  {" \u30fb "}
                  {item.categories.join("\u3001")}
                </>
              )}
            </p>

            {item.status === "rejected" &&
              item.rejectionReason && (
                <div className="mt-2 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
                  <span className="font-medium">
                    {"\u5374\u4e0b\u7406\u7531\uff1a"}
                  </span>
                  {item.rejectionReason}
                </div>
              )}
          </div>

          <span
            className={`shrink-0 rounded px-2 py-1 text-xs font-medium ${
              STATUS_STYLE[item.status]
            }`}
          >
            {STATUS_LABEL[item.status]}
          </span>
        </li>
      ))}
    </ul>
  );
}
