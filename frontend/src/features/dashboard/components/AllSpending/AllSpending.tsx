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

    import type { TimeRange, AllSpending as AllSpendingType } 
  from "../../types/dashboard.types";

type AllSpendingProps = {
  data: AllSpendingType;
  onRangeChange: (range: TimeRange) => void;
};


    export function AllSpending({ data, onRangeChange }: AllSpendingProps) {
  const { currency, summary, chart, activeRange } = data;

  return (
    <Card className={wrapper()}>
      <CardHeader className={header()}>
        <h3 className={title()}>All Spending</h3>

        {/* Optional future menu */}
        <button className={menuButton()}>
          <MoreHorizontal size={18} />
        </button>
      </CardHeader>

      <CardContent className={wrapper()}>
        {/* ===== Summary ===== */}
        <div className={summaryRow()}>
          <div className={summaryItem()}>
            <span className={summaryLabel()}>Weekly</span>
            <span className={summaryValue()}>
              {getCurrencySymbol(currency)}{summary.weekly.toFixed(2)}
            </span>
          </div>

          <div className={summaryItem()}>
            <span className={summaryLabel()}>Monthly</span>
            <span className={summaryValue()}>
              {getCurrencySymbol(currency)}{summary.monthly.toFixed(2)}
            </span>
          </div>

          <div className={summaryItem()}>
            <span className={summaryLabel()}>Yearly</span>
            <span className={summaryValue()}>
              {getCurrencySymbol(currency)}{summary.yearly.toFixed(2)}
            </span>
          </div>
        </div>

        {/* ===== Chart + Legend ===== */}
        <div className={content()}>
          <div className={chartArea()}>
            <SpendingDonutChart
              total={chart.total}
              categories={chart.categories}
              activeRange={activeRange}
              onRangeChange={onRangeChange}
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
