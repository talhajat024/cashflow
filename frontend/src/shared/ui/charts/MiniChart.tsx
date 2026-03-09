type MiniChartProps = {
  data: [number, number, number];
};

export function MiniChart({ data }: MiniChartProps) {
  const width         = 80;
  const height        = 52;
  const paddingBottom = 2;
  const paddingTop    = 4;
  const barWidth      = 8;   
  const barGap        = 12;  
  const startX        = 4;

  const maxValue = Math.max(...data);

  const scaleY = (value: number) =>
    (value / maxValue) * (height - paddingBottom - paddingTop);

  const bars = data.map((value, i) => {
    const barHeight = scaleY(value);
    const x = startX + i * (barWidth + barGap);
    const y = height - barHeight - paddingBottom;
    return { x, y, barHeight, centerX: startX + i * (barWidth + barGap) + barWidth / 2 };
  });

  
  const p0 = { x: bars[0].centerX, y: height - paddingBottom };           
  const p1 = { x: bars[1].centerX, y: bars[1].y + bars[1].barHeight / 2 }; 
  const p2 = { x: bars[2].centerX, y: bars[2].y };                        

  const linePath = `
    M ${p0.x} ${p0.y}
    C ${p0.x} ${p0.y - (p0.y - p1.y) * 0.4},
      ${p1.x - 4} ${p1.y},
      ${p1.x} ${p1.y}
    C ${p1.x + 4} ${p1.y},
      ${p2.x} ${p2.y + (p1.y - p2.y) * 0.4},
      ${p2.x} ${p2.y}
  `;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block" }}
    >
      <defs>
        
        <linearGradient id="grad0" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FB7185" />
          <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.5" />
        </linearGradient>

       
        <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.5" />
        </linearGradient>

        
        <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {bars.map((bar, i) => (
        <rect
          key={i}
          x={bar.x}
          y={bar.y}
          width={barWidth}
          height={bar.barHeight}
          rx="3"
          fill={`url(#grad${i})`}
        />
      ))}

      <path
        d={linePath}
        stroke="#818CF8"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      <circle
        cx={p1.x}
        cy={p1.y}
        r="2.8"
        fill="#FFFFFF"
        stroke="#818CF8"
        strokeWidth="1.5"
        opacity="0.9"
      />
    </svg>
  );
}
