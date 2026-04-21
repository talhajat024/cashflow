import { CheckCircle,XCircle } from "lucide-react";

interface NotificationToastProps{
    notification:{type:'success' | 'error';message:string} | null;
}

export function NotificationToast({notification}:NotificationToastProps){
    if(!notification) return null;
    const isSuccess= notification.type === 'success';

    return(
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            isSuccess ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
             {isSuccess ? <CheckCircle size={18} /> : <XCircle size={18} />}
             {notification.message}
        </div>        
    )
}
