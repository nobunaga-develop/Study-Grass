import { useMemo, useState } from 'react';
import type { StudyLog } from '../types';
import { buildCalendarDays, buildMonthLabels, type DayCell } from '../utils/calendar';

const CELL_SIZE = 13;
const CELL_GAP = 3;
const CELL_STEP = CELL_SIZE + CELL_GAP;

type Tooltip = { cell: DayCell; x: number; y: number };

type Props = { logs: StudyLog[] };

const DAY_NAMES = ['月', '', '水', '', '金', '', '日'];

export default function GrassCalendar({ logs }: Props) {
  const days = useMemo(() => buildCalendarDays(logs), [logs]);
  const monthLabels = useMemo(() => buildMonthLabels(days), [days]);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const numWeeks = Math.ceil(days.length / 7);
  const gridWidth = numWeeks * CELL_STEP - CELL_GAP;

  return (
    <section className="card grass-calendar">
      <h2 className="section-title">学習の記録</h2>
      <div className="calendar-scroll-wrapper">
        <div className="calendar-layout">
          {/* 曜日ラベル列 */}
          <div className="day-label-col" style={{ marginTop: CELL_STEP }}>
            {DAY_NAMES.map((name, i) => (
              <div
                key={i}
                className="day-label"
                style={{ height: CELL_STEP, lineHeight: `${CELL_SIZE}px` }}
              >
                {name}
              </div>
            ))}
          </div>

          {/* 月ラベル + 草グリッド */}
          <div style={{ position: 'relative' }}>
            <div
              className="month-label-row"
              style={{ height: CELL_STEP, position: 'relative', width: gridWidth }}
            >
              {monthLabels.map(({ label, colIndex }) => (
                <span
                  key={label + colIndex}
                  className="month-label"
                  style={{ position: 'absolute', left: colIndex * CELL_STEP }}
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              className="grass-grid"
              style={{
                display: 'grid',
                gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
                gridAutoFlow: 'column',
                gridAutoColumns: `${CELL_SIZE}px`,
                gap: `${CELL_GAP}px`,
              }}
            >
              {days.map((cell) => (
                <div
                  key={cell.date}
                  className={`grass-cell level-${cell.level}`}
                  onMouseEnter={(e) => setTooltip({ cell, x: e.clientX, y: e.clientY })}
                  onMouseLeave={() => setTooltip(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTooltip((prev) =>
                      prev?.cell.date === cell.date ? null : { cell, x: e.clientX, y: e.clientY }
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 凡例 */}
        <div className="grass-legend">
          <span className="legend-label">少</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <div key={level} className={`grass-cell level-${level}`} style={{ width: CELL_SIZE, height: CELL_SIZE }} />
          ))}
          <span className="legend-label">多</span>
        </div>
      </div>

      {/* ツールチップ */}
      {tooltip && (
        <div
          className="grass-tooltip"
          style={{ left: tooltip.x + 12, top: tooltip.y - 52 }}
        >
          <span className="tooltip-date">{tooltip.cell.date}</span>
          <span className="tooltip-count">
            {tooltip.cell.count === 0 ? '学習なし' : `${tooltip.cell.count}件の記録`}
          </span>
        </div>
      )}
    </section>
  );
}