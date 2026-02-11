import { Outlet } from "react-router-dom";
// import { DashboardHeader } from "../../dashboard/components/DashboardHeader";

export default function WalletsLayout (){
    console.log("inside wallet page.");
    return(
        <>
         {/* <DashboardHeader /> */}
        <main className="p-6">
            <h1 className="text-xl font-semibold">
                Wallets
            </h1>

            <p className="mt-2 text-sm">Wallets module coming soon</p>
        <Outlet/>
         </main>
         </>
    )
}