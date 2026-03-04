import { MoreHorizontal } from "lucide-react";
import {
  wrapper,
  header,
  title,
  menuButton,
  summaryRow,
  summaryItem,
  summaryLabel,
  summaryValue,
  content,
  chartArea,
  legendArea,
} from "./AllSpending.styles";

import {
  Card,
  CardHeader,
  CardContent,
} from "../../../../shared/ui/card/Card";

import { SpendingDonutChart } from "./SpendingDonutChart";
import { SpendingRow } from "./SpendingRow";
import { getCurrencySymbol } from "../../../../shared/utils/currency";

import type {
  TimeRange,
  AllSpending as AllSpendingType,
} from "../../types/dashboard.types";

type AllSpendingProps = {
  data: AllSpendingType;
  activeRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
};

export function AllSpending({
  data,
  activeRange,
  onRangeChange,
}: AllSpendingProps) {
  console.log("The data is:",data);
  const { byRange,currency, summary } = data;

  const chart = byRange[activeRange];
  console.log("chart is:",chart);
  console.log("The active range is:",activeRange)

  return (
    <Card className={wrapper()}>
      <CardHeader className={header()}>
        <h3 className={title()}>All Spending</h3>

        <button className={menuButton()}>
          <MoreHorizontal size={18} />
        </button>
      </CardHeader>

      <CardContent className={wrapper()}>
        {/* ===== Summary (acts as range selector) ===== */}
        <div className={summaryRow()}>
          {(["Weekly", "Monthly", "Yearly"] as TimeRange[]).map((range) => (
            <div
              key={range}
              className={`${summaryItem()} cursor-pointer transition ${
                activeRange === range
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => onRangeChange(range)}
            >
              <span className={summaryLabel()}>{range}</span>
              <span className={summaryValue()}>
                {getCurrencySymbol(currency)}
                {summary[range.toLowerCase() as "weekly" | "monthly" | "yearly"].toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* ===== Chart + Legend ===== */}
        <div className={content()}>
          <div className={chartArea()}>
            <SpendingDonutChart
              total={chart.total}
              categories={chart.categories}
            />
          </div>

          <div className={legendArea()}>
            {chart.categories.map((category) => (
              <SpendingRow
                key={category.key}
                categoryKey={category.key}
                label={category.label}
                value={category.percentage}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
