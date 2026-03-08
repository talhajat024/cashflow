import {
  row,
  left,
  dot,
  label,
  value,
} from "./SpendingRow.styles";

import type { SpendingCategory } from "../../types/dashboard.types";

// Same color map as donut (keep consistent)
const DONUT_COLORS = ["#1D4ED8", "#F97316", "#22D3EE"]; 

type SpendingRowProps = {
  categoryKey: SpendingCategory["key"];
  label: string;
  value: number;
  index:number;
};

export function SpendingRow({
  label: text,
  value: percent,
  index
}: SpendingRowProps) {
  const color = DONUT_COLORS[index] ?? "#CBD5E1";

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
