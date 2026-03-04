// features/notifications/components/NotificationsPanel.styles.ts
import { tv } from "tailwind-variants";

export const notificationsPanel = tv({
  slots: {
    panel: `
      absolute right-0 mt-2 w-96 
      bg-white rounded-xl shadow-2xl border border-gray-200 
      overflow-hidden z-50
    `,
    header: "flex items-center justify-between p-4 border-b border-gray-100",
    headerLeft: "flex items-center gap-2",
    headerTitle: "font-semibold text-gray-900",
    unreadBadge: "px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full",
    closeButton: "p-1 hover:bg-gray-100 rounded-lg transition-colors",
    tabsContainer: "flex border-b border-gray-100",
    tabButton: "flex-1 py-2 text-sm font-medium transition-colors",
    activeTab: "text-blue-600 border-b-2 border-blue-600",
    inactiveTab: "text-gray-500 hover:text-gray-700",
    notificationsList: "max-h-96 overflow-y-auto",
    emptyState: "flex flex-col items-center justify-center py-12 px-4",
    emptyIcon: "w-12 h-12 text-gray-300 mb-3",
    emptyText: "text-sm text-gray-500",
    footer: "p-3 border-t border-gray-100 bg-gray-50",
    footerButton: `
      w-full py-2 text-sm text-gray-600 hover:text-gray-900 
      font-medium text-center rounded-lg hover:bg-gray-100 
      transition-colors
    `,
  },
});

export const styles = notificationsPanel();