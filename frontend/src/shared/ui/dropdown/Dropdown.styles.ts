import { tv } from "tailwind-variants";

export const dropdownWrapper = tv({
  base: `
    relative
  `,
});

export const dropdownPanel = tv({
  base: `
    absolute mt-2 w-80
    bg-white rounded-lg shadow-lg
    border border-gray-200
    p-4 z-50
  `,
  variants: {
    align: {
      left: "left-0",
      right: "right-0",
    },
  },
  defaultVariants: {
    align: "right",
  },
});