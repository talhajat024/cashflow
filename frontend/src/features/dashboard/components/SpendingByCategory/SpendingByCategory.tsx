import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { TransactionCategory } from "../../types/report.types";

interface SpendingByCategoryProps {
  categories: TransactionCategory[];
}

const COLORS = [
  "#3B82F6", // blue - Housing
  "#22C55E", // green - Food
  "#F59E0B", // amber - Transport
  "#8B5CF6", // purple - Utilities
  "#EC4899", // pink - Entertainment
  "#6B7280", // gray - Other
];

export function SpendingByCategory({ categories }: SpendingByCategoryProps) {
  const hasData = categories && categories.length > 0 && categories.some(c => Number(c.amount) > 0);
  const data = categories.map((cat) => ({
    name: cat.name,
    value: Number(cat.amount) || 0,
    percentage: cat.percentage,
  }));

  if (!hasData) {
    return (
      <div>
        <h4 className="text-sm font-semibold text-gray-800 mb-4">Spending by Category</h4>
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">
          No category data available
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-800 mb-4">Spending by Category</h4>

      <div className="h-40 relative min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={55}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | string, name: string) => [
                `$${Number(value).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
                name,
              ]}
              contentStyle={{
                borderRadius: 8,
                fontSize: 12,
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {categories.map((category, index) => (
          <div key={category.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-xs text-gray-600">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-800">
                {category.percentage}%
              </span>
              <span className="text-xs text-gray-400">${category.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}