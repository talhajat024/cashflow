import type { BalanceChartSeries } from "../../types/dashboard.types";

/* ------------------ CONSTANTS ------------------ */

const MONTH_LABELS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const TOTAL_MONTHS = 12;

const SERIES_CONFIG = {
  income: {
    color: "#1D4ED8",
    isPrimary: true,
  },
  spending: {
    color: "#22D3EE",
    isPrimary: false,
  },
};

/* ------------------ TYPES ------------------ */

type BalanceChartProps = {
  series: BalanceChartSeries[];
  activeMonth: number; // 0-based
};

/* ------------------ HELPERS ------------------ */

const normalizeY = (
  value: number,
  max: number,
  top: number,
  bottom: number
) => bottom - (value / max) * (bottom - top);

function buildSmoothPath(points: { x: number; y: number }[]) {

  if (points.length < 2) return "";

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dx = curr.x - prev.x;

    d += `
      C ${prev.x + dx * 0.45} ${prev.y},
        ${prev.x + dx * 0.55} ${curr.y},
        ${curr.x} ${curr.y}
    `;
  }

  return d;
}

/* ------------------ COMPONENT ------------------ */

export function BalanceChart({ series, activeMonth }: BalanceChartProps) {
  const VIEWBOX_WIDTH = 720;
  const VIEWBOX_HEIGHT = 280;

  const PADDING_LEFT = 60;
  const PADDING_RIGHT = 20;
  const CHART_TOP = 20;
  const CHART_BOTTOM = 220;

  const CHART_WIDTH =
    VIEWBOX_WIDTH - PADDING_LEFT - PADDING_RIGHT;

  const STEP_X = CHART_WIDTH / (TOTAL_MONTHS - 1);

  const getX = (index: number) =>
    PADDING_LEFT + index * STEP_X;

  /* ---- Map backend range into 12 months ---- */

  const rangeInMonths = series[0].data.length;
  const startIndex = activeMonth - (rangeInMonths - 1);

  const alignedSeries = series.map(s => {
    const values: (number | null)[] = Array(TOTAL_MONTHS).fill(null);

    s.data.forEach((point, i) => {
      const monthIndex = startIndex + i;
      if (monthIndex >= 0 && monthIndex < TOTAL_MONTHS) {
        values[monthIndex] = point.amount;
      }
    });

    const key = s.name.toLowerCase() as "income" | "spending";

    return {
      name: s.name,
      config: SERIES_CONFIG[key],
      values,
    };
  });

  const allValues = alignedSeries
    .flatMap(s => s.values)
    .filter((v): v is number => v !== null);

  const maxValue = Math.max(...allValues, 1);

  const activeX = getX(activeMonth);

  const incomeSeries = alignedSeries.find(s => s.config.isPrimary);
  const activeIncomeValue = incomeSeries?.values[activeMonth];

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
      {/* ===== DEFINITIONS ===== */}
      <defs>
        {/* Income area fill */}
        <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.28" />
          <stop offset="25%" stopColor="#1D4ED8" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#1D4ED8" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
        </linearGradient>

        {/* Spotlight gradient (top-heavy, quick fade below) */}
        <linearGradient id="spotlightGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.14" />
          <stop offset="55%" stopColor="#1D4ED8" stopOpacity="0.10" />
          <stop offset="70%" stopColor="#1D4ED8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* ===== Y AXIS LABELS (NO HORIZONTAL LINES) ===== */}
      {[0.2, 0.4, 0.6, 0.8, 1].map((t, i) => {
        const value = Math.round(maxValue * t);
        const y = normalizeY(value, maxValue, CHART_TOP, CHART_BOTTOM);

        return (
          <text
            key={i}
            x="20"
            y={y + 4}
            fontSize="12"
            fill="#9CA3AF"
          >
            {`${Math.round(value / 1000)}k`}
          </text>
        );
      })}

      {/* ===== VERTICAL MONTH GRID LINES ===== */}
      {MONTH_LABELS.map((_, i) => (
        <line
          key={i}
          x1={getX(i)}
          y1={CHART_TOP}
          x2={getX(i)}
          y2={CHART_BOTTOM}
          stroke="#E5E7EB"
          strokeOpacity="0.35"
        />
      ))}

      {/* ===== SPOTLIGHT (rounded top, flat bottom, slight glow below dot) ===== */}
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

      {/* ===== LINES + FILL ===== */}
      {alignedSeries.map(s => {
        const points = s.values
          .map((value, i) =>
            value === null
              ? null
              : {
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
                d={`${path} L ${
                  points.at(-1)?.x
                } ${CHART_BOTTOM} L ${
                  points[0]?.x
                } ${CHART_BOTTOM} Z`}
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

      {/* ===== DOT (Income only) ===== */}
      {activeDotY !== null && (
        <circle
          cx={activeX}
          cy={activeDotY}
          r="5"
          fill="#1D4ED8"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
      )}

      {/* ===== X AXIS MONTH LABELS ===== */}
      {MONTH_LABELS.map((label, i) => {
        const isActive = i === activeMonth;
        const isInRange = i >= startIndex && i <= activeMonth;

        return (
          <text
            key={label}
            x={getX(i)}
            y="250"
            fontSize="12"
            fill={
              isActive
                ? "#1D4ED8"
                : isInRange
                ? "#6B7280"
                : "#D1D5DB"
            }
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
