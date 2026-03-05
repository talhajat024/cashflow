import { useState,useEffect } from "react";
import { getCurrentUser , logout as apiSignOut } from "../../auth/api/auth.api";
import type { User } from "../types/user.types";

const MOCK_USER:User={
    id:'1',
    name:'Talha Khan',
    email:'talha@example.com',
    initials:'TK',
    avatar:'/avatar.jpg',
    role:'user',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
};

export const useUser=()=>{
    const [user,setUser]=useState<User | null>(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string|null>(null);
    const [usingMockData,setUsingMockData]=useState(false);


    const fetchUser=async()=>{
        try
        {
            setLoading(true);
            setError(null);
            setUsingMockData(false);

            const userData= await getCurrentUser();
            setUser(userData);
        }
        catch(err)
        {
            console.warn('API fetch failed,using mock data:',err);
            setUser(MOCK_USER);
            setUsingMockData(true);
            setError(err instanceof Error ? err.message :"Failed to fetch user");
        }
        finally{
            setLoading(false);
        }
    };



    useEffect(()=>{
        fetchUser();
    },[])

    const signOut=async()=>{
      try{
        await apiSignOut();
        setUser(null);
        setUsingMockData(false);
        window.location.href='/login';
      }
      catch(err)
      {
        console.error("Signout failed");
        if(usingMockData)
        {
            setUser(null);
            window.location.href='/login';
        }
      }
    };


    const refreshUser=async()=>{
        await fetchUser();
    }

    return {
        user,
        loading,
        error,
        usingMockData,
        signOut,
        refreshUser,
    }
}