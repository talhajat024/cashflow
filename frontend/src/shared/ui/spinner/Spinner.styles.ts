// shared/ui/spinner/Spinner.styles.ts
import { tv } from "tailwind-variants";

export const spinner = tv({
  base: "animate-spin rounded-full border-2 border-gray-200 border-t-blue-600",
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    },
    color: {
      primary: "border-t-blue-600",
      white: "border-t-white",
      gray: "border-t-gray-600",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});