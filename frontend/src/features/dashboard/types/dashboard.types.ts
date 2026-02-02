export type TimeRange = "Weekly" | "Monthly" | "Yearly";

// Summary cards
export interface SummaryCard{
    key:string;
    title:string;
    amount:number;
    percentageChange:number;
    comparisonLabel: string;
    dateRange :string;
    currency:string;
    isPositiveTrend: boolean;
}

// Balance Overview 
export interface MonthlyAmount {
    month:number;
    monthLabel:string;
    amount:number;
}

export interface BalanceChartSeries{
    name :string;
    data:MonthlyAmount[];
}

export interface BalanceOverviewChart{
    rangeInMonths:number;
    highlightedIndex?:number;
    series:BalanceChartSeries[];
}

// All Spending
export interface SpendingSummary{
    weekly:number;
    monthly:number;
    yearly:number;
}

export interface SpendingCategory{
    key:string;
    label:string;
    amount:number;
    percentage:number;
}

export interface DonutChart{
    total:number;
    categories:SpendingCategory[];
}

export interface AllSpending{
    activeRange :TimeRange;
    currency:string;
    summary:SpendingSummary;
    chart:DonutChart;
}

// Transactions

export interface Transaction
{
    company:string;
    category:string;
    type:string;
    date:string;
    amount:number;
    status:string;
    iconKey:string;
}

export interface DashboardOverview
{
    summaryCards:SummaryCard[];
    balanceOverviewChart:BalanceOverviewChart;
    allSpending:AllSpending;
    recentTransactions:Transaction[];
}
