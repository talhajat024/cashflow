import type { DashboardOverview,TimeRange } from "../types/dashboard.types";
import { httpClient } from "../../../shared/api/httpClient";

export async function getDashboardOverview(
    spendingRange:TimeRange,
    balanceRangeInMonths:number
):Promise<DashboardOverview>{
    const response = await httpClient.get<DashboardOverview>("/dashboard/overview",{
        params:{
            spendingRange,
            balanceRangeInMonths,
        },
    });
    return response.data;
}