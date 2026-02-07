import { OverviewStats } from "../components/OverviewStats";
import { RecentTransactions } from "../components/RecentTransactions/RecentTransactions";
import { DashboardInsights } from "../components/DashboardInsights/DashboardInsights";
import type { TimeRange } from "../types/dashboard.types";
import { useState } from "react";
import { useDashboardOverview } from "../../../shared/hooks/useDashboardOverview";

export default function OverviewPage() {
  const [spendingRange, setSpendingRange] = useState<TimeRange>("Monthly");
  const { data, loading, error } = useDashboardOverview(6);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* page-level loading indicator */}
      {loading && (
        <div className="text-sm text-gray-400 mb-2">
          Updating dashboard...
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-6">
          <OverviewStats cards={data.summaryCards} />

          <DashboardInsights
            balanceChart={data.balanceOverviewChart}
            allSpending={data.allSpending}
            activeRange={spendingRange}
            onSpendingRangeChange={setSpendingRange}
          />

          <RecentTransactions transactions={data.recentTransactions} />
        </div>
      )}
    </>
  );
}
