import { tv } from "tailwind-variants";

export const modalOverlay = tv({
  base: `
    fixed inset-0
    bg-black/50
    flex items-center justify-center
    z-50
  `,
});

export const modalContainer = tv({
  base: `
    bg-white
    rounded-lg
    shadow-xl
    w-full max-w-lg
    p-6
    relative
    animate-fadeIn
  `,
});

export const modalTitle = tv({
  base: `
    text-lg font-semibold mb-4
  `,
});

export const modalClose = tv({
  base: `
    absolute top-3 right-3
    text-gray-500 hover:text-gray-700
    cursor-pointer
    text-xl
  `,
});

export const modalContent = tv({
  base: `
    max-h-[70vh]
    overflow-y-auto
  `,
});