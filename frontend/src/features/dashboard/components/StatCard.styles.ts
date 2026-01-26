import { cva } from "class-variance-authority";

export const card = cva(
  "bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] w-full"
);

export const header = cva(
  "flex items-start justify-between"
);

export const titleText = cva(
  "text-sm font-semibold text-gray-700"
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

export const content = cva(
  "mt-6 flex items-end justify-between"
);

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
  "w-[88px] h-8 flex items-end"
);
