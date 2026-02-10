    import { Routes,Route, Navigate } from "react-router-dom";
    import { lazy,Suspense } from "react";
    import DashboardLayout from "../features/dashboard/layout/DashboardLayout";

    const OverviewPage = lazy(()=> import ("../features/dashboard/pages/OverviewPage"));
    const WalletPage =lazy (()=>import ("../features/dashboard/pages/WalletPage"));
    const InvoicePage = lazy (()=>import ("../features/dashboard/pages/InvoicePage"));
    const ProfilePage =lazy (()=>import ("../features/dashboard/pages/ProfilePage"));
    const SettingsPage= lazy (()=>import ("../features/dashboard/pages/SettingsPage"));
    const HelpPage = lazy (()=>import ("../features/dashboard/pages/HelpPage"));
    const ReportPage= lazy (()=>import ("../features/dashboard/pages/ReportPage"));

    const AppRoutes = ()=>
    {
        return(
            <Suspense fallback={<div className="p-6 text-sm text-gray-400">Loading Page...</div>}>
                <Routes>
                <Route path="/" element={<Navigate to="/dashboard/overview"/>}/>
                {/*Default */}
                <Route path="/dashboard" element={<DashboardLayout/>}>
                    <Route index element={<Navigate to="overview" replace/>}></Route>
                {/* Tabs */}
                <Route path="overview" element={<OverviewPage/>}/>
                <Route path="wallet" element={<WalletPage />} />
                <Route path="invoice" element={<InvoicePage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="help" element={<HelpPage />} />
                <Route path="report" element={<ReportPage />} />
                </Route>
            </Routes>
            </Suspense>
        )
    }

    export default AppRoutes;