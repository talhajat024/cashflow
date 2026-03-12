import { useState,useEffect,useCallback } from "react";
import { walletApi } from "../api/wallet.api";
import type { WalletTabData,LimitPeriod } from "../types/wallet.types";

export function useWalletTab()
{
    const [data,setData]=useState<WalletTabData | null>(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string | null>(null);
    const [selectedWalletId,setSelectedWalletId]=useState<string | undefined>(undefined);
    const [limitPeriod,setLimitPeriod]=useState<LimitPeriod>("Monthly");

    const fetchData=useCallback(async (walletId?:string)=>{
        try{
            setLoading(true);
            setError(null);
            const result= await walletApi.getWalletTabData(walletId);
            setData(result);
        }
        catch(error)
        {
            console.log("error is:",error);
            setError("Failed to load wallet data");
        }
        finally{
            setLoading(false);
        }
    },[])

    useEffect(()=>{
        fetchData(selectedWalletId);
    },[selectedWalletId,fetchData])

    const handleWalletSelect= (walletId:string)=>{
        setSelectedWalletId(walletId);
    };

    return{
         data,
    loading,
    error,
    limitPeriod,
    setLimitPeriod,
    selectedWalletId,
    handleWalletSelect,
    refetch: fetchData,
    }
}