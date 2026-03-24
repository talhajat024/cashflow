import { MoreHorizontal } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { TransactionStats } from "../../types/report.types";

interface Props {
  data: TransactionStats;
}

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#eab308", "#8b5cf6", "#ec4899"];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(n);

// Fallback icon initials when no logo
function MerchantAvatar({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function TransactionStatsPanel({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">

      {/* Donut chart */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900">Transaction Statistics</h3>
            <p className="text-xs text-gray-400 mt-0.5">Category breakdown</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="flex justify-center mb-4">
          <div className="h-44 w-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categories}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {data.categories.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number | undefined) => [fmt(v ?? 0)]}
                  contentStyle={{ borderRadius: 10, fontSize: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-2">
          {data.categories.map((cat, i) => (
            <div key={cat.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-gray-600">{cat.name}</span>
              </div>
              <span className="font-medium text-gray-800">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Merchants */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold text-gray-900">Top Merchants</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {data.topMerchants.map((merchant, i) => (
            <div key={merchant.name} className="flex items-center gap-3">
              {merchant.logo ? (
                <img
                  src={merchant.logo}
                  alt={merchant.name}
                  className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
                />
              ) : (
                <MerchantAvatar name={merchant.name} color={COLORS[i % COLORS.length]} />
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{merchant.name}</p>
                <p className="text-xs text-gray-400">{merchant.category}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-gray-900">{fmt(merchant.totalAmount)}</p>
                <p className="text-xs text-gray-400">{merchant.transactions} transactions</p>
              </div>
            </div>
          ))}

          {data.topMerchants.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">No merchant data yet</p>
          )}
        </div>
      </div>

    </div>
  );
}