import { useCallback, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

import type { BalanceStatPoint } from "../../../types/wallet.types";

type BalanceChartProps = {
  data: BalanceStatPoint[];
  activeMonth: string;
  activeYear: number;
  activeAmount: number;
  changePercent: number;
  isPositive: boolean;
};

type TooltipPayloadItem = {
  payload: BalanceStatPoint;
  value: number;
};

function ChartTooltip({
  active,
  payload,
  activeYear,
  changePercent,
  isPositive,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  activeYear: number;
  changePercent: number;
  isPositive: boolean;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  const amount = point.value;
  const month = point.payload.month;

  return (
    <div className="bg-white rounded-lg shadow-md px-3 py-2.5 min-w-[130px] border border-gray-100">
      <div className="flex items-center justify-between gap-4 mb-1">
        <span className="text-[11px] text-gray-400 font-medium">{month}</span>
        <span className="text-[11px] text-gray-800 font-semibold">
          ${amount.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-bold text-primary">{activeYear}</span>
        <span
          className={`text-[11px] font-medium ${
            isPositive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          {isPositive ? "▲" : "▼"} {changePercent}%
        </span>
      </div>
    </div>
  );
}

/* ── Custom Active Dot ── */
function ActiveDot(props: { cx?: number; cy?: number }) {
  const { cx = 0, cy = 0 } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={12} fill="#3B82F6" fillOpacity={0.12} />
      <circle
        cx={cx}
        cy={cy}
        r={7}
        fill="white"
        stroke="#3B82F6"
        strokeWidth={2.5}
      />
      <circle cx={cx} cy={cy} r={3.5} fill="#3B82F6" />
    </g>
  );
}

/* ── Custom X-Axis Tick ── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomXTick(props: any) {
  const { x, y, payload, hoveredMonth, defaultActiveMonth } = props as {
    x?: number;
    y?: number;
    payload?: { value: string };
    hoveredMonth: string | null;
    defaultActiveMonth: string;
  };
  const month = payload?.value ?? "";
  const activeMonth = hoveredMonth ?? defaultActiveMonth;
  const isActive = month === activeMonth;

  return (
    <text
      x={x}
      y={(y ?? 0) + 16}
      textAnchor="middle"
      fill={isActive ? "#3B82F6" : "#9CA3AF"}
      fontWeight={isActive ? 700 : 400}
      fontSize={14}
      className="transition-colors duration-150"
    >
      {month}
    </text>
  );
}

/* ── Custom Cursor (vertical line + cross marks) ── */
function CustomCursor({
  points,
  height,
}: {
  points?: { x: number; y: number }[];
  height?: number;
}) {
  if (!points?.length) return null;
  const { x } = points[0];
  const top = 0;
  const bottom = (height ?? 260) + top;
  const crossSize = 6;

  // Y-axis grid levels for 0k, 10k, 20k, 30k, 40k
  const ySteps = [0, 10000, 20000, 30000, 40000];
  const chartHeight = bottom - top;
  const yMax = 40000;

  return (
    <g>
      {/* Vertical line */}
      <line
        x1={x}
        y1={top}
        x2={x}
        y2={bottom}
        stroke="#3B82F6"
        strokeWidth={1.5}
        strokeOpacity={0.7}
      />
      {/* Cross marks at each y-grid level */}
      {ySteps.map((step) => {
        const yPos = bottom - (step / yMax) * chartHeight;
        return (
          <line
            key={step}
            x1={x - crossSize}
            y1={yPos}
            x2={x + crossSize}
            y2={yPos}
            stroke="#3B82F6"
            strokeWidth={1.5}
            strokeOpacity={0.7}
          />
        );
      })}
      {/* Cross at top */}
      <line
        x1={x - crossSize}
        y1={top}
        x2={x + crossSize}
        y2={top}
        stroke="#3B82F6"
        strokeWidth={1.5}
        strokeOpacity={0.7}
      />
    </g>
  );
}

/* ── Main Chart ── */
export function BalanceChart({
  data,
  activeMonth,
  activeYear,
  activeAmount: _activeAmount,
  changePercent,
  isPositive,
}: BalanceChartProps) {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = useCallback((state: any) => {
    if (state?.activePayload?.length) {
      setHoveredMonth(state.activePayload[0].payload.month);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredMonth(null);
  }, []);

  const yDomain: [number, number] = [0, 40000];

  const formatYTick = (value: number) => {
    if (value === 0) return "0";
    return `${value / 1000}k`;
  };

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="0"
          stroke="#E5E7EB"
          strokeOpacity={0.5}
          vertical={false}
        />

        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={(props) => (
            <CustomXTick
              {...props}
              hoveredMonth={hoveredMonth}
              defaultActiveMonth={activeMonth}
            />
          )}
          tickMargin={8}
        />

        <YAxis
          domain={yDomain}
          ticks={[0, 10000, 20000, 30000, 40000]}
          tickFormatter={formatYTick}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9CA3AF", fontSize: 14 }}
          width={45}
        />

        <Tooltip
          content={
            <ChartTooltip
              activeYear={activeYear}
              changePercent={changePercent}
              isPositive={isPositive}
            />
          }
          cursor={<CustomCursor />}
          defaultIndex={data.findIndex((d) => d.month === activeMonth)}
          isAnimationActive={false}
        />

        {/* Subtle vertical grid lines for each data point */}
        {data.map((d) => (
          <ReferenceLine
            key={d.month}
            x={d.month}
            stroke="#E5E7EB"
            strokeOpacity={0.5}
            strokeWidth={1}
          />
        ))}

        <Area
          type="monotone"
          dataKey="amount"
          stroke="#3B82F6"
          strokeWidth={2.5}
          fill="url(#balanceGradient)"
          activeDot={<ActiveDot />}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
