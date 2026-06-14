import type { StudyLog } from '../types';

export type DayCell = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type MonthLabel = {
  label: string;
  colIndex: number;
};

const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

function toDateStr(d: Date): string {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');
}

function countToLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  return 4;
}

export function buildCalendarDays(logs: StudyLog[]): DayCell[] {
  const countMap: Record<string, number> = {};
  for (const log of logs) {
    countMap[log.date] = (countMap[log.date] ?? 0) + 1;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const rangeStart = new Date(today);
  rangeStart.setDate(today.getDate() - 90);

  // Align to Monday (Sun=0 → go back 6 days, Mon=1 → 0, Tue=2 → 1, ...)
  const dow = rangeStart.getDay();
  const daysToMon = dow === 0 ? 6 : dow - 1;
  rangeStart.setDate(rangeStart.getDate() - daysToMon);

  const days: DayCell[] = [];
  const cur = new Date(rangeStart);

  while (cur <= today) {
    const dateStr = toDateStr(cur);
    const count = countMap[dateStr] ?? 0;
    days.push({ date: dateStr, count, level: countToLevel(count) });
    cur.setDate(cur.getDate() + 1);
  }

  return days;
}

export function buildMonthLabels(days: DayCell[]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let lastMonth = '';

  days.forEach((day, i) => {
    const month = day.date.slice(5, 7);
    if (month !== lastMonth) {
      labels.push({ label: MONTH_NAMES[parseInt(month, 10) - 1], colIndex: Math.floor(i / 7) });
      lastMonth = month;
    }
  });

  return labels;
}