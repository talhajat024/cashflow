import { HeartPulse, Sparkles } from "lucide-react";
import type { HealthScore } from "../../types/report.types";
import { gradeColors, progressColors } from "./HealthScoreCard.styles";
import { Card,CardContent } from "../../../../shared/ui";

type HealthScoreCardProps = {
  data: HealthScore;
};

const GRADE_LABELS: Record<string, string> = {
  A: "Excellent",
  B: "Good",
  C: "Fair",
  D: "Poor",
  F: "Critical",
};

export function HealthScoreCard({ data }: HealthScoreCardProps) {
  return (
    <Card className="border-0 shadow-[0_6px_20px_rgba(16,24,40,0.06)] h-full">
      <CardContent className="p-5 flex flex-col justify-between h-full">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-400 shrink-0">
              <HeartPulse size={16} />
            </div>
            <h4 className="text-[13px] font-semibold text-gray-700">
              Financial Health Score
            </h4>
          </div>
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
              gradeColors[data.grade] ?? gradeColors.B
            }`}
          >
            {GRADE_LABELS[data.grade] ?? "Good"}
          </span>
        </div>

        {/* Score */}
        <div className="flex items-end gap-1 mt-3">
          <span className="text-[42px] font-black text-gray-900 leading-none">
            {data.score}
          </span>
          <span className="text-[15px] text-gray-400 mb-1">/100</span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                progressColors[data.grade] ?? progressColors.B
              }`}
              style={{ width: `${data.score}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            {["Poor", "Fair", "Good", "Excellent"].map((label) => (
              <span key={label} className="text-[10px] text-gray-400">
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* AI Analysis */}
        <div className="flex items-start gap-1.5 mt-3 text-[11px] text-gray-500 leading-relaxed">
          <Sparkles size={12} className="text-blue-400 mt-0.5 shrink-0" />
          <span>
            <span className="font-medium text-gray-600">AI Analysis: </span>
            {data.summary}
          </span>
        </div>

      </CardContent>
    </Card>
  );
}