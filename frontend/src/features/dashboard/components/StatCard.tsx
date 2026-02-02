import type { ReactNode } from "react";
import { MiniChart } from "../../../shared/ui/charts";

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
  const formattedAmount = `${currency}${amount.toLocaleString()}`;

  return (
    <div className={card()}>
      <div className={header()}>
        <div>
          <h4 className={titleText()}>{title}</h4>
          <p className={periodText()}>{period}</p>
        </div>

        <div className={iconWrapper({ tone })}>{icon}</div>
      </div>

      <div className={content()}>
        <div>
          <p className={valueText()}>{formattedAmount}</p>

          <p className={trendText({ positive: trend.positive })}>
            {trend.positive ? "+" : ""}
            {trend.percentage}% {trend.label}
          </p>
        </div>

        {miniChartData && (
          <div className={chartWrapper()}>
            <MiniChart
              data={miniChartData}
              positive={trend.positive}
            />
          </div>
        )}
      </div>
    </div>
  );
}
