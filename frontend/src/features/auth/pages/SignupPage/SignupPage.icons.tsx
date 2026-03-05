import { AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer } from "recharts";

const chartData= [
    {month:'Jan',income:800,expenses:600},
    {month:'Feb',income:1200,expenses:800},
    { month: 'Mar', income: 900,  expenses: 750 },
    { month: 'Apr', income: 1500, expenses: 900 },
    { month: 'May', income: 1100, expenses: 700 },
    { month: 'Jun', income: 1800, expenses: 1000 },
    { month: 'Jul', income: 1400, expenses: 850 },
    { month: 'Aug', income: 2000, expenses: 1100 },
];

export const CashFlowChart=()=>(
    <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%"  stopColor="#818CF8" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
      <XAxis
        dataKey="month"
        tick={{ fontSize: 11, fill: '#9CA3AF' }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        tick={{ fontSize: 11, fill: '#9CA3AF' }}
        axisLine={false}
        tickLine={false}
      />
      <Tooltip
        contentStyle={{
          background: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          fontSize: '12px',
        }}
      />
      <Area
        type="monotone"
        dataKey="income"
        stroke="#2563EB"
        strokeWidth={2}
        fill="url(#incomeGrad)"
        dot={false}
      />
      <Area
        type="monotone"
        dataKey="expenses"
        stroke="#818CF8"
        strokeWidth={2}
        fill="url(#expenseGrad)"
        dot={false}
      />
    </AreaChart>
    </ResponsiveContainer>
);

export const SparkleIcon=()=>(
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
      fill="currentColor"
    />
  </svg>
);

export const EyeIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const EyeOffIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);