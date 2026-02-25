import { tv } from "tailwind-variants";

export const timeRangeSelect = tv({
  slots: {
    container: "relative",
    trigger: `
      flex items-center gap-2 rounded-xl border border-gray-200 
      px-4 py-2 text-sm text-gray-700 
      hover:bg-gray-50 transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    `,  
    triggerText: "text-sm",
    calendarIcon: "w-4 h-4 text-gray-500",
    chevronIcon: "w-3.5 h-3.5 text-gray-500 transition-transform duration-200",
    dropdown: `
      absolute right-0 mt-1 w-48 
      bg-white rounded-lg shadow-lg border border-gray-200 
      py-1 z-50
      animate-in fade-in slide-in-from-top-2 duration-200
    `,
    item: `
      w-full text-left px-4 py-2 text-sm 
      hover:bg-gray-50 transition-colors
      focus:outline-none focus:bg-gray-50
    `,
    itemActive: "bg-blue-50 text-blue-600 font-medium",
    itemInactive: "text-gray-700",
    divider: "h-px bg-gray-100 my-1",
  },
});

export const styles = timeRangeSelect();