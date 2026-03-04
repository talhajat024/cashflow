  import { tv } from "tailwind-variants";

  export const badge = tv({
    base: `
      inline-flex
      items-center
      justify-center
      rounded-[8px]
      px-2
      py-[4px]
      text-[12px]
      font-semibold
    `,
    variants: {
      intent: {
        shortcut: 'bg-white/20 text-white/80',
        searchShortcut: 'bg-white text-blue-600',
      },
    },
    defaultVariants: {
      intent: 'shortcut',
    },
  });
