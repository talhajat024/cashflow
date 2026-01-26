import { DashboardHeader } from "../components/DashboardHeader"
import { OverviewStats } from "../components/OverviewStats"
import { PageContainer } from "../../../shared/ui/layout/PageContainer"
import { RecentTransactions } from "../components/RecentTransactions/RecentTransactions"
import { DashboardInsights } from "../components/DashboardInsights/DashboardInsights"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader/>
        <PageContainer>
         <div className="flex flex-col gap-6">
          <OverviewStats />
          <DashboardInsights />
          <RecentTransactions />
        </div>
        </PageContainer>
    </>
  )
}
