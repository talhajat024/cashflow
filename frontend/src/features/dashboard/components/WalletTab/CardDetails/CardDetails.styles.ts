import { tv } from "tailwind-variants";

export const cardDetails = tv({
  slots: {
    container:    "w-full",
    header:       "flex items-center justify-between mb-4",
    title:        "text-[16px] font-semibold text-gray-900",
    menuButton:   "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",

    table:        "w-full",
    tableHeader:  "grid grid-cols-4 mb-3",
    tableRow:     "grid grid-cols-4 items-center",

    colLabel:     "text-[11px] font-medium text-gray-400 uppercase tracking-wider",
    colValue:     "text-[14px] font-medium text-gray-800",

    statusBadge:  "inline-flex items-center px-3 py-1 rounded-full text-[12px] font-medium",
  },
  variants: {
    status: {
      Active:   { statusBadge: "bg-green-50 text-green-600"  },
      Inactive: { statusBadge: "bg-gray-50 text-gray-500"    },
      Blocked:  { statusBadge: "bg-red-50 text-red-500"      },
    }
  }
});