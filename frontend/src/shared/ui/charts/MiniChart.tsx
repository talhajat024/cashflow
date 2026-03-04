  type MiniChartProps = {
    data: [number, number, number];
  };

  export function MiniChart({ data }: MiniChartProps) {
  const width = 64;  // Reduced to eliminate right space
  const height = 40;
  const paddingBottom = 4;

  const barWidth = 10;
  const barGap = 8;
  const startX = 4;  // Reduced left padding

  const maxValue = Math.max(...data);

  const scaleY = (value: number) =>
    (value / maxValue) * (height - paddingBottom - 6);

  const BAR_COLORS = ["#F87171", "#6366F1", "#22D3EE"];

  const bars = data.map((value, i) => {
    const barHeight = scaleY(value);
    const x = startX + i * (barWidth + barGap);
    const y = height - barHeight - paddingBottom;
    return { x, y, barHeight, color: BAR_COLORS[i] };
  });

  const linePath = `
    M ${bars[0].x + barWidth / 2} ${bars[0].y}
    Q ${bars[1].x + barWidth / 2} ${bars[1].y},
      ${bars[2].x + barWidth / 2} ${bars[2].y}
  `;

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block' }} // Removes any inline spacing
    >
      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={bar.y}
          width={barWidth}
          height={bar.barHeight}
          rx="3"
          fill={bar.color}
          opacity={0.7}
        />
      ))}

      <path
        d={linePath}
        stroke="#6366F1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />

      <circle
        cx={bars[1].x + barWidth / 2}
        cy={bars[1].y}
        r="3"
        fill="#FFFFFF"
        stroke="#6366F1"
        strokeWidth="1.2"
      />
    </svg>
  );
}