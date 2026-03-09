import { tv } from "tailwind-variants";

export const messageList = tv({
  base: `
    space-y-4 max-h-64 overflow-y-auto
  `,
});

export const messageItem = tv({
  base: `
    p-3 rounded-md transition-colors
  `,
  variants: {
    read: {
      true: "bg-gray-50",
      false: "bg-blue-50",
    },
  },
  defaultVariants: {
    read: false,
  },
});

export const messageHeader = tv({
  base: `
    flex justify-between items-center mb-1
  `,
});

export const messageTitle = tv({
  base: `
    font-semibold text-sm
  `,
});

export const messageTimestamp = tv({
  base: `
    text-xs text-gray-500
  `,
});

export const messageBody = tv({
  base: `
    text-sm text-gray-700
  `,
});