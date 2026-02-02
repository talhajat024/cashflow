import {
  chartWrapper,
  chartSvg,
  centerContent,
  centerValue,
  centerLabel,
} from "./SpendingDonutChart.styles";

import type {
  SpendingCategory,
  TimeRange,
} from "../../types/dashboard.types";

type SpendingDonutChartProps = {
  total: number;
  categories: SpendingCategory[];
  activeRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
};

const SIZE = 180;
const CENTER = SIZE / 2;
const STROKE_WIDTH = 10;

const BASE_RADIUS = 78;
const RADIUS_STEP = 18;

const CATEGORY_COLORS: Record<string, string> = {
  workspace: "#2563EB",
  salary: "#22C55E",
  shopping: "#22D3EE",
  food: "#F97316",
  travel: "#A855F7",
};

const DEFAULT_COLOR = "#CBD5E1";

function getStroke(value: number, radius: number) {
  const circumference = 2 * Math.PI * radius;
  return `${(value / 100) * circumference} ${circumference}`;
}

const RANGES: TimeRange[] = ["Weekly", "Monthly", "Yearly"];

export function SpendingDonutChart({
  total,
  categories,
  activeRange,
  onRangeChange,
}: SpendingDonutChartProps) {
  return (
    <div className={chartWrapper()}>
      {/* ===== Range Selector ===== */}
      <div className="flex justify-center gap-2 mb-2">
        {RANGES.map((range) => (
          <button
            key={range}
            onClick={() => onRangeChange(range)}
            className={`text-xs px-2 py-1 rounded ${
              range === activeRange
                ? "bg-blue-500 text-white"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={chartSvg()}
      >
        {categories.map((category, index) => {
          const radius = BASE_RADIUS - index * RADIUS_STEP;
          const color =
            CATEGORY_COLORS[category.key] ?? DEFAULT_COLOR;

          return (
            <g key={category.key}>
              {/* Background ring */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={radius}
                fill="transparent"
                stroke="#EEF2F7"
                strokeWidth={STROKE_WIDTH}
              />

              {/* Progress ring */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={getStroke(
                  category.percentage,
                  radius
                )}
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      {/* ===== Center Content ===== */}
      <div className={centerContent()}>
        <span className={centerValue()}>
          ${total.toFixed(0)}
        </span>
        <span className={centerLabel()}>
          Total Spend ({activeRange})
        </span>
      </div>
    </div>
  );
}
