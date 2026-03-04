// features/user/components/UserMenu/UserMenu.styles.ts
import { tv } from "tailwind-variants";

export const userMenu = tv({
  slots: {
    container: "relative",
    
    avatarButton: `
      flex items-center justify-center focus:outline-none 
      focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full
    `,
    
    dropdown: `
      absolute right-0 mt-2 w-64 
      bg-white rounded-xl shadow-2xl border border-gray-200 
      py-2 z-50
    `,

    userInfo: "px-4 py-3 border-b border-gray-100",
    
    userName: "text-sm font-semibold text-gray-900",
    
    userEmail: "text-xs text-gray-500 mt-0.5",
 
    loadingContainer: "flex items-center gap-2",
    
    loadingSpinner: "w-5 h-5 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin",
    
    menuSection: "py-2",
    
    menuItem: `
      w-full flex items-center gap-3 px-4 py-2 
      text-sm text-gray-700 hover:bg-gray-50 
      transition-colors cursor-pointer
    `,
    
    menuItemIcon: "w-4 h-4 text-gray-500",
    
    menuItemText: "flex-1 text-left",
    
    divider: "h-px bg-gray-100 my-2",
    
    signOutItem: `
      w-full flex items-center gap-3 px-4 py-2 
      text-sm text-red-600 hover:bg-red-50 
      transition-colors cursor-pointer
    `,
  },
});

export const styles = userMenu();