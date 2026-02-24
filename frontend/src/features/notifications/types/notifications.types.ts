export type NotificationType=
 | 'transaction'
 | 'alert'
 | 'reminder'
 | 'achievement'
 | 'system'
 | 'mention';

export interface Notification{
    id:string;
    type:NotificationType;
    title:string;
    description:string;
    timestamp:Date;
    read:boolean;
    actionable?:boolean;
    actionUrl?:string;
    actionLabel?:string;
    metadata?:{
        amount?:number;
        currency?:string;
        category?:string;
        sender?:string;
    };
}

export interface NotificationGroup
{
    date:string;
    items:Notification[];
}

