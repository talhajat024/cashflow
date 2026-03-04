// shared/ui/page-skeleton/PageSkeleton.styles.ts
import { tv } from "tailwind-variants";

export const skeletonStyles = tv({
  slots: {
    // Layout containers
    page: "space-y-6",
    gridCols2: "grid grid-cols-2 gap-6",
    gridCols3: "grid grid-cols-3 gap-6",
    gridCols4: "grid grid-cols-4 gap-6",
    
    // Cards
    card: "bg-white rounded-xl border border-gray-100 p-5",
    cardCompact: "bg-white rounded-xl border border-gray-100 p-4",
    
    // Typography skeletons
    h1: "h-8 rounded-lg animate-pulse bg-gray-200",
    h2: "h-6 rounded animate-pulse bg-gray-200",
    h3: "h-5 rounded animate-pulse bg-gray-200",
    body: "h-4 rounded animate-pulse bg-gray-200",
    small: "h-3 rounded animate-pulse bg-gray-200",
    
    // Value skeletons
    value: "h-8 rounded animate-pulse bg-gray-200",
    valueLarge: "h-10 rounded animate-pulse bg-gray-200",
    valueSmall: "h-5 rounded animate-pulse bg-gray-200",
    
    // Chart elements
    chart: "h-48 rounded-lg animate-pulse bg-gray-200",
    chartLarge: "h-64 rounded-lg animate-pulse bg-gray-200",
    chartBar: "h-32 w-full rounded animate-pulse bg-gray-200",
    pieChart: "w-24 h-24 rounded-full animate-pulse bg-gray-200",
    
    // Status badges
    badge: "h-5 rounded-full animate-pulse bg-gray-200",
    badgeSuccess: "h-5 rounded-full animate-pulse bg-green-200",
    badgeWarning: "h-5 rounded-full animate-pulse bg-yellow-200",
    badgeInfo: "h-5 rounded-full animate-pulse bg-blue-200",
    
    // Spacing utilities
    flex: "flex items-center gap-2",
    flexBetween: "flex items-center justify-between",
    flexCol: "flex flex-col gap-2",
    flexWrap: "flex flex-wrap gap-4",
    
    // Dividers
    divider: "h-px w-full bg-gray-100 my-4",
  },
});

// Export the styles object
export const styles = skeletonStyles();