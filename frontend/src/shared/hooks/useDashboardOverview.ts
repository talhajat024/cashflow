import { useEffect,useState } from "react";
import type { DashboardOverview } from "../../features/dashboard/types/dashboard.types";
import { getDashboardOverview } from "../../features/dashboard/api/dashboard.api";

export function useDashboardOverview(balanceRangeInMonths:number){

    const [data,setData]=useState<DashboardOverview | null>(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]= useState<string | null>(null);

    useEffect(()=>{
        let cancelled = false;
        setLoading(true);
        setError(null);

        getDashboardOverview(balanceRangeInMonths)
        .then((res)=>{
            if(!cancelled) setData(res);
        })
        .catch((err)=>{
            if(!cancelled) setError(err.message);
        })
        .finally(()=>{
            if(!cancelled) setLoading(false);
        });

        return ()=> {
            cancelled=true;
        };
    },[balanceRangeInMonths]);

    return {data,loading,error}
}