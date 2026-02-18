// shared/ui/page-skeleton/PageSkeleton.styles.ts
import { tv } from "tailwind-variants";

export const pageSkeleton = tv({
  slots: {
    // Main wrapper
    wrapper: "bg-white rounded-xl border border-gray-100 p-6 space-y-6",
    
    // Grid sections
    statsSection: "grid grid-cols-1 gap-6 md:grid-cols-3",
    twoColSection: "grid grid-cols-1 gap-6 lg:grid-cols-2",
    
    // Card style for stat boxes
    statCard: "bg-white rounded-xl border border-gray-100 p-5 space-y-3",
    
    // Base box with gradient shimmer
    box: "relative overflow-hidden bg-gray-100 rounded-lg",
    
    // Shimmer overlay
    shimmer: `absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]
              bg-gradient-to-r from-transparent via-white/30 to-transparent`,
  },
  variants: {
    size: {
      xs: "h-4",     // Extra small (labels)
      sm: "h-5",     // Small (text)
      md: "h-6",     // Medium (values)
      lg: "h-8",     // Large (titles)
      xl: "h-10",    // Extra large (buttons)
      card: "h-32",  // Stat card height
      chart: "h-80", // Chart height
      table: "h-64", // Table height
    },
    width: {
      full: "w-full",
      auto: "w-auto",
      third: "w-1/3",
      half: "w-1/2",
      quarter: "w-1/4",
    }
  },
  defaultVariants: {
    size: "md",
    width: "full",
  },
});

export const styles = pageSkeleton();