import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

interface WithAuthOptions {
    requireAuth?:boolean;
    redirectTo?:string;
    requiredRole?:string;
}

export const withAuth = <P extends object>(
    Component:React.ComponentType<P>,
    options:WithAuthOptions={})=>{

        const {requireAuth= true, redirectTo='/login',requiredRole}=options;

        return function WithAuthComponent(props:P){
            const {isAuthenticated,isLoading,hasRole} = useAuth();
            if(isLoading)
            {
                return(
                     <div className="flex h-screen items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                </div>
                );
            }

             
              if (requireAuth && !isAuthenticated) {
                return <Navigate to={redirectTo} replace />;
              }
          
             
              if (requireAuth && isAuthenticated && requiredRole && !hasRole?.(requiredRole)) {
                return <Navigate to="/unauthorized" replace />;
              }
          
              
              if (!requireAuth && isAuthenticated) {
                return <Navigate to="/dashboard/overview" replace />;
              }
            return <Component {...props}/>
            }
}