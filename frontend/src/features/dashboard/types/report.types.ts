export type HealthScoreBreakDown={
 savingsRate :number;
 incomeStability:number;
 spendingControl:number;
 balanceGrowth:number; 
}

export type HealthScore ={
    score:number;
    grade:string;
    summary:string;
    strengths:string[];
    improvements:string[];
    breakdown:HealthScoreBreakDown;
}

// Budget Recommendations
export type BudgetRecommendation={
    category:string;
    currentAvg:number;
    suggestedBudget:number;
    reasoning:string;
    priority:'High' | 'Medium' | 'Low';
}

export type BudgetRecommendations={
    recommendations:BudgetRecommendation[];
    totalCurrentSpending:number;
    totalSuggestedBudget:number;
    potentialSavings:number;
    overallInsight:string;
}


export type ReportStats=
{
    totalIncome :number;
    totalSpending:number;
    incomeChangePercent:number;
    spendingChangePercent:number;
}

export type IncomeVsExpenseMonth= 
{
    month:string;
    income:number;
    expense:number;
}

export type TransactionCategory=
{
    name:string;
    amount:string;
    percentage:number;
}

export type TopMerchant={
    name:string;
    logo:string | null;
    category:string;
    totalAmount:number;
    transactions:number;
}

export type TransactionStats={
    categories:TransactionCategory[];
    topMerchants:TopMerchant[];
    total:number;
}

export type ReportPageData={
   healthScore: HealthScore | null;
  budgetRecommendations: BudgetRecommendations | null;
  reportStats: ReportStats | null;
  incomeVsExpense: IncomeVsExpenseMonth[];
  transactionStats: TransactionStats | null;
  selectedMonth: number;
  selectedYear: number;
}

