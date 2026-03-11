// features/dashboard/components/WalletTab/LastTransaction/TransactionRow.styles.ts
import { tv } from "tailwind-variants";

export const transactionRow = tv({
  slots: {
    container:    "flex items-center justify-between py-3",
    left:         "flex items-center gap-3",
    logoWrapper:  "w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0",
    logo:         "w-5 h-5 object-contain",
    logoFallback: "text-[13px] font-bold text-gray-500",
    info:         "flex flex-col",
    company:      "text-[14px] font-medium text-gray-900",
    category:     "text-[12px] font-normal text-gray-400 mt-0.5",
    type:         "text-[13px] font-normal text-gray-500",
    right:        "flex flex-col items-end gap-1",
    amount:       "text-[14px] font-semibold text-blue-500",
    statusBadge:  "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium",
  },
  variants: {
    status: {
      Success: { statusBadge: "bg-green-50 text-green-600"  },
      Pending: { statusBadge: "bg-orange-50 text-orange-500" },
      Failed:  { statusBadge: "bg-red-50 text-red-500"      },
    }
  }
});