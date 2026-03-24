import { Sparkles } from "lucide-react";
import { useReport } from "../hooks/useReport";
import { HealthScoreCard } from "../components/HealthScoreCard";
import { BudgetRecommendations } from "../components/BudgetRecommendations";
import { MonthlyReport } from "../components/MonthlyReport";
import { ReportStatsRow } from "../components/ReportStatsRow/ReportStatsRow";
import { IncomeVsExpenseChart } from "../components/IncomeVsExpenseChart/IncomeVsExpenseChart";
import { TransactionStatsPanel } from "../components/TransactionStatsPanel/TransactionStatsPanel";
import { PageSkeleton } from "../../../shared/ui/pageskeleton";

export default function ReportPage() {
  const {
    healthScore,
    budgetRecommendations,
    reportStats,
    incomeVsExpense,
    transactionStats,
    loading,
    error,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    downloading,
    downloadReport,
  } = useReport();

  if (loading) return <PageSkeleton layout="dashboard" />;
  if (error) {
    return (
      <div className="flex items-center justify-center h-40 text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-10">

      {/* Page Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-[20px] font-semibold text-gray-900">Financial Report</h2>
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          <Sparkles size={12} />
          AI Powered
        </span>
      </div>

      {/* Row 1: Health Score + Monthly Report Download */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {healthScore ? (
          <HealthScoreCard data={healthScore} />
        ) : (
          <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center h-40 text-gray-400 text-sm">
            Health score unavailable
          </div>
        )}

        <MonthlyReport
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          onDownload={downloadReport}
          downloading={downloading}
        />
      </div>

      {/* Row 2: Total Income + Total Spending stat cards */}
      {reportStats && (
        <ReportStatsRow stats={reportStats} chartData={incomeVsExpense} />
      )}

      {/* Row 3: Income vs Expense bar chart */}
      {incomeVsExpense.length > 0 && (
        <IncomeVsExpenseChart data={incomeVsExpense} />
      )}

      {/* Row 4: Transaction Stats donut + Top Merchants */}
      {transactionStats && (
        <TransactionStatsPanel data={transactionStats} />
      )}

      {/* Row 5: AI Budget Recommendations */}
      {budgetRecommendations ? (
        <BudgetRecommendations data={budgetRecommendations} />
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center h-40 text-gray-400 text-sm">
          Budget recommendations unavailable
        </div>
      )}

    </div>
  );
}