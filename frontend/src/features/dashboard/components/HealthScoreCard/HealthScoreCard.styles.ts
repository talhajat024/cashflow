import { tv } from "tailwind-variants";

export const healthScoreCard = tv({
  slots: {
    card:           "bg-white rounded-xl p-4 shadow-[0_6px_20px_rgba(16,24,40,0.06)] w-full",
    header:         "flex items-center justify-between mb-2",
    titleWrapper:   "flex items-center gap-2",
    titleIcon:      "w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-500",
    titleText:      "text-[13px] font-semibold text-gray-800",

    // Score — reduced from 48px
    scoreRow:       "flex items-end gap-1 mb-1.5",
    scoreValue:     "text-[36px] font-bold text-gray-900 leading-none",
    scoreMax:       "text-[13px] font-normal text-gray-400 mb-1",

    // Progress bar
    progressTrack:  "w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1",
    progressFill:   "h-full rounded-full transition-all duration-500",
    progressLabels: "flex justify-between text-[10px] text-gray-400 mb-2",

    // AI Analysis
    aiAnalysis:     "flex items-start gap-1.5 text-[11px] text-gray-500",

    // unused but kept for compatibility
    breakdownGrid:  "grid grid-cols-2 gap-2",
    breakdownItem:  "flex flex-col bg-gray-50 rounded-xl px-3 py-2",
    breakdownLabel: "text-[11px] text-gray-400 mb-0.5",
    breakdownValue: "text-[13px] font-semibold text-gray-800",
    listSection:    "flex flex-col gap-1",
    listItem:       "flex items-center gap-2 text-[11px] text-gray-600",
    strengthDot:    "w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-500",
    improvementDot: "w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-400",
    gradeBadge:     "text-[11px] font-semibold px-2.5 py-0.5 rounded-full",
  }
});

export const styles = healthScoreCard();

export const gradeColors: Record<string, string> = {
  A: "bg-green-50 text-green-600",
  B: "bg-blue-50 text-blue-600",
  C: "bg-yellow-50 text-yellow-600",
  D: "bg-orange-50 text-orange-500",
  F: "bg-red-50 text-red-500",
};

export const progressColors: Record<string, string> = {
  A: "bg-green-500",
  B: "bg-blue-500",
  C: "bg-yellow-500",
  D: "bg-orange-500",
  F: "bg-red-500",
};