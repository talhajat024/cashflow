// features/dashboard/components/WalletTab/LastTransaction/LastTransaction.styles.ts
import { tv } from "tailwind-variants";

export const lastTransaction = tv({
  slots: {
    header:     "flex items-center justify-between",
    title:      "text-[16px] font-semibold text-gray-900",
    menuButton: "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
    list:       "flex flex-col divide-y divide-gray-50",
  }
});

export const styles = lastTransaction();