import  { useState } from "react";
import { Bell,X } from "lucide-react";
import {styles} from './NotificationsPanel.styles';
import { NotificationGroup } from "./NotificationGroup";
import { useNotifications } from "../hooks/useNotifications";
import { groupNotificationsByDate } from "../utils/dateUtils";
import type { Notification } from "../types/notifications.types";


interface NotificationsPanelProps{
 onClose :()=> void;
}

export const NotificationsPanel=({onClose}:NotificationsPanelProps)=>{
    const [activeTab,setActiveTab]=useState<'all'|'unread'>('all');
    const {notifications,unreadCount,markAsRead,markAllAsRead}=useNotifications();

    const filterNotifications= activeTab === 'unread' ? notifications.filter(n=> !n.read):notifications;

    // Group Notifications by date
    const groupedNotifications= groupNotificationsByDate(filterNotifications);

    const handleNotificationClick=(notification:Notification)=>{
        if(!notification.read)
        {
            markAsRead(notification.id);
        }
        onClose();
    }

    const handleMarkAllAsRead=async()=>{
        await markAllAsRead();
    }

    return(
        <div className={styles.panel()}>
            {/* Header */}
            <div className={styles.header()}>
                <div className={styles.headerLeft()}>
                    <Bell className="w-5 h-5 text-gray-700"/>
                    <h3 className={styles.headerTitle()}>
                        Notifications
                    </h3>
                    {unreadCount > 0 && (
                        <span className={styles.unreadBadge()}>
                            {unreadCount} new
                        </span>
                    )}
                </div>

                <button onClick={onClose}
                className={styles.closeButton()}
                aria-label="Close notifications">
                    <X className="w-4 h-4 text-gray-500"/>
                </button>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer()}>
                <button
                onClick={()=> setActiveTab('all')}
                className={`${styles.tabButton()} ${
                activeTab === 'all' ? styles.activeTab() : styles.inactiveTab()
                 }`}>All</button>

            <button onClick={()=> setActiveTab('unread')}
                className={`${styles.tabButton()} ${
            activeTab === 'unread' ? styles.activeTab() : styles.inactiveTab()
          }`}>
            Unread
            </button>
        </div>

        {/* Notifications List */}
        <div className={styles.notificationsList()}>
            {groupedNotifications.length === 0 ? (
                <div className={styles.emptyState()}>
                    <Bell className={styles.emptyIcon()}/>
                    <p className={styles.emptyText()}>
                        {activeTab === 'unread' ? 'No unread notifications': 'No notifications yet'}
                    </p>
                </div>
            ):(
                groupedNotifications.map((group)=>(
                    <NotificationGroup
                    key={group.date}
                    date={group.date}
                    notifications={group.items}
                    onMarkAsRead={markAsRead}
                    onNotificationClick={handleNotificationClick}/>
                ))
            )}
        </div>

        {unreadCount > 0 && (
            <div className={styles.footer()}>
                <button onClick={handleMarkAllAsRead} className={styles.footerButton()}>Mark all as read</button>
            </div>
        )}
        </div>
    )
}