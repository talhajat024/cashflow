import { cva } from "class-variance-authority";

export const card = cva(
  "bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] w-full grid grid-cols-[1fr_auto] gap-y-6"
);

export const header = cva("flex flex-col items-start");

export const headerRight = cva("flex justify-end");

export const titleText = cva(
  "text-lg font-semibold text-gray-800"
);

export const periodText = cva(
  "text-xs text-gray-400 mt-1"
);

export const iconWrapper = cva(
  "w-10 h-10 rounded-xl flex items-center justify-center",
  {
    variants: {
      tone: {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        red: "bg-red-50 text-red-500",
      },
    },
    defaultVariants: {
      tone: "blue",
    },
  }
);

export const content = cva("flex flex-col items-start"); 

export const contentRight = cva("flex items-center justify-end");

export const valueText = cva(
  "text-2xl font-semibold text-gray-900"
);

export const trendText = cva("text-sm mt-1", {
  variants: {
    positive: {
      true: "text-green-600",
      false: "text-red-500",
    },
  },
});

export const chartWrapper = cva(
  "flex items-center justify-end" // Right-aligned to match icon column
);