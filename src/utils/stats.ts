import type { StudyLog } from '../types';

function toDateStr(d: Date): string {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-');
}

function getUniqueDates(logs: StudyLog[]): string[] {
  return [...new Set(logs.map((l) => l.date))].sort();
}

export function calcCurrentStreak(logs: StudyLog[]): number {
  const dateSet = new Set(logs.map((l) => l.date));
  if (dateSet.size === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = toDateStr(today);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = toDateStr(yesterday);

  let start: Date;
  if (dateSet.has(todayStr)) {
    start = new Date(today);
  } else if (dateSet.has(yesterdayStr)) {
    start = new Date(yesterday);
  } else {
    return 0;
  }

  let streak = 0;
  const cur = new Date(start);
  while (dateSet.has(toDateStr(cur))) {
    streak++;
    cur.setDate(cur.getDate() - 1);
  }
  return streak;
}

export function calcLongestStreak(logs: StudyLog[]): number {
  const dates = getUniqueDates(logs);
  if (dates.length === 0) return 0;

  let max = 0;
  let cur = 0;
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      cur = 1;
    } else {
      const prev = new Date(dates[i - 1]);
      const next = new Date(dates[i]);
      const diff = (next.getTime() - prev.getTime()) / 86400000;
      cur = diff === 1 ? cur + 1 : 1;
    }
    if (cur > max) max = cur;
  }
  return max;
}

export function calcStudyDaysThisMonth(logs: StudyLog[]): number {
  const now = new Date();
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return new Set(logs.filter((l) => l.date.startsWith(prefix)).map((l) => l.date)).size;
}

export function calcTotalLogs(logs: StudyLog[]): number {
  return logs.length;
}