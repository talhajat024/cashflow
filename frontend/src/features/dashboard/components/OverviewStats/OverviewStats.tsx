import { StatCard } from "../StatCard";
import { statsWrapper, statsGrid } from "./OverviewStats.styles";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export function OverviewStats() {
  return (
    <section className={statsWrapper()}>
      <div className={statsGrid()}>
      <StatCard
          title="Total Balance"
          period="2 July - 24 September 2023"
          value="$982,000.90"
          icon={<Wallet size={18} />}
          tone="blue"
          trend={{ label: "+12% vs last month", positive: true }}
      />

      <StatCard
        title="Total Income"
        period="9 July - 24 September 2023"
        value="$854,348.00"
        icon={<TrendingUp size={18} />}
        tone="green"
        trend={{ label: "+8.2%", positive: true }}
      />
        
      <StatCard
        title="Total Spending"
        period="24 July - 24 September 2023"
        value="$432,120.00"
        icon={<TrendingDown size={18} />}
        tone="red"
        trend={{ label: "-4.1%", positive: false }}
      />

      </div>
    </section>
  );
}
