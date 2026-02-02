import { DashboardHeader } from "../components/DashboardHeader"
import { OverviewStats } from "../components/OverviewStats"
import { PageContainer } from "../../../shared/ui/layout/PageContainer"
import { RecentTransactions } from "../components/RecentTransactions/RecentTransactions"
import { DashboardInsights } from "../components/DashboardInsights/DashboardInsights"
import  type { TimeRange } from "../types/dashboard.types"
import { useState } from "react"
import { useDashboardOverview } from "../../../shared/hooks/useDashboardOverview"

export default function DashboardPage() {

  const [spendingRange,setSpendingRange] = useState<TimeRange>("Monthly");
  const {data,loading,error} = useDashboardOverview(spendingRange,6);

  if(loading)
  {
    return <div>... Loading Dashboard</div>
  }
  if(error)
  {
    return <div>{error}</div>
  }
  if(!data)
  {
    return null;
  }

  return (
    <>
      <DashboardHeader/>
        <PageContainer>
         <div className="flex flex-col gap-6">
          <OverviewStats  />
          <DashboardInsights />
          <RecentTransactions />
        </div>
        </PageContainer>
    </>
  )
}
