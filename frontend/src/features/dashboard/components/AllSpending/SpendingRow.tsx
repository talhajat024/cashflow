import {
  row,
  left,
  dot,
  label,
  value,
} from "./SpendingRow.styles";

import type { SpendingCategory } from "../../types/dashboard.types";

// Same color map as donut (keep consistent)
const CATEGORY_COLORS: Record<string, string> = {
  workspace: "#2563EB",
  salary: "#22C55E",
  shopping: "#22D3EE",
  food: "#F97316",
  travel: "#A855F7",
};

const DEFAULT_COLOR = "#CBD5E1";

type SpendingRowProps = {
  categoryKey: SpendingCategory["key"];
  label: string;
  value: number;
};

export function SpendingRow({
  categoryKey,
  label: text,
  value: percent,
}: SpendingRowProps) {
  const color = CATEGORY_COLORS[categoryKey] ?? DEFAULT_COLOR;

  return (
    <div className={row()}>
      <div className={left()}>
        <span
          className={dot()}
          style={{ backgroundColor: color }}
        />
        <span className={label()}>{text}</span>
      </div>
      <span className={value()}>{percent}%</span>
    </div>
  );
}
