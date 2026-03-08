import type { BalanceChartSeries } from "../../types/dashboard.types";

const MONTH_LABELS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const TOTAL_MONTHS = 12;

const SERIES_CONFIG = {
  income:   { color: "#1D4ED8", isPrimary: true  },
  spending: { color: "#22D3EE", isPrimary: false },
};

type BalanceChartProps = {
  series: BalanceChartSeries[];
  activeMonth: number;
};

const normalizeY = (value: number, max: number, top: number, bottom: number) =>
  bottom - (value / max) * (bottom - top);

function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dx = curr.x - prev.x;
    d += ` C ${prev.x + dx * 0.45} ${prev.y}, ${prev.x + dx * 0.55} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function BalanceChart({ series, activeMonth }: BalanceChartProps) {
  const VIEWBOX_WIDTH  = 720;
  const VIEWBOX_HEIGHT = 280;
  const PADDING_LEFT   = 60;
  const PADDING_RIGHT  = 20;
  const CHART_TOP      = 20;
  const CHART_BOTTOM   = 220;
  const CHART_WIDTH    = VIEWBOX_WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const STEP_X         = CHART_WIDTH / (TOTAL_MONTHS - 1);
  const getX           = (index: number) => PADDING_LEFT + index * STEP_X;

  const alignedSeries = series.map(s => {
    const values: (number | null)[] = Array(TOTAL_MONTHS).fill(null);

    s.data.forEach((point) => {
      const monthIndex = MONTH_LABELS.indexOf(point.monthLabel);
      if (monthIndex !== -1) {
        values[monthIndex] = point.amount;
      }
    });

    const key = s.name.toLowerCase() as "income" | "spending";
    return { name: s.name, config: SERIES_CONFIG[key], values };
  });

  const lastPoint        = series[0]?.data.at(-1);
  const activeMonthIndex = lastPoint
    ? MONTH_LABELS.indexOf(lastPoint.monthLabel)
    : activeMonth;

  const firstPoint = series[0]?.data[0];
  const startIndex = firstPoint
    ? MONTH_LABELS.indexOf(firstPoint.monthLabel)
    : 0;

  const allValues = alignedSeries
    .flatMap(s => s.values)
    .filter((v): v is number => v !== null);

  const maxValue    = Math.max(...allValues, 1);
  const activeX     = getX(activeMonthIndex);
  const incomeSeries = alignedSeries.find(s => s.config.isPrimary);
  const activeIncomeValue = incomeSeries?.values[activeMonthIndex];

  const activeDotY =
    activeIncomeValue !== null && activeIncomeValue !== undefined
      ? normalizeY(activeIncomeValue, maxValue, CHART_TOP, CHART_BOTTOM)
      : null;

  return (
    <svg
      width="100%"
      height="280"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
    >
      <defs>
        <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1D4ED8" stopOpacity="0.28" />
          <stop offset="25%"  stopColor="#1D4ED8" stopOpacity="0.18" />
          <stop offset="55%"  stopColor="#1D4ED8" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0"    />
        </linearGradient>
        <linearGradient id="spotlightGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1D4ED8" stopOpacity="0.14" />
          <stop offset="55%"  stopColor="#1D4ED8" stopOpacity="0.10" />
          <stop offset="70%"  stopColor="#1D4ED8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0"    />
        </linearGradient>
      </defs>

      {/* Y Axis Labels */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((t, i) => {
        const value = Math.round(maxValue * t);
        const y = normalizeY(value, maxValue, CHART_TOP, CHART_BOTTOM);
        return (
          <text key={i} x="20" y={y + 4} fontSize="12" fill="#9CA3AF">
            {`${Math.round(value / 1000)}k`}
          </text>
        );
      })}

      {/* Vertical Grid Lines */}
      {MONTH_LABELS.map((_, i) => (
        <line
          key={i}
          x1={getX(i)} y1={CHART_TOP}
          x2={getX(i)} y2={CHART_BOTTOM}
          stroke="#E5E7EB" strokeOpacity="0.35"
        />
      ))}

      {/* Spotlight */}
      {activeDotY !== null && (
        <path
          d={`
            M ${activeX - STEP_X / 2} ${activeDotY + 16}
            L ${activeX - STEP_X / 2} ${activeDotY - 90}
            Q ${activeX} ${activeDotY - 115}
              ${activeX + STEP_X / 2} ${activeDotY - 90}
            L ${activeX + STEP_X / 2} ${activeDotY + 16}
            Z
          `}
          fill="url(#spotlightGradient)"
        />
      )}

      {/* Lines + Fill */}
      {alignedSeries.map(s => {
        const points = s.values
          .map((value, i) =>
            value === null ? null : {
              x: getX(i),
              y: normalizeY(value, maxValue, CHART_TOP, CHART_BOTTOM),
            }
          )
          .filter(Boolean) as { x: number; y: number }[];

        const path = buildSmoothPath(points);

        return (
          <g key={s.name}>
            {s.config.isPrimary && (
              <path
                d={`${path} L ${points.at(-1)?.x} ${CHART_BOTTOM} L ${points[0]?.x} ${CHART_BOTTOM} Z`}
                fill="url(#incomeFill)"
              />
            )}
            <path
              d={path}
              stroke={s.config.color}
              strokeWidth="2.6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* Dot */}
      {activeDotY !== null && (
        <circle
          cx={activeX} cy={activeDotY}
          r="5"
          fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2"
        />
      )}

      {/* X Axis Labels */}
      {MONTH_LABELS.map((label, i) => {
        const isActive  = i === activeMonthIndex;
        const isInRange = i >= startIndex && i <= activeMonthIndex;
        return (
          <text
            key={label}
            x={getX(i)} y="250"
            fontSize="12"
            fill={isActive ? "#1D4ED8" : isInRange ? "#6B7280" : "#D1D5DB"}
            fontWeight={isActive ? "600" : "400"}
            textAnchor="middle"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}