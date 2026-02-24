import { tv } from "tailwind-variants";

export const notificationItem=tv({
    slots:{
        // main container
        container:`
        flex gap-3 p-4 border-b border-gray-50 cursor-pointer
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
      iconContainer:"w-10 h-10 rounded-full flex items-center justify-center",
      contentContainer: "flex-1 min-w-0",
      headerRow: "flex items-start justify-between gap-2",
      title: "text-sm truncate max-w-[180px]",
      timestamp: "text-xs text-gray-400 whitespace-nowrap",
      description: "text-xs line-clamp-2 mt-1",
      metadata: "text-xs font-medium text-gray-700 mt-1",
       actionButton: `
      inline-flex items-center gap-1 mt-2 text-xs font-medium
      transition-colors focus:outline-none focus:underline
    `,
    unreadDot: "w-2 h-2 bg-blue-600 rounded-full animate-pulse",
    unreadDotContainer: "flex-shrink-0 pt-2",
    },
    variants:{
        readState:{
            unread:{
                container: "bg-blue-50/30 hover:bg-blue-50/50",
                title: "font-semibold text-gray-900",
                description: "text-gray-600",
                actionButton: "text-blue-600 hover:text-blue-700",
                iconContainer: "bg-blue-100",
            },
            read:{
                container: "hover:bg-gray-50",
                title: "text-gray-700",
                description: "text-gray-500",
                actionButton: "text-gray-500 hover:text-blue-700",
                iconContainer: "bg-gray-100",
            }
        }
    },
     defaultVariants: {
    readState: "read",
  },

})

export const styles = notificationItem();