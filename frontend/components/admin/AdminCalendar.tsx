"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ExhibitionItem, STATUS_COLOR, STATUS_LABEL, ExhibitionStatus } from "@/types/exhibition";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

interface AdminCalendarProps {
  exhibitions: ExhibitionItem[];
  currentMonth: Date;
  onMonthChange: (next: Date) => void;
  onSelect: (item: ExhibitionItem) => void;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function buildWeeks(monthStart: Date): Date[][] {
  const firstOfMonth = new Date(monthStart.getFullYear(), monthStart.getMonth(), 1);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - firstOfMonth.getDay());

  const weeks: Date[][] = [];
  const cursor = new Date(gridStart);
  for (let w = 0; w < 6; w++) {
    const week: Date[] = [];
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

interface Bar {
  item: ExhibitionItem;
  startCol: number;
  endCol: number;
  lane: number;
}

function assignLanes(week: Date[], exhibitions: ExhibitionItem[]): Bar[] {
  const weekStart = week[0];
  const weekEnd = week[6];

  const overlapping = exhibitions
    .filter((ex) => {
      const from = startOfDay(new Date(ex.periodFrom));
      const to = startOfDay(new Date(ex.periodTo));
      return from <= weekEnd && to >= weekStart;
    })
    .sort((a, b) => a.periodFrom.localeCompare(b.periodFrom));

  const lanes: Date[][] = [];
  const bars: Bar[] = [];

  for (const ex of overlapping) {
    const from = startOfDay(new Date(ex.periodFrom));
    const to = startOfDay(new Date(ex.periodTo));
    const startCol = from < weekStart ? 0 : from.getDay();
    const endCol = to > weekEnd ? 6 : to.getDay();

    let lane = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const used = bars.some(
        (b) => b.lane === lane && !(endCol < b.startCol || startCol > b.endCol)
      );
      if (!used) break;
      lane += 1;
    }
    lanes[lane] = lanes[lane] || [];
    bars.push({ item: ex, startCol, endCol, lane });
  }

  return bars;
}

export function AdminCalendar({
  exhibitions,
  currentMonth,
  onMonthChange,
  onSelect,
}: AdminCalendarProps) {
  const weeks = buildWeeks(currentMonth);
  const today = startOfDay(new Date());

  const goPrev = () =>
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const goNext = () =>
    onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const goToday = () => onMonthChange(new Date(today.getFullYear(), today.getMonth(), 1));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900">
            {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
          </span>
          <button
            type="button"
            onClick={goPrev}
            className="rounded p-1 text-slate-500 hover:bg-slate-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={goToday}
            className="rounded border border-slate-300 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            今日
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded p-1 text-slate-500 hover:bg-slate-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
          {(Object.keys(STATUS_LABEL) as ExhibitionStatus[]).map((status) => (
            <span key={status} className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${STATUS_COLOR[status].dot}`} />
              {STATUS_LABEL[status]}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-slate-400">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      <div className="space-y-1 rounded-lg border border-slate-200 p-1">
        {weeks.map((week, weekIndex) => {
          const bars = assignLanes(week, exhibitions);
          const maxLane = bars.reduce((max, b) => Math.max(max, b.lane), -1);

          return (
            <div
              key={weekIndex}
              className="grid grid-cols-7 gap-x-0 gap-y-0.5"
              style={{ gridTemplateRows: `auto repeat(${maxLane + 1}, 18px)` }}
            >
              {week.map((day, dayIndex) => {
                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                const isToday = startOfDay(day).getTime() === today.getTime();
                return (
                  <div
                    key={dayIndex}
                    style={{ gridColumn: dayIndex + 1, gridRow: 1 }}
                    className={`px-1 pb-0.5 text-right text-[11px] ${
                      isCurrentMonth ? "text-slate-700" : "text-slate-300"
                    }`}
                  >
                    <span
                      className={
                        isToday
                          ? "inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-white"
                          : ""
                      }
                    >
                      {day.getDate()}
                    </span>
                  </div>
                );
              })}

              {bars.map((bar) => (
                <button
                  key={bar.item.id}
                  type="button"
                  onClick={() => onSelect(bar.item)}
                  style={{
                    gridColumn: `${bar.startCol + 1} / ${bar.endCol + 2}`,
                    gridRow: bar.lane + 2,
                  }}
                  className={`truncate rounded px-1.5 text-left text-[10px] font-medium ${STATUS_COLOR[bar.item.status].bar}`}
                  title={bar.item.showroomName}
                >
                  {bar.item.showroomName}
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
