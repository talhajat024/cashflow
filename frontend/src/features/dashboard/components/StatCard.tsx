import type { ReactNode } from "react";
import { MiniChart } from "../../../shared/ui/charts";
import { getCurrencySymbol } from "../../../shared/utils/currency";

import {
  card,
  header,
  titleText,
  periodText,
  iconWrapper,
  content,
  valueText,
  trendText,
  chartWrapper,
  headerRight,
  contentRight
} from "./StatCard.styles";

type Trend = {
  percentage: number;
  label: string;
  positive: boolean;
};

type StatCardProps = {
  title: string;
  period: string;
  amount: number;
  currency: string;
  icon: ReactNode;
  trend: Trend;
  tone?: "blue" | "green" | "red";
  miniChartData?: number[];
};

export function StatCard({
  title,
  period,
  amount,
  currency,
  icon,
  tone,
  trend,
  miniChartData,
}: StatCardProps) {
  const symbol = getCurrencySymbol(currency);
  const formattedAmount = `${symbol}${amount.toLocaleString()}`;

  return (
   <div className={card()}>
  {/* Left column: title + period */}
  <div className={header()}>
    <h4 className={titleText()}>{title}</h4>
    <p className={periodText()}>{period}</p>
  </div>

  {/* Right column: icon */}
  <div className={headerRight()}>
    <div className={iconWrapper({ tone })}>{icon}</div>
  </div>

  {/* Left column: amount + trend */}
  <div className={content()}>
    <p className={valueText()}>{formattedAmount}</p>
    <p className={trendText({ positive: trend.positive })}>
      {trend.positive ? "+" : ""}
      {trend.percentage}% {trend.label}
    </p>
  </div>

  {/* Right column: chart */}
  <div className={contentRight()}>
    {miniChartData && (
      <div className={chartWrapper()}>
        <MiniChart data={miniChartData as [number, number, number]} />
      </div>
    )}
  </div>
</div>
  );
}