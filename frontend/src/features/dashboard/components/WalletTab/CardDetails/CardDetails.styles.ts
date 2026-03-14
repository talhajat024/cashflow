import { tv } from "tailwind-variants";

export const cardDetails = tv({
  slots: {
    header:     "flex items-center justify-between",
    title:      "text-[16px] font-semibold text-gray-900",
    menuButton: "text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",

    box: `
      bg-gray-50 rounded-xl px-5 py-4 border border-gray-100 w-full
    `,

    row: "flex items-center gap-10 w-full",
    col:      "flex flex-col gap-2",
    colLabel: "text-[11px] font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap",
    colValue: "text-[14px] font-medium text-gray-800 whitespace-nowrap",
    statusBadge: "inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium w-fit",
    numberCol: "flex flex-col gap-2 flex-1",    
  },
  variants: {
    status: {
      Active:   { statusBadge: "bg-green-50 text-green-600"  },
      Inactive: { statusBadge: "bg-gray-100 text-gray-500"   },
      Blocked:  { statusBadge: "bg-red-50 text-red-500"      },
    }
  }
});