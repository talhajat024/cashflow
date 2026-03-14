// features/dashboard/components/WalletTab/CardLimit/CardLimit.styles.ts
import { tv } from "tailwind-variants";

export const cardLimit = tv({
  slots: {
    header:          "flex items-center justify-between",
    title:           "text-[16px] font-semibold text-gray-400",

    contentBox:      "flex flex-col justify-center py-2 px-2",
    
    amountRow:       "flex items-baseline gap-3",
    usedAmount:      "text-[28px] font-bold text-gray-900",
    totalLabel:      "text-[14px] font-normal text-gray-400",

    progressWrapper: "flex items-center gap-2 mt-4 w-full overflow-hidden",
    progressBar:     "h-[7px] rounded-full flex-shrink-0",
  }
});

export const styles = cardLimit();