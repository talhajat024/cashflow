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

export type ReportPageData={
    healthScore:HealthScore | null;
    budgetRecommendations:BudgetRecommendations | null;
    selectedMonth:number;
    selectedYear:number;
}

