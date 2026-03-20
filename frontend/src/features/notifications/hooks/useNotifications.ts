import { useState,useEffect,useCallback } from "react";
import type { Notification } from "../types/notifications.types";


// Mock data will be replaced by api call
const mockNotifications: Notification[]=[
    {
        id:'1',
        type:'transaction',
        title:'Large Transaction Detected',
        description:'Amazon purchase of $2,050.00',
        timestamp:new Date(Date.now() - 30*60000),
        read:false,
        actionable:true,
        actionUrl:'/transaction/123',
        actionLabel:'View Transaction',
        metadata:{
            amount:2050,
            currency:'USD',
            category:'Shopping'
        }
    },
    {
        id:'2',
        type:'reminder',
        title:'Invoice Due Tomorrow',
        description:'Invoice #INV-2024-001 for $1,200.00',
        timestamp:new Date(Date.now() - 5*3600000),
        read:false,
        actionable:true,
        actionUrl:'/invoices/123',
        actionLabel:'Pay Now',
        metadata:{
            amount:1200,
            currency:'USD'
        }
    },
    {
        id:'3',
        type:'achievement',
        title:'Savings Goal Milestone',
        description:'You\'ve reached 50% of your $10,000 goal!',
        timestamp:new Date(Date.now() - 24*3600000),
        read:true,
        metadata:{
            amount:5000,
            currency:"USD"
        }
    },
    {
        id: '4',
        type: 'alert',
        title: 'Unusual Spending Pattern',
        description: 'Shopping category is 45% above monthly average',
        timestamp: new Date(Date.now() - 2 * 24 * 3600000), // 2 days ago
        read: true,
        actionable: true,
        actionUrl: '/analytics/spending',
        actionLabel: 'Review'
    }
];


export const useNotifications= ()=>{
    const [notifications,setNotifications]=useState<Notification[]>([]);
    const [loading,setLoading]=useState(false);
    const [unreadCount,setUnreadCount]=useState(0);

    // Fetch notifications 
    useEffect(()=>{
        const fetchNotifications=async()=>{
            try{
                setLoading(true);
                await new Promise(resolve=> setTimeout(resolve,1000));
                setNotifications(mockNotifications)
                setUnreadCount(mockNotifications.filter(n=> !n.read).length);
            }
            catch(error)
            {
                console.error('Failed to fetch notifications',error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchNotifications();   
    },[])

    const markAsRead=useCallback(async(id:string)=>{
        try{
            setNotifications(prev=>{
                const updated = prev.map(n=>
                    n.id === id? {...n,read:true}:n
                );
                return updated;
            });

            setUnreadCount(prev=> Math.max(0,prev-1));
            await new Promise(resolve=> setTimeout(resolve,300));
            console.log(`Notification ${id} marked as read`);
        }
        catch(error)
        {
            console.error('Failed to mark as read:',error);
            setNotifications(prev=>
                prev.map(n=> n.id === id ? {...n,read:false}:n)
            );
            setUnreadCount(prev=> prev+1);
        }
    },[])

    const markAllAsRead=useCallback(async ()=>{
        try{
            setNotifications(prev=> prev.map(n=> ({...n,read:true})));
            setUnreadCount(0);
            
            // simulate api call
            await new Promise(resolve=> setTimeout(resolve,500))
            console.log("All Notifications marked as read");

        }
        catch(error)
        {
            console.error("Failed to mark all as read",error);
        }
    },[])

    const addInsightNotification = useCallback((insightText:string)=>{
        if(!insightText) return;
        setNotifications(prev=> {
            const alreadyExists= prev.some(n=> n.id === 'insight-ai');
            if(alreadyExists) return prev;

            const insightNotification:Notification={
                id:'insight-ai',
                type:'alert',
                title:'AI Financial Insight',
                description:insightText,
                timestamp:new Date(),
                read:false,
                actionable:false,
            };
            return [insightNotification, ...prev];
        });

        setNotifications(prev =>{
            const exists= prev.find(n=> n.id === 'insight-ai');
            if(exists && !exists.read)
            {
                setUnreadCount(count => count+1);
            }
            return prev;
        });
    },[]);

    return{
        notifications,
        loading,
        unreadCount,
        markAllAsRead,
        markAsRead,
        addInsightNotification,
    };
}

