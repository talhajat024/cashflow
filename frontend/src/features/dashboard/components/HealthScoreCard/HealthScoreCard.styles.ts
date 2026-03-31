import { tv } from "tailwind-variants";

export const healthScoreCard = tv({
  slots: {
    card:           "bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] w-full",
    header:         "flex items-center justify-between mb-4",
    titleWrapper:   "flex items-center gap-2",
    // Icon matches target — pink/red heart on light pink bg
    titleIcon:      "w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-500",
    titleText:      "text-[15px] font-semibold text-gray-800",

    // Score
    scoreRow:       "flex items-end gap-1.5 mb-2",
    scoreValue:     "text-[48px] font-bold text-gray-900 leading-none",
    scoreMax:       "text-[16px] font-normal text-gray-400 mb-2",

    // Progress bar — matches target: thin bar with labels below
    progressTrack:  "w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5",
    progressFill:   "h-full rounded-full transition-all duration-500",
    progressLabels: "flex justify-between text-[10px] text-gray-400 mb-3",

    // AI Analysis — small blue sparkle line
    aiAnalysis:     "flex items-center gap-1.5 text-[12px] text-gray-500 mb-4",

    // Breakdown grid — 2 cols
    breakdownGrid:  "grid grid-cols-2 gap-2 mb-4",
    breakdownItem:  "flex flex-col bg-gray-50 rounded-xl px-3 py-2.5",
    breakdownLabel: "text-[11px] text-gray-400 mb-0.5",
    breakdownValue: "text-[14px] font-semibold text-gray-800",

    // Strengths / Improvements
    listSection:      "flex flex-col gap-1.5",
    listItem:         "flex items-center gap-2 text-[12px] text-gray-600",
    strengthDot:      "w-1.5 h-1.5 rounded-full flex-shrink-0 bg-green-500",
    improvementDot:   "w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-400",

    // Grade badge
    gradeBadge:     "text-[12px] font-semibold px-2.5 py-0.5 rounded-full",
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