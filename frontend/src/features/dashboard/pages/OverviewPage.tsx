import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { PageState } from "../../../shared/ui/pagestate/PageState";
import type { TimeRange,DashboardOverview } from "../types/dashboard.types";

import { OverviewStats } from "../components/OverviewStats";
import { RecentTransactions } from "../components/RecentTransactions/RecentTransactions";
import { DashboardInsights } from "../components/DashboardInsights/DashboardInsights";
import { PageSkeleton } from "../../../shared/ui/pageskeleton";

import { useNotifications } from "../../notifications/hooks/useNotifications";

type DashboardContext = {
  data:DashboardOverview | null;
  loading:boolean;
  error:string | null;

  balanceRange:string;
  onBalanceRangeChange:(range:string)=>void;

  spendingRange: TimeRange;
  setSpendingRange:(range:TimeRange)=>void;
}

export default function OverviewPage() {
  const { data, loading, error,balanceRange,onBalanceRangeChange,spendingRange,setSpendingRange } = useOutletContext<DashboardContext>();
  const { addInsightNotification } = useNotifications();

  useEffect(()=>{
    if(data?.insightText)
    {
      addInsightNotification(data.insightText);
    }
  },[data?.insightText])

  if (error) {
    return <div>{error}</div>;
  }

   if (loading) {
    return <PageSkeleton layout="dashboard" />;
  }

  return (
    <PageState
    loading={loading}
    loadingLayout="dashboard"
    error={error}
    onRetry={()=> window.location.reload()}
    isEmpty={!data}
    emptyTitle="No Overview Data"
    emptyDescription="Start adding transactions to see your financial overview"
      emptyActionLabel="Add Transaction"
      onEmptyAction={() => window.location.href = '/transactions/new'}>


      {data && (
        <div className="flex flex-col gap-6 pb-4">
          <OverviewStats cards={data.summaryCards} />

          <DashboardInsights
            balanceChart={data.balanceOverviewChart}
            allSpending={data.allSpending}
            activeRange={spendingRange}
            onSpendingRangeChange={setSpendingRange}
            balanceRange={balanceRange}
            onBalanceRangeChange={onBalanceRangeChange}
          />

          <RecentTransactions transactions={data.recentTransactions} />
        </div>
      )}
    </PageState>
  );
}
