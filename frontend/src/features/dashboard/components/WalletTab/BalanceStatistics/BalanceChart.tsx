import type { BalanceStatPoint } from "../../../types/wallet.types";

type BalanceChartProps = {
  data: BalanceStatPoint[];
  activeMonth: string;
  activeAmount: number;
  changePercent: number;
  isPositive: boolean;
};

const VIEWBOX_WIDTH  = 660;
const VIEWBOX_HEIGHT = 240;
const PADDING_LEFT   = 40;
const PADDING_RIGHT  = 16;
const CHART_TOP      = 50;           
const CHART_BOTTOM   = 190;
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

  console.log("the props inside balance chart are:",data,activeMonth,activeAmount,changePercent,isPositive);
  const stepX    = CHART_WIDTH / (data.length - 1);
  const maxValue = Math.max(...data.map((d) => d.amount), 1);

  // Round to nearest 10k for clean labels
  const yMax = Math.ceil(maxValue / 10000) * 10000 || 10000;

  const normalizeY = (value: number) =>
    CHART_BOTTOM - (value / yMax) * (CHART_BOTTOM - CHART_TOP);

  const points = data.map((d, i) => ({
    x: PADDING_LEFT + i * stepX,
    y: normalizeY(d.amount),
  }));

  const linePath = buildSmoothPath(points);

  const activeIndex = data.findIndex((d) => d.month === activeMonth);
  const activePoint = points[activeIndex] ?? points[points.length - 1];

  // Y axis — 5 steps from 0 to yMax
  const yLabels = Array.from({ length: 5 }, (_, i) => {
    const value = (yMax / 4) * i;
    return { value, y: normalizeY(value) };
  });

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
    >
      <defs>
        <linearGradient id="walletAreaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"    />
        </linearGradient>
        <linearGradient id="walletVertLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3B82F6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* ── Y Axis Labels ── */}
      {yLabels.map((label, i) => (
        <text
          key={i}
          x={PADDING_LEFT - 6}
          y={label.y + 4}
          fontSize="10"
          fill="#9CA3AF"
          textAnchor="end"
        >
          {label.value === 0 ? "0k" : `${Math.round(label.value / 1000)}k`}
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
          strokeOpacity="0.8"
          strokeDasharray="4 4"
        />
      ))}

      {/* ── Area Fill ── */}
      <path
        d={`${linePath} L ${points.at(-1)?.x} ${CHART_BOTTOM} L ${points[0].x} ${CHART_BOTTOM} Z`}
        fill="url(#walletAreaFill)"
      />

      {/* ── Line ── */}
      <path
        d={linePath}
        stroke="#3B82F6"
        strokeWidth="2"
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
        stroke="url(#walletVertLine)"
        strokeWidth="1.2"
      />

      {/* ── Tooltip ── */}
      <g>
        <rect
          x={activePoint.x - 30}
          y={activePoint.y - 62}
          width="72"
          height="50"
          rx="6"
          fill="white"
          filter="drop-shadow(0 2px 6px rgba(0,0,0,0.10))"
        />
        {/* Month */}
        <text
          x={activePoint.x + 6}
          y={activePoint.y - 46}
          fontSize="9"
          fill="#6B7280"
          textAnchor="middle"
        >
          {activeMonth}
        </text>
        {/* Amount */}
        <text
          x={activePoint.x + 6}
          y={activePoint.y - 32}
          fontSize="10"
          fontWeight="600"
          fill="#111827"
          textAnchor="middle"
        >
          ${activeAmount.toLocaleString()}
        </text>
        {/* % Change */}
        <text
          x={activePoint.x + 6}
          y={activePoint.y - 18}
          fontSize="9"
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
        r="5"
        fill="#3B82F6"
        stroke="#FFFFFF"
        strokeWidth="2"
      />

      {/* ── X Axis Labels ── */}
      {data.map((d, i) => (
        <text
          key={i}
          x={PADDING_LEFT + i * stepX}
          y={CHART_BOTTOM + 18}
          fontSize="10"
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
