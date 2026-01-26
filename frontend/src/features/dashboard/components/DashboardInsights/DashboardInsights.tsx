import { BalanceOverview } from "../BalanceOverview/BalanceOverview";
import { AllSpending } from "../AllSpending/AllSpending";

export function DashboardInsights()
{
    return(
        <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
                <BalanceOverview title="Balance Overview"
                period="Last 6 months"
                legendItems={[
                { label: "Total Income", color: "blue" },
                { label: "Total Spending", color: "orange" },
                ]}/>
            </div>
            <div className="col-span-1">
                <AllSpending />
            </div>
        </div>
    )
}