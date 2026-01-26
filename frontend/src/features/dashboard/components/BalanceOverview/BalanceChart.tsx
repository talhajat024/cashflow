type BalanceChartProps = {
  activeMonth?: number; // 0 = Jan, 6 = July
};

export function BalanceChart({ activeMonth = 6 }: BalanceChartProps) {
  // ===== Geometry =====
  const VIEWBOX_WIDTH = 720;
  const VIEWBOX_HEIGHT = 280;

  const PADDING_LEFT = 60;
  const PADDING_RIGHT = 20;
  const CHART_TOP = 20;
  const CHART_BOTTOM = 220;

  const MONTHS = 12;

  const CHART_WIDTH =
    VIEWBOX_WIDTH - PADDING_LEFT - PADDING_RIGHT;

  const STEP_X = CHART_WIDTH / (MONTHS - 1);

  const getX = (index: number) =>
    PADDING_LEFT + index * STEP_X;

  const activeX = getX(activeMonth);

  return (
    <svg
      width="100%"
      height="280"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ================== DEFINITIONS ================== */}
      <defs>
        {/* Income gradient */}
        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25">
            <animate attributeName="stop-opacity" from="0" to="0.25" dur="0.8s" />
          </stop>
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>

        {/* Spending gradient (Cashflow orange) */}
        <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C" stopOpacity="0.25">
            <animate attributeName="stop-opacity" from="0" to="0.25" dur="0.8s" />
          </stop>
          <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
        </linearGradient>

        {/* Dot glow */}
        <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ================== ACTIVE MONTH COLUMN ================== */}
      <rect
        x={activeX - STEP_X / 2}
        y={CHART_TOP}
        width={STEP_X}
        height={CHART_BOTTOM - CHART_TOP}
        rx="12"
        fill="#2563EB"
        opacity="0.04"
      />

      {/* ================== GRID LINES ================== */}
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

      {/* ================== Y AXIS LABELS ================== */}
      {[
        { y: 220, label: "10k" },
        { y: 180, label: "20k" },
        { y: 140, label: "30k" },
        { y: 100, label: "40k" },
        { y: 60, label: "50k" },
      ].map(({ y, label }) => (
        <text key={label} x="10" y={y + 4} fontSize="12" fill="#9CA3AF">
          {label}
        </text>
      ))}

      {/* ================== AREA FILLS ================== */}
      <path
        d={`
          M ${getX(0)} 160
          C ${getX(2)} 120, ${getX(4)} 120, ${getX(5)} 150
          S ${getX(8)} 180, ${getX(9)} 140
          S ${getX(10)} 110, ${getX(11)} 90
          L ${getX(11)} ${CHART_BOTTOM}
          L ${getX(0)} ${CHART_BOTTOM}
          Z
        `}
        fill="url(#incomeGradient)"
      />

      <path
        d={`
          M ${getX(0)} 140
          C ${getX(2)} 150, ${getX(4)} 110, ${getX(5)} 100
          S ${getX(8)} 190, ${getX(9)} 140
          S ${getX(10)} 130, ${getX(11)} 110
          L ${getX(11)} ${CHART_BOTTOM}
          L ${getX(0)} ${CHART_BOTTOM}
          Z
        `}
        fill="url(#spendingGradient)"
      />

      {/* ================== TREND LINES ================== */}
      <path
        d={`
          M ${getX(0)} 160
          C ${getX(2)} 120, ${getX(4)} 120, ${getX(5)} 150
          S ${getX(8)} 180, ${getX(9)} 140
          S ${getX(10)} 110, ${getX(11)} 90
        `}
        stroke="#2563EB"
        strokeWidth="2.5"
        fill="none"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1"
          to="0"
          dur="0.8s"
          fill="freeze"
        />
      </path>

      <path
        d={`
          M ${getX(0)} 140
          C ${getX(2)} 150, ${getX(4)} 110, ${getX(5)} 100
          S ${getX(8)} 190, ${getX(9)} 140
          S ${getX(10)} 130, ${getX(11)} 110
        `}
        stroke="#FB923C"
        strokeWidth="2.5"
        fill="none"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="1"
          to="0"
          dur="0.8s"
          fill="freeze"
        />
      </path>

      {/* ================== ACTIVE POINT ================== */}
      <circle
        cx={activeX}
        cy="145"
        r="0"
        fill="#FB923C"
        filter="url(#dotGlow)"
      >
        <animate attributeName="r" from="0" to="4" dur="0.3s" begin="0.6s" fill="freeze" />
        <animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.6s" fill="freeze" />
      </circle>

      {/* ================== MONTH LABELS ================== */}
      {[
        "Jan","Feb","Mar","Apr","May","Jun",
        "July","Aug","Sep","Oct","Nov","Dec",
      ].map((month, i) => (
        <text
          key={month}
          x={getX(i)}
          y="250"
          fontSize="12"
          fill={i === activeMonth ? "#2563EB" : "#9CA3AF"}
          fontWeight={i === activeMonth ? "600" : "400"}
          textAnchor="middle"
        >
          {month}
        </text>
      ))}
    </svg>
  );
}
