import { NoticeItem, EventInfo } from "@/types/notice";

const TYPE_LABEL: Record<NoticeItem["type"], string> = {
  notice: "お知らせ",
  event: "イベント",
};

export function NoticeList({
  notices,
  event,
}: {
  notices: NoticeItem[];
  event: EventInfo | null;
}) {
  return (
    <section className="grid gap-6 border-t border-slate-100 py-10 md:grid-cols-[1fr_320px]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">お知らせ</h2>
          <a href="/notices" className="text-xs text-blue-600 hover:underline">
            すべてのお知らせを見る
          </a>
        </div>
        <ul className="divide-y divide-slate-100 rounded-lg border border-slate-100">
          {notices.map((notice) => (
            <li key={notice.id} className="flex items-center gap-3 px-4 py-3 text-sm">
              <span
                className={`shrink-0 rounded px-2 py-0.5 text-[11px] font-medium ${
                  notice.type === "event"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {TYPE_LABEL[notice.type]}
              </span>
              <span className="flex-1 truncate text-slate-700">{notice.title}</span>
              <span className="shrink-0 text-xs text-slate-400">{notice.date}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">イベント情報</h2>
          <a href="/notices?type=event" className="text-xs text-blue-600 hover:underline">
            すべて見る
          </a>
        </div>
        {event ? (
          <div className="rounded-lg border border-slate-100 p-4">
            <p className="text-xs text-slate-400">{event.date}</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{event.title}</p>
            <p className="mt-2 text-xs text-slate-600">
              {event.time} ／ {event.format}
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-400">現在予定されているイベントはありません。</p>
        )}
      </div>
    </section>
  );
}
