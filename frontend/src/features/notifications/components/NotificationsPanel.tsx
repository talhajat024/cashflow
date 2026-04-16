import  { useState } from "react";
import { Bell,X,WifiOff } from "lucide-react";
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
    const { notifications, 
        unreadCount, 
        markAsRead, 
        markAllAsRead,
        isConnected,
        loading }=useNotifications();

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
        console.log("notifications are:",notifications);
        await markAllAsRead();
    }

    return(
        <div className={styles.panel()}>
            {/* Header */}
            <div className={styles.header()}>
                <div className={styles.headerLeft()}>
                    <Bell className="w-5 h-5 text-gray-700" />
                    <h3 className={styles.headerTitle()}>
                        Notifications
                    </h3>
                    {unreadCount > 0 && (
                        <span className={styles.unreadBadge()}>
                            {unreadCount} new
                        </span>
                    )}
                    {/* Connection status indicator */}
                    {!isConnected && !loading && (
                        <span className="ml-2 flex items-center gap-1 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                            <WifiOff className="w-3 h-3" />
                            Reconnecting...
                        </span>
                    )}
                </div>

                <button 
                    onClick={onClose}
                    className={styles.closeButton()}
                    aria-label="Close notifications"
                >
                    <X className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer()}>
                <button
                    onClick={() => setActiveTab('all')}
                    className={`${styles.tabButton()} ${
                        activeTab === 'all' ? styles.activeTab() : styles.inactiveTab()
                    }`}
                >
                    All
                    {notifications.length > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                            {notifications.length}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('unread')}
                    className={`${styles.tabButton()} ${
                        activeTab === 'unread' ? styles.activeTab() : styles.inactiveTab()
                    }`}
                >
                    Unread
                    {unreadCount > 0 && (
                        <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Notifications List */}
            <div className={styles.notificationsList()}>
                {loading ? (
                    <div className={styles.emptyState()}>
                        <Bell className={styles.emptyIcon()} />
                        <p className={styles.emptyText()}>Loading notifications...</p>
                    </div>
                ) : groupedNotifications.length === 0 ? (
                    <div className={styles.emptyState()}>
                        <Bell className={styles.emptyIcon()} />
                        <p className={styles.emptyText()}>
                            {activeTab === 'unread' 
                                ? 'No unread notifications' 
                                : 'No notifications yet'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            We'll notify you when something arrives
                        </p>
                    </div>
                ) : (
                    groupedNotifications.map((group) => (
                        <NotificationGroup
                            key={group.date}
                            date={group.date}
                            notifications={group.items}
                            onMarkAsRead={markAsRead}
                            onNotificationClick={handleNotificationClick}
                        />
                    ))
                )}
            </div>

            {/* Footer - Mark all as read button */}
            {unreadCount > 0 && (
                <div className={styles.footer()}>
                    <button 
                        onClick={handleMarkAllAsRead} 
                        className={styles.footerButton()}
                    >
                        Mark all as read
                    </button>
                </div>
            )}
        </div>
    )
}