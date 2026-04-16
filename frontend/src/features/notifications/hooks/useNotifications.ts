import { useState,useEffect,useCallback,useRef } from "react";
import { useAuth } from "../../auth";
import { notificationApi } from "../api/notifications.api";
import { signalRService } from "../services/signalR.service";
import type { Notification } from "../types/notifications.types";

export const useNotifications= ()=>{
    const {user,isAuthenticated}=useAuth();
    const [notifications,setNotifications]=useState<Notification[]>([]);
    const [loading,setLoading]=useState(false);
    const [unreadCount,setUnreadCount]=useState(0);
    const [isConnected,setIsConnected]=useState(false);
    const isInitialized= useRef(false);
    
    // Get token from token Storage
    const getAccessToken = useCallback(():string|null=>{
        return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    },[]);

    // Fetch notifications from API
    const fetchNotifications=useCallback(async()=>{
        if(!isAuthenticated) return;

        try
        {
            setLoading(true);
            const [fetchedNotifications,count]=await Promise.all([
                notificationApi.getAll(),
                notificationApi.getUnreadCount(),
            ]);
            setNotifications(fetchedNotifications);
            setUnreadCount(count);
        }
        catch(error)
        {
            console.error('Failed to fetch notifications:',error);
        }
        finally{
            setLoading(false);
        }
    },[isAuthenticated]);

    const markAsRead=useCallback(async(id:string)=>{
        setNotifications(prev=>
            prev.map(n=> n.id === id ? {...n,read:true}:n)
        );
        setUnreadCount(prev=> Math.max(0,prev-1));
        try{
            await notificationApi.markAsRead(id);
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

         const previousNotifications = notifications;
        const previousUnreadCount = unreadCount;
        
        // Optimistic update
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
        try{
            await notificationApi.markAllAsRead();
            console.log("All Notifications marked as read");
        }
        catch(error)
        {
            console.error("Failed to mark all as read",error);
              setNotifications(previousNotifications);
            setUnreadCount(previousUnreadCount);
        }
    },[notifications,unreadCount])

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
            setUnreadCount(count => count + 1);
            return [insightNotification, ...prev];
        });
    },[]);

    // Setup SignalR real-time connection
    useEffect(()=>{
        if(!isAuthenticated || !user?.id) return;
        const setupSignalR = async()=> {
            const token= getAccessToken();
            if(!token){
                console.warn('No access token available for signalR connection');
                return;
            }

            // connect to SignalR
            await signalRService.connect(token);
            setIsConnected(signalRService.isConnected);

            // Listen for new Notifications
            const unsubscribeNotification= signalRService.onNotification((newNotification)=>{
                console.log("Real-time notification received:",newNotification);
                setNotifications(prev=> [newNotification,...prev]);
                setUnreadCount(prev => prev+1);

                if(Notification.permission=== 'granted'){
                    new Notification(newNotification.title,{
                        body:newNotification.description,
                        icon:'/notification-icon.png',
                    });
                }
            });

            // Listen for unread count updates
            const unsubscribeUnreadCount = signalRService.onUnreadCountUpdate((count) => {
                console.log('Unread count updated via SignalR:', count);
                setUnreadCount(count);
            });

            // Listen for connection status
            const unsubscribeStatus = signalRService.onConnectionStatus((connected) => {
                setIsConnected(connected);
                if (connected) {
                    console.log('SignalR connected, refreshing notifications');
                    fetchNotifications(); // Refresh when reconnected
                }
            });

            return () => {
                unsubscribeNotification();
                unsubscribeUnreadCount();
                unsubscribeStatus();
            };
        };

        const cleanup = setupSignalR();
        return () => {
            cleanup?.then(unsubscribe => unsubscribe?.());
            signalRService.disconnect();
        };
    },[isAuthenticated,user?.id,getAccessToken,fetchNotifications]);


    // Initial fetch
    useEffect(()=>{
        if(!isInitialized.current && isAuthenticated && user?.id){
            isInitialized.current = true;
            fetchNotifications();

            // request notification permission
            if('Notification' in window && Notification.permission === 'default'){
                Notification.requestPermission();
            }
        }
    },[isAuthenticated,user?.id,fetchNotifications]);

    return{
        notifications,
        loading,
        unreadCount,
        isConnected,
        markAllAsRead,
        markAsRead,
        addInsightNotification,
        refreshNotifications:fetchNotifications,
    };
}

