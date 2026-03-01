// AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import {  lazy, Suspense } from "react";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { withAuth } from "../features/auth";
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";
import AnalyticsLayout from "../features/analytics/layout/AnalyticsLayout";
import TransactionsLayout from "../features/transactions/layout/TransactionsLayout";
import WalletsLayout from "../features/wallets/layout/WalletsLayout";

// Import your skeleton
import { PageSkeleton } from "../shared/ui/pageskeleton/PageSkeleton";

const OverviewPage = lazy(() => import("../features/dashboard/pages/OverviewPage"));
const WalletPage = lazy(() => import("../features/dashboard/pages/WalletPage"));
const InvoicePage = lazy(() => import("../features/dashboard/pages/InvoicePage"));
const ProfilePage = lazy(() => import("../features/dashboard/pages/ProfilePage"));
const SettingsPage = lazy(() => import("../features/dashboard/pages/SettingsPage"));
const HelpPage = lazy(() => import("../features/dashboard/pages/HelpPage"));
const ReportPage = lazy(() => import("../features/dashboard/pages/ReportPage"));

const ProtectedDashboard= withAuth(DashboardLayout,{
  requireAuth:true,
  redirectTo:"/login"
});

const PublicOnlyRoute=withAuth(({children}:{children:React.ReactNode})=><>{children}</>,{
  requireAuth:false,
  redirectTo:'/dashboard/overview'
});

const AppRoutes = () => {
  return (
    <Routes>

       {/* Public Routes */}
            <Route path="/login" element={
                <PublicOnlyRoute>
                    <LoginPage />
                </PublicOnlyRoute>
            } />

      <Route path="/" element={<Navigate to="/dashboard/overview" />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedDashboard />}>
        <Route index element={<Navigate to="overview" replace />} />
        
        {/* Each route has its own Suspense with appropriate skeleton */}
        <Route 
          path="overview" 
          element={
            <Suspense fallback={<PageSkeleton layout="dashboard" />}>
              <OverviewPage />
            </Suspense>
          } 
        />
        
        <Route 
          path="wallet" 
          element={
            <Suspense fallback={<PageSkeleton layout="list" />}>
              <WalletPage />
            </Suspense>
          } 
        />
        
        <Route 
          path="invoice" 
          element={
            <Suspense fallback={<PageSkeleton layout="table" />}>
              <InvoicePage />
            </Suspense>
          } 
        />
        
        <Route 
          path="profile" 
          element={
            <Suspense fallback={<PageSkeleton layout="details" />}>
              <ProfilePage />
            </Suspense>
          } 
        />
        
        <Route 
          path="settings" 
          element={
            <Suspense fallback={<PageSkeleton layout="details" />}>
              <SettingsPage />
            </Suspense>
          } 
        />
        
        <Route 
          path="help" 
          element={
            <Suspense fallback={<PageSkeleton layout="list" />}>
              <HelpPage />
            </Suspense>
          } 
        />
        
        <Route 
          path="report" 
          element={
            <Suspense fallback={<PageSkeleton layout="table" />}>
              <ReportPage />
            </Suspense>
          } 
        />
      </Route>
      
      {/* Other routes with their own Suspense */}
      <Route path="/analytics" element={<ProtectedDashboard />}>
        <Route 
          index 
          element={
            <Suspense fallback={<PageSkeleton layout="dashboard" />}>
              {/* <AnalyticsOverviewPage /> */}
              <div>Analytics Coming Soon</div>
            </Suspense>
          } 
        />
      </Route>

      <Route path="/transactions" element={<ProtectedDashboard />}>
        <Route 
          index 
          element={
            <Suspense fallback={<PageSkeleton layout="table" />}>
              {/* <TransactionsPage /> */}
            </Suspense>
          } 
        />
      </Route>

      <Route path="/wallets" element={<ProtectedDashboard />}>
        <Route 
          index 
          element={
            <Suspense fallback={<PageSkeleton layout="list" />}>
              {/* <WalletsPage /> */}
            </Suspense>
          } 
        />
      </Route>
       <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
    </Routes>
  );
};

export default AppRoutes;