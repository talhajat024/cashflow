import type { BalanceChartSeries } from "../../types/dashboard.types";

const normalizeY = (
  value: number,
  max: number,
  top: number,
  bottom: number
): number => {
  return bottom - (value / max) * (bottom - top);
};

type BalanceChartProps = {
  series: BalanceChartSeries[];
  activeMonth: number;
};

export function BalanceChart({ series, activeMonth }: BalanceChartProps) {
  const VIEWBOX_WIDTH = 720;
  const VIEWBOX_HEIGHT = 280;

  const PADDING_LEFT = 60;
  const PADDING_RIGHT = 20;
  const CHART_TOP = 20;
  const CHART_BOTTOM = 220;

  const MONTHS = series[0]?.data.length ?? 0;

  const CHART_WIDTH =
    VIEWBOX_WIDTH - PADDING_LEFT - PADDING_RIGHT;

  const STEP_X = MONTHS > 1 ? CHART_WIDTH / (MONTHS - 1) : 0;

  const getX = (index: number) =>
    PADDING_LEFT + index * STEP_X;

  const activeX = getX(activeMonth);

  const allValues = series.flatMap(s =>
    s.data.map(d => d.amount)
  );

  const maxValue = Math.max(...allValues, 1);

  return (
    <svg
      width="100%"
      height="280"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
    >
      {/* ACTIVE COLUMN */}
      <rect
        x={activeX - STEP_X / 2}
        y={CHART_TOP}
        width={STEP_X}
        height={CHART_BOTTOM - CHART_TOP}
        rx="12"
        fill="#2563EB"
        opacity="0.04"
      />

      {/* GRID */}
      {Array.from({ length: MONTHS }).map((_, i) => (
        <line
          key={i}
          x1={getX(i)}
          y1={CHART_TOP}
          x2={getX(i)}
          y2={CHART_BOTTOM}
          stroke="#E5E7EB"
          strokeOpacity="0.6"
        />
      ))}

      {/* LINES */}
      {series.map((s) => {
        const path = s.data
          .map((d, i) => {
            const x = getX(i);
            const y = normalizeY(d.amount, maxValue, CHART_TOP, CHART_BOTTOM);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");

        const color =
          s.name.toLowerCase() === "income"
            ? "#2563EB"
            : "#FB923C";

        return (
          <path
            key={s.name}
            d={path}
            stroke={color}
            strokeWidth="2.5"
            fill="none"
          />
        );
      })}

      {/* MONTH LABELS */}
      {series[0]?.data.map((m, i) => (
        <text
          key={m.month}
          x={getX(i)}
          y="250"
          fontSize="12"
          fill={i === activeMonth ? "#2563EB" : "#9CA3AF"}
          fontWeight={i === activeMonth ? "600" : "400"}
          textAnchor="middle"
        >
          {m.monthLabel}
        </text>
      ))}
    </svg>
  );
}
