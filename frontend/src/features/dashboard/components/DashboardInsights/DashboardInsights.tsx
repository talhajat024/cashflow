import { BalanceOverview } from "../BalanceOverview/BalanceOverview";
import { AllSpending } from "../AllSpending/AllSpending";
import type { BalanceOverviewChart,AllSpending as AllSpendingType,TimeRange } from "../../types/dashboard.types";

interface DashboardInsightProps{
    balanceChart:BalanceOverviewChart;
    allSpending:AllSpendingType;
    onSpendingRangeChange:(range:TimeRange)=>void;
}

export function DashboardInsights({
    balanceChart,
    allSpending,
    onSpendingRangeChange
}:DashboardInsightProps)
{
    return(
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
                <BalanceOverview title="Balance Overview"
               chart={balanceChart}/>
            </div>
            <div className="col-span-1">
                <AllSpending data={allSpending} onRangeChange={onSpendingRangeChange} />
            </div>
        </div>
    )
}