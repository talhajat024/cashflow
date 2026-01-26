import { tv } from "tailwind-variants";

export const tabs = tv({
  base: "flex items-center gap-8",
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
    left-0
    -bottom-[6px]
    h-[2px]
    w-full
    bg-white
    rounded-full
    origin-left
    animate-tab-underline
  `,
});
