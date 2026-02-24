import { tv } from "tailwind-variants";

export const notificationGroup = tv({
  slots: {
    // Container for the entire group
    container: "",
    
    // Date header
    dateHeader: "px-4 py-2 bg-gray-50",
    
    // Date text
    dateText: "text-xs font-medium text-gray-500",
    
    // Container for notifications in this group
    notificationsContainer: "",
  },
});

export const styles = notificationGroup();