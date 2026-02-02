import { StatCard } from "../StatCard";
import { statsWrapper, statsGrid } from "./OverviewStats.styles";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import type { SummaryCard } from "../../types/dashboard.types";

type OverviewStatsProps = {
  cards: SummaryCard[];
};

const ICON_MAP: Record<string, React.ReactNode> = {
  balance: <Wallet size={18} />,
  income: <TrendingUp size={18} />,
  spending: <TrendingDown size={18} />,
};

const TONE_MAP: Record<string, "blue" | "green" | "red"> = {
  balance: "blue",
  income: "green",
  spending: "red",
};

export function OverviewStats({ cards }: OverviewStatsProps) {
  return (
    <section className={statsWrapper()}>
      <div className={statsGrid()}>
        {cards.map((card) => {
          const icon =
            ICON_MAP[card.key] ?? <Wallet size={18} />;
          const tone =
            TONE_MAP[card.key] ?? "blue";

          // const trendLabel = `${
          //   card.isPositiveTrend ? "+" : ""
          // }${card.percentageChange}% ${card.comparisonLabel}`;

          return (
           <StatCard
  key={card.key}
  title={card.title}
  period={card.dateRange}
  amount={card.amount}
  currency={card.currency}
  icon={icon}
  tone={tone}
  trend={{
    percentage: card.percentageChange,
    label: card.comparisonLabel,
    positive: card.isPositiveTrend,
  }}
  miniChartData={[30, 45, 40, 60, 55, 70]} // optional, replace later
/>
          );
        })}
      </div>
    </section>
  );
}
