import { Outlet } from "react-router-dom";
import { DashboardHeader } from "../components/DashboardHeader";
import { PageContainer } from "../../../shared/ui/layout/PageContainer";

export default function DashboardLayout()
{
    return(
         <>
    <DashboardHeader/>
    <PageContainer>
        <Outlet/>
    </PageContainer>
    </>

    )
}
