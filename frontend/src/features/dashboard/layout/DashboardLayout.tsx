import { Outlet, useSearchParams,useLocation } from "react-router-dom";
import { useEffect,useRef,useState } from "react";
import { DashboardHeader } from "../components/DashboardHeader";
import { PageContainer } from "../../../shared/ui/layout/PageContainer";
import type { TimeRange } from "../types/dashboard.types";
import { useDashboardOverview } from "../../../shared/hooks/useDashboardOverview";

export default function DashboardLayout() {

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const rangeParams = searchParams.get("range");
  const spendingRange: TimeRange = 
    rangeParams === "weekly" ? "Weekly" : 
    rangeParams === "yearly" ? "Yearly" : "Monthly";

  const balanceParam= searchParams.get("balance");
  const balanceRange= balanceParam && ['3','6','12','24'].includes(balanceParam) ? parseInt(balanceParam,10) : 6;

  const { data, loading, error } = useDashboardOverview(balanceRange);

  const [headerScrolled,setHeaderScrolled]=useState(false);
  const scrollPositions = useRef<Record<string,number>>({});

  // Save scroll position on scroll
    useEffect(()=>
    {
        const handleScroll=()=>{
            const scrollY = window.scrollY;
            scrollPositions.current[location.pathname]=scrollY;
            setHeaderScrolled(scrollY > 0);
        };

        window.addEventListener("scroll",handleScroll);
        return ()=> window.removeEventListener("scroll",handleScroll);

    },[location.pathname])

    // restrore scroll on route change
    useEffect(()=>
    {
      if(location.state?.scroll === "reset")
      {
        window.scrollTo({top:0,behavior:"auto"});
        window.history.replaceState({},"");
        return;
      }

        const saved = scrollPositions.current[location.pathname];
        window.scrollTo({ top: saved ?? 0, behavior: "auto" });
    },[location.key])


    const handleBalanceRangeChange=(range:string)=>{
      const newParams=new URLSearchParams(searchParams);
      newParams.set("balance",range);
      setSearchParams(newParams);
    }

    const handleSpendingRangeChange=(range:TimeRange)=>{
      const newParams= new URLSearchParams(searchParams);
      newParams.set("range",range.toLowerCase());
      setSearchParams(newParams);
    }


  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader scrolled={headerScrolled} />

      <main className="flex-1 bg-gray-50">
        <div className="bg-primary h-16" />
        
          <PageContainer className="-mt-16 relative z-10">
            <Outlet
              context={{
                data,
                loading,
                error,
                balanceRange:balanceRange.toString(),
                onBalanceRangeChange:handleBalanceRangeChange,
                spendingRange,
                setSpendingRange:handleSpendingRangeChange,
              }}
            />
          </PageContainer>
      </main>
    </div>
  );
}