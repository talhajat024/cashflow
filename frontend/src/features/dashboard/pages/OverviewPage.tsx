import { useOutletContext } from "react-router-dom";
import type { TimeRange,DashboardOverview } from "../types/dashboard.types";

import { OverviewStats } from "../components/OverviewStats";
import { RecentTransactions } from "../components/RecentTransactions/RecentTransactions";
import { DashboardInsights } from "../components/DashboardInsights/DashboardInsights";

type DashboardContext = {
  data:DashboardOverview | null;
  loading:boolean;
  error:string | null;
  spendingRange: TimeRange;
  setSpendingRange:(range:TimeRange)=>void;
}

export default function OverviewPage() {
  const { data, loading, error,spendingRange,setSpendingRange } = useOutletContext<DashboardContext>();

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
        <div className="-mt-32 flex flex-col gap-6">
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
