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

      draft: 'bg-gray-100 text-gray-600',
      pending: 'bg-yellow-100 text-yellow-700',
      paid: 'bg-green-100 text-green-700',
      overdue: 'bg-red-100 text-red-700',
      cancelled: 'bg-gray-100 text-gray-500',
      },
    },
    defaultVariants: {
      intent: 'shortcut',
    },
  });
