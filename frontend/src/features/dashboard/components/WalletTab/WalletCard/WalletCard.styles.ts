import { tv } from "tailwind-variants";

export const walletCard = tv({
    slots:{
        container: `
      relative flex flex-col justify-between
      rounded-2xl p-5 cursor-pointer
      min-w-[280px] h-[140px]
      transition-all duration-200
      select-none
    `,
    topRow:    "flex items-start justify-between",
    label:     "text-[11px] font-normal text-white/60 uppercase tracking-wider",
    name:      "text-[16px] font-semibold text-white mt-1",
    number:    "text-[14px] font-medium text-white mt-1 text-right",
    bottomRow: "flex items-end justify-between",
    balanceLabel: "text-[11px] font-normal text-white/60 uppercase tracking-wider",
    balanceAmount:"text-[20px] font-bold text-white mt-1",
    mastercardWrapper: "flex items-center",
    circle1: "w-8 h-8 rounded-full bg-red-500 opacity-90",
    circle2: "w-8 h-8 rounded-full bg-yellow-400 opacity-90 -ml-4",
    },
    variants: {
    selected: {
      true: {
        container: "scale-[1.02] shadow-2xl ring-2 ring-white/30",
      },
      false: {
        container: "opacity-90 hover:opacity-100 hover:scale-[1.01]",
      }
    }
  }
});

export const styles= walletCard();