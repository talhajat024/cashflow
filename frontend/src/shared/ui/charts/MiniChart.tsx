type MiniChartProps = {
  data: number[];
  positive?: boolean;
};

export function MiniChart({ data, positive = true }: MiniChartProps) {
  const width = 88;
  const height = 44;
  const paddingBottom = 6;
  const barWidth = 6;
  const barGap = 8;

  const maxValue = Math.max(...data);
  const scaleY = (value: number) =>
    (value / maxValue) * (height - paddingBottom - 10);

  const lineColor = positive ? "#2563EB" : "#EF4444";
  const barGradientId = positive ? "barGradientPositive" : "barGradientNegative";
  const glowId = positive ? "glowPositive" : "glowNegative";

  const linePath = data
    .map((value, index) => {
      const x = 6 + index * (barWidth + barGap);
      const y = height - scaleY(value) - paddingBottom;
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ===== DEFINITIONS ===== */}
      <defs>
        {/* Bar gradient */}
        <linearGradient id={barGradientId} x1="0" y1="0" x2="0" y2="1">
          {positive ? (
            <>
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#22D3EE" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#FCA5A5" />
            </>
          )}
        </linearGradient>

        {/* Glow filter */}
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== BARS ===== */}
      {data.map((value, index) => {
        const barHeight = scaleY(value);
        const x = 6 + index * (barWidth + barGap);
        const y = height - barHeight - paddingBottom;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx="3"
            fill={`url(#${barGradientId})`}
            opacity={0.35 + index * 0.12}
          />
        );
      })}

      {/* ===== TREND LINE ===== */}
      <path
        d={linePath}
        stroke={lineColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${glowId})`}
        strokeDasharray="140"
        strokeDashoffset="140"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="140"
          to="0"
          dur="0.8s"
          fill="freeze"
          begin="0s"
        />
      </path>
    </svg>
  );
}
