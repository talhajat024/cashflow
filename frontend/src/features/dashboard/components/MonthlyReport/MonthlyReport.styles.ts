import { tv } from "tailwind-variants";

export const monthlyReport = tv({
    slots:{
         //  Card 
    card: "bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] w-full h-full",

    //  Header 
    header:         "flex items-center justify-between mb-6",
    titleText:      "text-[16px] font-semibold text-gray-800",
    aiBadge:        "flex items-center gap-1.5 text-[12px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full",

    //  Month Selector 
    selectorRow:    "flex items-center gap-3 mb-6",
    selectorLabel:  "text-[13px] text-gray-500 whitespace-nowrap",
    select:         "flex-1 text-[13px] font-medium text-gray-700 border border-gray-200 rounded-xl px-3 py-2 outline-none cursor-pointer bg-white",

    //  Download Button 
    downloadBtn:    "w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-[14px] font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer mb-6",
    downloadIcon:   "w-4 h-4",

    //  Info Section 
    infoSection:    "flex flex-col gap-3",
    infoItem:       "flex items-center justify-between py-2 border-b border-gray-50 last:border-0",
    infoLabel:      "text-[13px] text-gray-500",
    infoValue:      "text-[13px] font-semibold text-gray-800",
    infoValueGreen: "text-[13px] font-semibold text-green-600",
    infoValueRed:   "text-[13px] font-semibold text-red-500",

    //  Loading 
    loadingBtn:     "w-full flex items-center justify-center gap-2 bg-blue-300 text-white text-[14px] font-semibold py-3 px-4 rounded-xl cursor-not-allowed mb-6",
    }
});

export const styles = monthlyReport();