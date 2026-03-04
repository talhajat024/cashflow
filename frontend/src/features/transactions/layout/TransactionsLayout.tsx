import { Outlet } from "react-router-dom";
// import { DashboardHeader } from "../../dashboard/components/DashboardHeader";

export default function TransactionsLayout (){
    return(
        <>
         {/* <DashboardHeader /> */}
        <main className="p-6">
            <h1 className="text-xl font-semibold">
                Transactions
            </h1>

            <p className="mt-2 text-sm ">Transactions module coming soon</p>
        <Outlet/>
         </main>
         </>
    )
}