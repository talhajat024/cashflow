import { Outlet,useSearchParams } from "react-router-dom";
import { DashboardHeader } from "../components/DashboardHeader";
import { PageContainer } from "../../../shared/ui/layout/PageContainer";
import type { TimeRange } from "../types/dashboard.types";
import { useDashboardOverview } from "../../../shared/hooks/useDashboardOverview";

export default function DashboardLayout()
{
    const [searchParams,setSearchParams]=useSearchParams();
    const rangeParams = searchParams.get("range");
    const spendingRange:TimeRange=rangeParams==="weekly"? "Weekly":rangeParams==="yearly"?"Yearly":"Monthly";

    const {data,loading,error}=useDashboardOverview(6);

    return(
         <div className="h-screen flex flex-col">
                <DashboardHeader/>

            <div className="flex-1 overflow-y-auto">
                 <PageContainer className="pt-24">
        <Outlet
        context={{
            data,loading,error,spendingRange,setSpendingRange: (range: TimeRange) =>
              setSearchParams({ range: range.toLowerCase() }),
        }}/>
    </PageContainer>

            </div>
    </div>

    )
}
