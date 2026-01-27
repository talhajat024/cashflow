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

  const RIGHT_COL_WIDTH = "w-[88px]";
  return (
    <div className={card()}>
 <div className="grid grid-cols-[1fr_88px] gap-x-4">
  {/* HEADER LEFT */}
  <div>
    <h3 className={titleText()}>{title}</h3>
    <p className={periodText()}>{period}</p>
  </div>

  {/* HEADER RIGHT (ICON) */}
  <div className="flex justify-end">
    <div className={iconWrapper({ tone })}>
      {icon}
    </div>
  </div>

  {/* CONTENT LEFT */}
  <div className="mt-6">
    <p className={valueText()}>{value}</p>
    <p className={trendText({ positive: trend.positive })}>
      {trend.label}
    </p>
  </div>

  {/* CONTENT RIGHT (CHART) */}
  <div className="mt-6 flex justify-end items-end">
    <MiniChart
      data={[30, 45, 70]}
      positive={trend.positive}
    />
  </div>
</div>
    </div>
  );
}
