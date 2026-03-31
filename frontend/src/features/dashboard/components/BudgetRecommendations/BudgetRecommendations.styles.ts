import { tv } from "tailwind-variants";

export const budgetRecommendations = tv({
  slots: {
    card: "bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] w-full",

    header: "flex items-center justify-between mb-4",
    titleWrapper: "flex items-center gap-2",
    titleText: "text-[15px] font-semibold text-gray-800",
    smartBadge: "text-[11px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full",

    summaryRow: "flex items-center gap-2 mb-5 text-[13px] text-gray-500",
    savingsAmount: "font-semibold text-green-600",

    // Card grid layout
    cardsGrid: "grid grid-cols-3 gap-4",

    // Individual recommendation card
    recCard: "flex flex-col gap-2 p-4 rounded-xl border border-gray-100 bg-gray-50/50",
    recIcon: "w-8 h-8 rounded-lg flex items-center justify-center",
    recTitle: "text-[13px] font-semibold text-gray-800",
    recDescription: "text-[12px] text-gray-500 leading-relaxed",
  }
});

export const styles = budgetRecommendations();

export const priorityColors: Record<string, string> = {
  High: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-blue-100 text-blue-700",
};

export const priorityLabels: Record<string, string> = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
};

export const iconBgColors = [
  "bg-green-50 text-green-600",
  "bg-blue-50 text-blue-500",
  "bg-orange-50 text-orange-500",
  "bg-purple-50 text-purple-500",
  "bg-red-50 text-red-500",
];

export const cardIconBgColors = [
  "bg-green-100 text-green-600",
  "bg-blue-100 text-blue-600",
  "bg-orange-100 text-orange-600",
  "bg-purple-100 text-purple-600",
  "bg-red-100 text-red-600",
];