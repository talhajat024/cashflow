import { DollarSign,AlertCircle,Calendar,TrendingUp,AtSign,Info,Bell,ChevronRight } from "lucide-react";
import type { NotificationType } from "../types/notifications.types";

interface IconProps
{
    className?:string;
}

export const getNotificationIcon=(type:NotificationType,className:string="w-5 h-5")=>{
    const iconProps={className};
    switch(type)
    {
        case 'transaction':
            return <DollarSign {...iconProps} className={`${className} text-blue-500`}/>;
        case 'alert':
            return <AlertCircle {...iconProps} className={`${className} text-red-500`}/>
        case "reminder":
            return <Calendar {...iconProps} className={`${className} text-yellow-500`} />;
        case "achievement":
            return <TrendingUp {...iconProps} className={`${className} text-green-500`} />;
        case "mention":
            return <AtSign {...iconProps} className={`${className} text-purple-500`} />;
        case "system":
            return <Info {...iconProps} className={`${className} text-gray-500`} />;
        default:
            return <Bell {...iconProps} className={`${className} text-gray-500`} />;
    }
};


// bg color class for notification type
export const getNotificationBgColor = (type: NotificationType): string => {
  switch (type) {
    case 'transaction':
      return 'bg-blue-100';
    case 'alert':
      return 'bg-red-100';
    case 'reminder':
      return 'bg-yellow-100';
    case 'achievement':
      return 'bg-green-100';
    case 'mention':
      return 'bg-purple-100';
    case 'system':
      return 'bg-gray-100';
    default:
      return 'bg-gray-100';
  }
};

export const getNotificationTextColor = (type: NotificationType): string => {
  switch (type) {
    case 'transaction':
      return 'text-blue-600';
    case 'alert':
      return 'text-red-600';
    case 'reminder':
      return 'text-yellow-600';
    case 'achievement':
      return 'text-green-600';
    case 'mention':
      return 'text-purple-600';
    case 'system':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};


export const getNotificationTypeLabel = (type: NotificationType): string => {
  switch (type) {
    case 'transaction':
      return 'Transaction';
    case 'alert':
      return 'Alert';
    case 'reminder':
      return 'Reminder';
    case 'achievement':
      return 'Achievement';
    case 'mention':
      return 'Mention';
    case 'system':
      return 'System Update';
    default:
      return 'Notification';
  }
};

export const getActionIcon = (actionable: boolean) => {
  if (!actionable) return null;
  return <ChevronRight className="w-4 h-4 text-gray-400" />;
};