import type { DashboardOverview } from "../types/dashboard.types";
import { httpClient } from "../../../shared/api/httpClient";

export async function getDashboardOverview(balanceRangeInMonths:number):Promise<DashboardOverview>{
    const response = await httpClient.get<DashboardOverview>("/dashboard/overview",{
        params:{
            balanceRangeInMonths,
        },
    });
    console.log(response.data);
    return response.data;
}