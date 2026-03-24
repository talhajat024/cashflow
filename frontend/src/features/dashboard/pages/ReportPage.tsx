import { Sparkles } from "lucide-react";
import { useReport } from "../hooks/useReport";
import { HealthScoreCard } from "../components/HealthScoreCard";
import { BudgetRecommendations } from "../components/BudgetRecommendations";
import { MonthlyReport } from "../components/MonthlyReport";
import { PageSkeleton } from "../../../shared/ui/pageskeleton";

export default function ReportPage()
{
  const {
    healthScore,
    budgetRecommendations,
    loading,
    error,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    downloading,
    downloadReport,
  }=useReport();

  if(loading) return <PageSkeleton layout="dashboard"/>
  if(error)
  {
    return(
      <div className="flex items-center justify-center h-40 text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return(
    <div className="flex flex-col gap-6 pb-10">

      {/*  Page Header  */}
      <div className="flex items-center gap-3">
        <h2 className="text-[20px] font-semibold text-gray-900">
          Financial Report
        </h2>
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          <Sparkles size={12} />
          AI Powered
        </span>
      </div>

      {/*  Row 1: Health Score + Monthly Report  */}
      <div className="grid grid-cols-2 gap-6 items-start">

        {/* Health Score */}
        {healthScore ? (
          <HealthScoreCard data={healthScore} />
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center h-40 text-gray-400 text-sm">
            Health score unavailable
          </div>
        )}

        {/* Monthly Report Download */}
        <MonthlyReport
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          onDownload={downloadReport}
          downloading={downloading}
        />

      </div>

      {/*  Row 2: Budget Recommendations  */}
      {budgetRecommendations ? (
        <BudgetRecommendations data={budgetRecommendations} />
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center h-40 text-gray-400 text-sm">
          Budget recommendations unavailable
        </div>
      )}

    </div>
  )
}