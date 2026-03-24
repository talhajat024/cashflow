import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import type { ReportStats, IncomeVsExpenseMonth } from "../../types/report.types";

interface Props {
  stats: ReportStats;
  chartData: IncomeVsExpenseMonth[];
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

export function ReportStatsRow({ stats, chartData }: Props) {
  const incomeUp   = stats.incomeChangePercent >= 0;
  const spendingUp = stats.spendingChangePercent >= 0;

  return (
    <div className="grid grid-cols-2 gap-6">

      {/* Total Income */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Total Income</span>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <p className="text-[28px] font-bold text-gray-900 tracking-tight">
          {fmt(stats.totalIncome)}
        </p>

        <div className="flex items-center gap-1.5 mt-1 mb-4">
          {incomeUp
            ? <TrendingUp size={13} className="text-emerald-500" />
            : <TrendingDown size={13} className="text-red-500" />}
          <span className={`text-xs font-medium ${incomeUp ? "text-emerald-500" : "text-red-500"}`}>
            {incomeUp ? "+" : ""}{stats.incomeChangePercent}% vs last month
          </span>
        </div>

        <div className="h-14">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Tooltip
                formatter={(v: number | undefined) => [fmt(v ?? 0), "Income"]}
                contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Total Spending */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingDown size={16} className="text-red-400" />
            <span className="text-sm font-medium text-gray-600">Total Spending</span>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <p className="text-[28px] font-bold text-gray-900 tracking-tight">
          {fmt(stats.totalSpending)}
        </p>

        <div className="flex items-center gap-1.5 mt-1 mb-4">
          {!spendingUp
            ? <TrendingDown size={13} className="text-emerald-500" />
            : <TrendingUp size={13} className="text-red-500" />}
          <span className={`text-xs font-medium ${!spendingUp ? "text-emerald-500" : "text-red-500"}`}>
            {stats.spendingChangePercent > 0 ? "+" : ""}{stats.spendingChangePercent}% vs last month
          </span>
        </div>

        <div className="h-14">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={2} dot={false} />
              <Tooltip
                formatter={(v: number | undefined) => [fmt(v ?? 0), "Spending"]}
                contentStyle={{ fontSize: 11, borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}