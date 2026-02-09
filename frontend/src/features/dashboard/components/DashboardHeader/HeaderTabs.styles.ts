import { tv } from "tailwind-variants";

export const tabsContainer = tv({
  base: "relative",
});

export const tabs = tv({
  base: "flex items-center gap-10 relative z-10",
});

export const tabItem = tv({
  base: `
    relative
    text-[14px]
    font-medium
    text-white/70
    cursor-pointer
    transition-colors
    duration-200
    py-2
  `,
  variants: {
    active: {
      true: "text-white",
      false: "hover:text-white",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const tabUnderline = tv({
  base: `
    absolute
    bottom-0
    h-[2px]
    bg-white
    rounded-full
    transition-transform
    transition-width
    duration-300
    ease-out
    z-20
  `,
});

// Add this new style for the base underline
export const baseUnderline = tv({
  base: "absolute left-0 right-0 bottom-0 h-[1px] bg-white/20",
});