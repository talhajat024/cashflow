import React from "react";
import { ChevronRight } from "lucide-react";
import {styles} from './NotificationItem.styles';
import { getNotificationIcon } from "../utils/iconUtils";
import { formatNotificationTime } from "../utils/dateUtils";
import type { Notification } from "../types/notifications.types";

interface NotificationItemProps
{
    notification:Notification,
    onMarkAsRead?:(id:string)=> void;
    onClick?:(notification:Notification)=> void;
}

export const NotificationItem=({
    notification,
    onMarkAsRead,
    onClick
}:NotificationItemProps)=>{

  const readState= notification.read ? 'read' :'unread';
  const handleClick= ()=>{
    if(!notification.read && onMarkAsRead)
    {
      onMarkAsRead(notification.id);
    }
    if(onClick)
    {
      onClick(notification);
    }
    else if(notification.actionUrl){
      window.location.href=notification.actionUrl;
    }
  };

  const handleActionClick = (e:React.MouseEvent)=>{
    e.stopPropagation();
    if(notification.actionUrl)
      {
        window.location.href=notification.actionUrl;
      }
  };

    return(
      <div onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e)=>{
        if(e.key === 'Enter' || e.key === ' ')
        {
          handleClick();
        }
      }}
      className={styles.container({readState})}>

        {/*Icon  */}
        <div className={styles.iconContainer({readState})}>
          {getNotificationIcon(notification.type)}
        </div>

        {/* Content */}
        <div className={styles.contentContainer()}>
          <div className={styles.headerRow()}>
            <p className={styles.title({readState})}>
              {notification.title}
            </p>
            <span className={styles.timestamp()}>
              {formatNotificationTime(notification.timestamp)}
            </span>
          </div>

        <p className={styles.description({readState})}>
          {notification.description}
        </p>

        {notification.metadata?.amount && (
          <p className={styles.metadata()}>
            {notification.metadata.currency} {notification.metadata.amount.toLocaleString()}
            {notification.metadata.category && `  • ${notification.metadata.category}`}
          </p>
        )}

        {/* Action Button */}
        {notification.actionable && notification.actionLabel && (
          <button
          onClick={handleActionClick}
          className={styles.actionButton({readState})}>
            {notification.actionLabel}
            <ChevronRight className="w-3 h-3"/>
          </button>
        )}
        </div>

        {/* Unread Dot */}
        {!notification.read && (
          <div className={styles.unreadDotContainer()}>
            <div className={styles.unreadDot()}/>
          </div>
        )}
      </div>
    )
}