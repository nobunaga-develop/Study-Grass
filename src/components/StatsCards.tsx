import type { StudyLog } from '../types';
import {
  calcCurrentStreak,
  calcLongestStreak,
  calcStudyDaysThisMonth,
  calcTotalLogs,
} from '../utils/stats';

type Props = { logs: StudyLog[] };

export default function StatsCards({ logs }: Props) {
  const stats = [
    { label: '連続学習日数', value: `${calcCurrentStreak(logs)}日`, sub: '現在の連続記録' },
    { label: '最長連続記録', value: `${calcLongestStreak(logs)}日`, sub: 'これまでの最高' },
    { label: '今月の学習日数', value: `${calcStudyDaysThisMonth(logs)}日`, sub: '今月の実績' },
    { label: '総学習ログ数', value: `${calcTotalLogs(logs)}件`, sub: '累計の記録数' },
  ];

  return (
    <div className="stats-grid">
      {stats.map((s) => (
        <div key={s.label} className="card stat-card">
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
          <div className="stat-sub">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}