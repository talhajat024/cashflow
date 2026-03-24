// features/dashboard/components/BudgetRecommendations/BudgetRecommendations.styles.ts
import { tv } from "tailwind-variants";

export const budgetRecommendations = tv({
  slots: {
    //  Card 
    card:             "bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] w-full",

    //  Header 
    header:           "flex items-center justify-between mb-6",
    titleWrapper:     "flex items-center gap-2",
    titleText:        "text-[16px] font-semibold text-gray-800",
    smartBadge:       "text-[12px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full",

    //  Summary Row 
    summaryRow:       "flex items-center gap-2 mb-5 text-[13px] text-gray-500",
    savingsAmount:    "font-semibold text-green-600",

    //  List 
    list:             "flex flex-col gap-3",

    //  Item 
    item:             "flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50",
    itemIcon:         "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
    itemContent:      "flex-1 min-w-0",
    itemHeader:       "flex items-center justify-between gap-2 mb-1",
    itemTitle:        "text-[14px] font-semibold text-gray-800",
    itemDescription:  "text-[12px] text-gray-500 leading-relaxed",

    //  Priority Badge 
    priorityBadge:    "text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0",
  }
});

export const styles = budgetRecommendations();

//  Priority colors 
export const priorityColors: Record<string, string> = {
  High:   "bg-red-50 text-red-500",
  Medium: "bg-yellow-50 text-yellow-600",
  Low:    "bg-green-50 text-green-600",
};

export const priorityLabels: Record<string, string> = {
  High:   "High Impact",
  Medium: "Medium",
  Low:    "On Track",
};

//  Icon background colors per index 
export const iconBgColors = [
  "bg-green-50 text-green-600",
  "bg-blue-50 text-blue-600",
  "bg-orange-50 text-orange-500",
  "bg-purple-50 text-purple-600",
  "bg-red-50 text-red-500",
];