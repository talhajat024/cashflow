import { MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "../../../../shared/ui";
import type { TransactionStats } from "../../types/report.types";

interface Props {
  data: TransactionStats;
}

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#eab308", "#8b5cf6", "#ec4899"];

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

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
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold text-gray-900">Top Merchants</h3>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="space-y-4 flex-1">
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
      </CardContent>
    </Card>
  );
}