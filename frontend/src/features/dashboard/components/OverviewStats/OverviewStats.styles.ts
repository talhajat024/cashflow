import { tv } from "tailwind-variants";

export const statsWrapper = tv({
  base: `
    relative
    z-10
    w-full
  `,
});

export const statsGrid = tv({
  base: `
    grid
    grid-cols-3
    gap-6
  `,
});
