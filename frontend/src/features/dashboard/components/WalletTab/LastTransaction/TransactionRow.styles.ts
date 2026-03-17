import { tv } from "tailwind-variants";

export const transactionRow = tv({
  slots: {
    container:    "grid grid-cols-[auto_1fr_120px_100px_90px] items-center gap-4 py-1",

    logoWrapper:  "w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0",
    logo:         "w-6 h-6 object-contain",
    logoFallback: "text-[13px] font-bold text-gray-500",

    info:         "flex flex-col min-w-0",
    company:      "text-[14px] font-medium text-gray-900",
    category:     "text-[12px] font-normal text-gray-400 mt-0.5",

    type:         "text-[13px] font-normal text-gray-400 whitespace-nowrap text-left",
    amount:       "text-[14px] font-semibold text-blue-500 whitespace-nowrap text-left",
    
    statusBadge:  "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap uppercase w-full text-center",
  },
  variants: {
    status: {
      Success:    { statusBadge: "bg-green-50 text-green-600"   },
      Pending:    { statusBadge: "bg-orange-50 text-orange-500" },
      Failed:     { statusBadge: "bg-red-50 text-red-500"       },
      Incomplete: { statusBadge: "bg-gray-50 text-gray-500"     },
      Completed:  { statusBadge: "bg-green-50 text-green-600"   },
    }
  }
});