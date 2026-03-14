import { tv } from "tailwind-variants";

export const walletCard = tv({
  slots: {
    container: `
      flex flex-col flex-1
      rounded-2xl overflow-hidden
      cursor-pointer select-none
      transition-all duration-200
    `,
    gradientSection: `px-5 pt-4 pb-5`,
    topRow:          `flex items-start justify-between`,
    label:           `text-[11px] font-normal text-white/60 uppercase tracking-wider mb-1`,
    name:            `text-[16px] font-semibold text-white`,
    number:          `text-[14px] font-medium text-white`,
    whiteSection:    `flex items-center justify-between bg-white px-5 py-4`,
    balanceLabel:    `text-[11px] font-normal text-gray-400 uppercase tracking-wider mb-1`,
    balanceAmount:   `text-[20px] font-bold text-gray-900`,
    mastercardWrapper: `flex items-center`,
    circle1:         `w-9 h-9 rounded-full bg-red-500 opacity-90`,
    circle2:         `w-9 h-9 rounded-full bg-yellow-400 opacity-90 -ml-4`,
  },
 
});

export const styles = walletCard();