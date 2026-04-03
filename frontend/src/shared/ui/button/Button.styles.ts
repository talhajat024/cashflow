import { tv } from "tailwind-variants";

export const button = tv({
  base: `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    font-semibold
    transition-all
    duration-200
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
  variants: {
    variant: {
      primary: `
        bg-blue-500 
        text-white 
        hover:bg-blue-600 
        focus:ring-blue-500
        active:bg-blue-700
      `,
      secondary: `
        bg-gray-100 
        text-gray-700 
        hover:bg-gray-200 
        focus:ring-gray-400
        active:bg-gray-300
      `,
      outline: `
        border 
        border-gray-300 
        bg-white 
        text-gray-700 
        hover:bg-gray-50 
        hover:border-gray-400
        focus:ring-gray-400
      `,
      ghost: `
        text-gray-600 
        hover:bg-gray-100 
        hover:text-gray-900
        focus:ring-gray-400
      `,
      danger: `
        bg-red-500 
        text-white 
        hover:bg-red-600 
        focus:ring-red-500
        active:bg-red-700
      `,
    },
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    fullWidth: false,
  },
});