import { tv } from "tailwind-variants";

export const tabs = tv({
  base: `
    relative
    flex items-center gap-8
    after:absolute
    after:left-0
    after:right-0
    after:-bottom-[6px]
    after:h-[1px]
    after:bg-white/30
  `,
});

export const tabItem = tv({
  base: `
    relative
    text-[14px]
    font-normal
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
