import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Card,CardContent } from "../../../../shared/ui";
import type { IncomeVsExpenseMonth } from "../../types/report.types";

interface Props {
  data: IncomeVsExpenseMonth[];
}

const fmt = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;

export function IncomeVsExpenseChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card className="h-full">
        <CardContent className="h-full p-6">
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h3 className="text-[15px] font-semibold text-gray-900">Income vs Expense</h3>
            <p className="text-xs text-gray-400 mt-0.5">Monthly comparison for {new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              Expense
            </span>
          </div>
        </div>

        <div className="flex-1 min-h-0 mt-4">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={data} barCategoryGap="30%" barGap={3}>
              <CartesianGrid vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                tickFormatter={fmt}
              />
              <Tooltip
                formatter={(v: number | undefined, name: string | undefined) => [
                  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v ?? 0),
                  name === "income" ? "Income" : "Expense",
                ]}
                contentStyle={{ borderRadius: 10, fontSize: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                cursor={{ fill: "#f9fafb" }}
              />
              <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}