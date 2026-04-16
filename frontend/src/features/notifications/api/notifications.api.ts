import { httpClient } from "../../../shared/api/httpClient";
import type { Notification } from "../types/notifications.types";

interface BackendNotification {
    id:string;
    type:string;
    title:string;
    message:string;
    isRead:boolean;
    createdAt:string;
    readAt?:string;
    amount?:number;
    currency?:string;
}

export const notificationApi={
    getAll:async():Promise<Notification[]> => {
        const response = await httpClient.get<BackendNotification[]>('/notifications');
        return response.data.map(transformBackendToFrontend);
    },
    getUnreadCount:async():Promise<number>=>{
        const response = await httpClient.get<{unreadCount:number}>('/notifications/unread-count');
        return response.data.unreadCount;
    },
    markAsRead:async(id:string):Promise<void>=>{
        await httpClient.put(`/notifications/${id}/read`);
    },
    markAllAsRead:async():Promise<void>=>{
        await httpClient.put('/notifications/mark-all-read');
    },
};

function transformBackendToFrontend(backend:BackendNotification):Notification{
    let type:Notification['type']='system';
    if(backend.type?.includes('invoice') || backend.type?.includes('payment')){
        type = 'transaction';
    } else if (backend.type?.includes('alert')) {
        type = 'alert';
    } else if (backend.type?.includes('reminder')) {
        type = 'reminder';
    } else if (backend.type?.includes('achievement')) {
        type = 'achievement';
    } else if (backend.type?.includes('mention')) {
        type = 'mention';
    }
    
    return {
        id: backend.id,
        type,
        title: backend.title,
        description: backend.message,
        timestamp: new Date(backend.createdAt),
        read: backend.isRead,
        actionable: backend.type === 'invoice_created' || backend.type === 'payment_received',
        actionUrl: backend.type === 'invoice_created' ? '/dashboard/invoice' : undefined,
        actionLabel: backend.type === 'invoice_created' ? 'View Invoice' : undefined,
        metadata: {
            amount: backend.amount,
            currency: backend.currency,
            category: backend.type,
        },
    }; 
}