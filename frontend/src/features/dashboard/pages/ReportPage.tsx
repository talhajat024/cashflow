import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { useReport } from "../hooks/useReport";
import { HealthScoreCard } from "../components/HealthScoreCard";
import { BudgetRecommendations } from "../components/BudgetRecommendations";
import { MonthlyReport } from "../components/MonthlyReport";
import { IncomeVsExpenseChart } from "../components/IncomeVsExpenseChart/IncomeVsExpenseChart";
import { SpendingByCategory } from "../components/SpendingByCategory/SpendingByCategory";
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

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[20px] font-semibold text-gray-900">Financial Report</h2>
          <p className="text-sm text-gray-500 mt-1">Overview of your monthly income and spending</p>
        </div>

        <div>
          <MonthlyReport
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onMonthChange={setSelectedMonth}
            onYearChange={setSelectedYear}
            onDownload={downloadReport}
            downloading={downloading}
          />
        </div>
      </div>

      {/* Top KPI row - 3 cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* KPI 1: Health Score */}
        <div className="bg-white rounded-xl p-5 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
          {healthScore ? (
            <HealthScoreCard data={healthScore} />
          ) : (
            <div className="h-28 flex items-center justify-center text-gray-400 text-sm">
              Health score unavailable
            </div>
          )}
        </div>

        {/* KPI 2: Total Income */}
        <div className="bg-white rounded-xl p-5 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
          <div className="text-[13px] text-gray-500">Total Income</div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-[20px] font-semibold text-gray-900">
                ${reportStats?.totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 }) ?? "0.00"}
              </div>
              <div className="text-[12px] text-gray-400 mt-1">vs last month</div>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              (reportStats?.incomeChangePercent ?? 0) >= 0 ? "text-green-500" : "text-red-500"
            }`}>
              {(reportStats?.incomeChangePercent ?? 0) >= 0 ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              {Math.abs(reportStats?.incomeChangePercent ?? 0).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* KPI 3: Total Spending */}
        <div className="bg-white rounded-xl p-5 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
          <div className="text-[13px] text-gray-500">Total Spending</div>
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-[20px] font-semibold text-gray-900">
                ${reportStats?.totalSpending.toLocaleString("en-US", { minimumFractionDigits: 2 }) ?? "0.00"}
              </div>
              <div className="text-[12px] text-gray-400 mt-1">vs last month</div>
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${
              (reportStats?.spendingChangePercent ?? 0) <= 0 ? "text-green-500" : "text-red-500"
            }`}>
              {(reportStats?.spendingChangePercent ?? 0) <= 0 ? (
                <TrendingUp size={16} />
              ) : (
                <TrendingDown size={16} />
              )}
              {Math.abs(reportStats?.spendingChangePercent ?? 0).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Income vs Spending chart */}
      <div className="bg-white rounded-xl p-6 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
        <IncomeVsExpenseChart data={incomeVsExpense} />
      </div>

      {/* Bottom section - Budget Recommendations + Spending by Category */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Budget Recommendations (8 cols) */}
        <div className="col-span-8">
          {budgetRecommendations ? (
            <BudgetRecommendations data={budgetRecommendations} />
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-[0_6px_20px_rgba(16,24,40,0.06)] text-gray-400">
              Budget recommendations unavailable
            </div>
          )}
        </div>

        {/* Right: Spending by Category (4 cols) */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl p-5 shadow-[0_6px_20px_rgba(16,24,40,0.06)] h-full">
            <SpendingByCategory categories={transactionStats?.categories ?? []} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <Sparkles size={14} />
        <span>Generated by CashFlow AI</span>
      </div>
    </div>
  );
}