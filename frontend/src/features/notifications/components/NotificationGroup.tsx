import {styles} from './NotificationGroup.styles';
import { NotificationItem } from "./NotificationItem";
import type { Notification } from "../types/notifications.types";

interface NotificationGroupProps{
    date:string,
    notifications:Notification[],
    onMarkAsRead?:(id:string)=> void;
    onNotificationClick?:(notification:Notification)=> void;
}

export const NotificationGroup=({
    date,
    notifications,
    onMarkAsRead,
    onNotificationClick
}:NotificationGroupProps)=>{
    if(notifications.length === 0)
    {
        return null;
    }

    return(
        <div className={styles.container()}>
            {/* Date Header */}
            <div className={styles.dateHeader()}>
                <span className={styles.dateText()}>{date}</span>
            </div>

            {/* Notifications */}
            <div className={styles.notificationsContainer()}>
                {notifications.map((notification)=>(
                    <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onClick={onNotificationClick}/>
                ))}
            </div>
        </div>
    )
}

