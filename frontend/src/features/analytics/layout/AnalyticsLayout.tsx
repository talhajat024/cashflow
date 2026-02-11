import { Outlet } from "react-router-dom";
// import { DashboardHeader } from "../../dashboard/components/DashboardHeader";

export default function AnalyticsLayout (){
    return(
        <>
         {/* <DashboardHeader /> */}
        <main className="p-6">
            <h1 className="text-xl font-semibold ">
                Analytics
            </h1>

            <p className="mt-2 text-sm">Analytics module coming soon</p>
        <Outlet/>
         </main>
         </>
    )
}