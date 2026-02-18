import { tv } from "tailwind-variants";

export const wrapper = tv({
  base: `
    flex
    flex-col
    items-center
    justify-center
    text-center
    py-16
    px-6
    rounded-xl
    border
    border-red-200
    bg-red-50
  `,
});

export const title = tv({
  base: `
    text-lg
    font-semibold
    text-red-700
  `,
});

export const message = tv({
  base: `
    mt-2
    text-sm
    text-red-600
  `,
});

export const retryButton = tv({
  base: `
    mt-6
    inline-flex
    items-center
    justify-center
    rounded-lg
    bg-red-600
    px-4
    py-2
    text-sm
    font-medium
    text-white
    transition
    hover:bg-red-700
  `,
});
