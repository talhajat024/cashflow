import {
  chartWrapper,
  chartSvg,
  centerContent,
  centerValue,
} from "./SpendingDonutChart.styles";

import type {
  SpendingCategory,
} from "../../types/dashboard.types";

type SpendingDonutChartProps = {
  total: number;
  categories: SpendingCategory[];
};

const SIZE = 150;
const CENTER = SIZE / 2;
const STROKE_WIDTH = 9;

const BASE_RADIUS = 65;
const RADIUS_STEP = 15;

const DONUT_COLORS = ["#1D4ED8", "#F97316", "#22D3EE"];

function getStroke(value: number, radius: number) {
  const circumference = 2 * Math.PI * radius;
  return `${(value / 100) * circumference} ${circumference}`;
}

export function SpendingDonutChart({
  total,
  categories,
}: SpendingDonutChartProps) {
  return (
    <div className={chartWrapper()}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className={chartSvg()}
      >
        {categories.map((category, index) => {
          const radius = BASE_RADIUS - index * RADIUS_STEP;
          const color =DONUT_COLORS[index];

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
      </div>
    </div>
  );
}
