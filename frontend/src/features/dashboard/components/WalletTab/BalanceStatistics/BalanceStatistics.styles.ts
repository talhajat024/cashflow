import { tv } from "tailwind-variants";

export const balanceStatistics = tv({
  slots: {
    header:         "flex items-center justify-between mb-4",
    title:          "text-[16px] font-semibold text-gray-900",
    menuButton:     "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
    chartWrapper:   "w-full h-[280px] relative",
  }
});

export const styles = balanceStatistics();