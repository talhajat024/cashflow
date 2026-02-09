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


    const [headerScrolled,setHeaderScrolled]=useState(false);
  const { data, loading, error } = useDashboardOverview(6);

  // scroll container ref
  const scrollRef = useRef<HTMLDivElement| null>(null);

  // in memory scroll store (per route)
  const scrollPositions = useRef<Record<string,number>>({});

  // Save scroll position on scroll
    useEffect(()=>
    {
        const el= scrollRef.current;
        if(!el) return;
        const handleScroll=()=>{
            const scrollTop = el.scrollTop;
            scrollPositions.current[location.pathname]=scrollTop;
            setHeaderScrolled(scrollTop > 0);
        };

        el.addEventListener("scroll",handleScroll);
        return ()=> el.removeEventListener("scroll",handleScroll);

    },[location.pathname])

    // restrore scroll on route change
    useEffect(()=>
    {
        const el= scrollRef.current;
        if(!el) return;
        const saved = scrollPositions.current[location.pathname];
        el.scrollTop=saved??0;
    },[location.pathname])


  return (
    <div className="h-screen flex flex-col">
      <DashboardHeader scrolled={headerScrolled} />

      <div className="flex-1 overflow-y-auto bg-gray-50" ref={scrollRef}>
        <div className="bg-primary h-16" />
        <div className="relative">
          <PageContainer className="-mt-16 relative z-10">
            <Outlet
              context={{
                data,
                loading,
                error,
                spendingRange,
                setSpendingRange: (range: TimeRange) =>
                  setSearchParams({ range: range.toLowerCase() }),
              }}
            />
          </PageContainer>
        </div>
      </div>
    </div>
  );
}