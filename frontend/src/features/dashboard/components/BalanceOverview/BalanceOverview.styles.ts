import { tv } from "tailwind-variants";

export const header = tv({
  base: "flex items-start justify-between",
});

export const titleText = tv({
  base: "text-sm font-semibold text-gray-900",
});

export const legendContainer = tv({
  base: "mt-1 flex gap-6 items-center",
});

export const legendItem = tv({
  base: "flex items-center gap-2 text-sm font-medium text-gray-600",
});

export const legendDot = tv({
  base: "w-2.5 h-2.5 rounded-full",
  variants: {
    color: {
      blue: "bg-blue-600",
      orange: "bg-orange-400", 
    },
  },
});

export const legendText = tv({
  base: "text-xs text-gray-500 font-medium",
});

export const periodButton = tv({
  base: "text-xs px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-50",
});

export const chartWrapper = tv({
  base: "h-[260px]",
});
