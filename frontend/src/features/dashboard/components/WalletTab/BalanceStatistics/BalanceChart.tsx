
// features/dashboard/components/WalletTab/BalanceStatistics/BalanceChart.tsx
import type { BalanceStatPoint } from "../../../types/wallet.types";

type BalanceChartProps = {
  data: BalanceStatPoint[];
  activeMonth: string;
  activeAmount: number;
  changePercent: number;
  isPositive: boolean;
};

const VIEWBOX_WIDTH  = 720;
const VIEWBOX_HEIGHT = 260;
const PADDING_LEFT   = 50;
const PADDING_RIGHT  = 20;
const CHART_TOP      = 20;
const CHART_BOTTOM   = 200;
const CHART_WIDTH    = VIEWBOX_WIDTH - PADDING_LEFT - PADDING_RIGHT;

function buildSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const dx   = curr.x - prev.x;
    d += ` C ${prev.x + dx * 0.45} ${prev.y}, ${prev.x + dx * 0.55} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function BalanceChart({
  data,
  activeMonth,
  activeAmount,
  changePercent,
  isPositive,
}: BalanceChartProps) {
  const stepX    = CHART_WIDTH / (data.length - 1);
  const maxValue = Math.max(...data.map((d) => d.amount), 1);

  const normalizeY = (value: number) =>
    CHART_BOTTOM - (value / maxValue) * (CHART_BOTTOM - CHART_TOP);

  const points = data.map((d, i) => ({
    x: PADDING_LEFT + i * stepX,
    y: normalizeY(d.amount),
  }));

  const linePath = buildSmoothPath(points);

  // ✅ Active point
  const activeIndex = data.findIndex((d) => d.month === activeMonth);
  const activePoint = points[activeIndex] ?? points[Math.floor(points.length / 2)];

  // ✅ Y axis labels
  const yLabels = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    value: Math.round(maxValue * t),
    y:     normalizeY(maxValue * t),
  }));

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
    >
      <defs>
        {/* ✅ Area fill gradient */}
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"    />
        </linearGradient>

        {/* ✅ Vertical line gradient */}
        <linearGradient id="verticalLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* ── Y Axis Labels ── */}
      {yLabels.map((label, i) => (
        <text
          key={i}
          x={PADDING_LEFT - 8}
          y={label.y + 4}
          fontSize="11"
          fill="#9CA3AF"
          textAnchor="end"
        >
          {label.value >= 1000
            ? `${Math.round(label.value / 1000)}k`
            : label.value}
        </text>
      ))}

      {/* ── Horizontal Grid Lines ── */}
      {yLabels.map((label, i) => (
        <line
          key={i}
          x1={PADDING_LEFT}
          y1={label.y}
          x2={VIEWBOX_WIDTH - PADDING_RIGHT}
          y2={label.y}
          stroke="#E5E7EB"
          strokeOpacity="0.6"
          strokeDasharray="4 4"
        />
      ))}

      {/* ── Area Fill ── */}
      <path
        d={`${linePath} L ${points.at(-1)?.x} ${CHART_BOTTOM} L ${points[0].x} ${CHART_BOTTOM} Z`}
        fill="url(#areaFill)"
      />

      {/* ── Line ── */}
      <path
        d={linePath}
        stroke="#3B82F6"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Active Vertical Line ── */}
      <line
        x1={activePoint.x}
        y1={CHART_TOP}
        x2={activePoint.x}
        y2={CHART_BOTTOM}
        stroke="url(#verticalLine)"
        strokeWidth="1.5"
      />

      {/* ── Active Tooltip ── */}
      <g>
        <rect
          x={activePoint.x - 36}
          y={activePoint.y - 52}
          width="82"
          height="44"
          rx="8"
          fill="white"
          filter="drop-shadow(0 2px 8px rgba(0,0,0,0.12))"
        />
        {/* Month label */}
        <text
          x={activePoint.x + 5}
          y={activePoint.y - 34}
          fontSize="11"
          fill="#6B7280"
          textAnchor="middle"
        >
          {activeMonth}
        </text>
        {/* Amount */}
        <text
          x={activePoint.x + 5}
          y={activePoint.y - 18}
          fontSize="11"
          fontWeight="600"
          fill="#111827"
          textAnchor="middle"
        >
          ${activeAmount.toLocaleString()}
        </text>
        {/* Change % */}
        <text
          x={activePoint.x + 5}
          y={activePoint.y - 4}
          fontSize="10"
          fill={isPositive ? "#10B981" : "#EF4444"}
          textAnchor="middle"
        >
          {isPositive ? "▲" : "▼"} {changePercent}%
        </text>
      </g>

      {/* ── Active Dot ── */}
      <circle
        cx={activePoint.x}
        cy={activePoint.y}
        r="6"
        fill="#3B82F6"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />

      {/* ── X Axis Labels ── */}
      {data.map((d, i) => (
        <text
          key={i}
          x={PADDING_LEFT + i * stepX}
          y={CHART_BOTTOM + 24}
          fontSize="11"
          fill={d.month === activeMonth ? "#3B82F6" : "#9CA3AF"}
          fontWeight={d.month === activeMonth ? "600" : "400"}
          textAnchor="middle"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}