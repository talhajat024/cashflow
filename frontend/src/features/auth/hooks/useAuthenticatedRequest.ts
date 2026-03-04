import { useState,useCallback } from "react";
import { useAuth } from "./useAuth";

export const useAuthenticatedRequest= <T,>(
    requestFn:()=> Promise<T>
):[()=> Promise<T>,{loading:boolean;error:string | null}]=>{

        const [loading,setLoading]=useState(false);
        const [error,setError]=useState<string | null>(null);
        const {forceRefreshToken,logout}=useAuth();

        const execute =useCallback(async ()=>{
            try{
                setLoading(true);
                setError(null);
                return await requestFn();
            }
            catch(err:any){
                if(err.response?.status === 401)
                {
                    try{
                        await forceRefreshToken?.();
                        return await requestFn();
                    }
                    catch{
                        setError("Session expired.Please login again.");
                        logout();
                    }
                }
                const errorMessage = err.response?.data?.message || err.message || 'Request Failed';
                setError(errorMessage);
                throw err;
            }
            finally{
                setLoading(false);
            }
        },[requestFn,forceRefreshToken,logout]);
        return [execute,{loading,error}];
    };
