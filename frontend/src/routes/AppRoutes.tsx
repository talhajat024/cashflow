    import { Routes,Route, Navigate } from "react-router-dom";
    import { lazy,Suspense } from "react";
    import DashboardLayout from "../features/dashboard/layout/DashboardLayout";
    import AnalyticsLayout from "../features/analytics/layout/AnalyticsLayout";
    import TransactionsLayout from "../features/transactions/layout/TransactionsLayout";
    import WalletsLayout from "../features/wallets/layout/WalletsLayout";

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
                
                <Route path="/analytics" element={<AnalyticsLayout />}>
                  {/* <Route index element={<AnalyticsOverviewPage />} /> */}
                </Route>

                <Route path="/transactions" element={<TransactionsLayout />}>
                  {/* <Route index element={<TransactionsPage />} /> */}
                </Route>

                <Route path="/wallets" element={<WalletsLayout />}>
                  {/* <Route index element={<WalletsPage />} /> */}
                </Route>
            </Routes>
            </Suspense>
        )
    }

    export default AppRoutes;