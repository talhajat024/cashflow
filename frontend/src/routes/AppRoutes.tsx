import { Routes,Route, Navigate } from "react-router-dom";
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";

import OverviewPage from "../features/dashboard/pages/OverviewPage";
import WalletPage from "../features/dashboard/pages/WalletPage";
import InvoicePage from "../features/dashboard/pages/InvoicePage";
import ProfilePage from "../features/dashboard/pages/ProfilePage";
import SettingsPage from "../features/dashboard/pages/SettingsPage";
import HelpPage from "../features/dashboard/pages/HelpPage";
import ReportPage from "../features/dashboard/pages/ReportPage";

const AppRoutes = ()=>
{
    return(
        <Routes>
            <Route path="/dashboard" element={<DashboardLayout/>}>
            {/*Default */}
            <Route index element={<Navigate to="overview" replace/>}/>
            {/* Tabs */}
            <Route path="overview" element={<OverviewPage/>}/>
            <Route path="wallet" element={<WalletPage />} />
            <Route path="invoice" element={<InvoicePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="report" element={<ReportPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    )
}

export default AppRoutes;