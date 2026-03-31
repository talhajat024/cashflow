import { Sparkles, Calendar, FileDown, Loader2 } from "lucide-react";
import { useReport } from "../hooks/useReport";
import { HealthScoreCard } from "../components/HealthScoreCard";
import { BudgetRecommendations } from "../components/BudgetRecommendations";
import { IncomeVsExpenseChart } from "../components/IncomeVsExpenseChart/IncomeVsExpenseChart";
import { SpendingByCategory } from "../components/SpendingByCategory/SpendingByCategory";
import { PageSkeleton } from "../../../shared/ui/pageskeleton";
import { ReportStatsRow } from "../components/ReportStatsRow";
import { TransactionStatsPanel } from "../components/TransactionStatsPanel/TransactionStatsPanel";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const YEARS = Array.from({ length: 5 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year, label: String(year) };
});

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
      {/*  Header  */}
      <div className="flex items-center justify-between pt-20">
        {/* Left */}
        <div className="flex items-center gap-3">
          <h2 className="text-[22px] font-bold text-gray-900">
            Financial Report
          </h2>
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
            <Sparkles size={12} />
            AI Powered
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Month/Year selector */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white cursor-pointer">
            <Calendar size={14} className="text-gray-400" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="text-[13px] font-medium text-gray-700 outline-none bg-transparent cursor-pointer"
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="text-[13px] font-medium text-gray-700 outline-none bg-transparent cursor-pointer"
            >
              {YEARS.map((y) => (
                <option key={y.value} value={y.value}>
                  {y.label}
                </option>
              ))}
            </select>
          </div>

          {/* Download PDF button */}
          <button
            onClick={downloadReport}
            disabled={downloading}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <FileDown size={14} />
            )}
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 items-stretch">
        {healthScore ? (
          <HealthScoreCard data={healthScore} />
        ) : (
          <div className="h-28 flex items-center justify-center text-gray-400 text-sm">
            Health score unavailable
          </div>
        )}

        {reportStats && (
          <div className="col-span-2">
            <ReportStatsRow
              stats={reportStats}
              chartData={incomeVsExpense ?? []}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Left: Income vs Expense Chart (8 cols) */}
        <div className="col-span-8">
          <IncomeVsExpenseChart data={incomeVsExpense} />
        </div>

        {/* Right: Transaction Statistics (4 cols) */}
        <div className="col-span-4">
          <SpendingByCategory categories={transactionStats?.categories ?? []} />
        </div>
      </div>

      {/* Bottom section - Budget Recommendations + Spending by Category */}
      {/* Bottom section - Budget Recommendations + Transaction Stats in same row */}
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

        {/* Right: Transaction Stats Panel (4 cols) */}
        <div className="col-span-4">
          {transactionStats ? (
            <TransactionStatsPanel data={transactionStats} />
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-[0_6px_20px_rgba(16,24,40,0.06)] text-gray-400">
              Transaction statistics unavailable
            </div>
          )}
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
