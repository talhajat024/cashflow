import type { DashboardOverview,TimeRange } from "../types/dashboard.types";
import { httpClient } from "../../../shared/api/httpClient";

export async function getDashboardOverview(
    spendingRange:TimeRange,
    balanceRangeInMonths:number
):Promise<DashboardOverview>{
    const response = await httpClient.get<DashboardOverview>("/dashbaord/overview",{
        params:{
            spendingRange,
            balanceRangeInMonths,
        },
    });
    return response.data;
}