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
  label: string;
  positive: boolean;
};

type StatCardProps = {
 title: string;
  period: string;
  value: string;
  icon: ReactNode;
  trend: Trend;
  tone?: "blue" | "green" | "red";
};

export function StatCard({
  title,
  period,
  value,
  icon,
  tone,
  trend,
}: StatCardProps) {
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
          <p className={valueText()}>{value}</p>
          <p className={trendText({ positive: trend.positive })}>
            {trend.label}
          </p>
        </div>

        <div className={chartWrapper()}>
          <MiniChart
          data={[30, 45, 40, 60, 55, 70]}
          positive={trend.positive}
          />
        </div>
      </div>
    </div>
  );
}
