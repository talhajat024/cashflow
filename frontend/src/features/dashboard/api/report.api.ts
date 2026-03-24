import { httpClient } from "../../../shared/api/httpClient";
import type { HealthScore,BudgetRecommendations,ReportStats,
  IncomeVsExpenseMonth,
  TransactionStats, } from "../types/report.types";

export const reportApi={
    getHealthScore:async():Promise<HealthScore> =>{
        const response = await httpClient.get<HealthScore>("/dashboard/health-score");
        return response.data;
    },
    getBudgetRecommendations:async():Promise<BudgetRecommendations>=>{
        const response = await httpClient.get<BudgetRecommendations>("/budget/recommendations");
        return response.data;
    },
    downloadMonthlyReport:async(month:number, year:number):Promise<Blob>=>{
        const response = await httpClient.get<Blob>(`/reports/monthly?month=${month}&year=${year}`,{responseType:"blob"});
        return response.data;
    },
      getReportStats: async (): Promise<ReportStats> => {
    const response = await httpClient.get<ReportStats>("/reports/stats");
    return response.data;
  },
 
  getIncomeVsExpense: async (): Promise<IncomeVsExpenseMonth[]> => {
    const response = await httpClient.get<IncomeVsExpenseMonth[]>("/reports/income-vs-expense");
    return response.data;
  },
 
  getTransactionStats: async (): Promise<TransactionStats> => {
    const response = await httpClient.get<TransactionStats>("/reports/transaction-stats");
    return response.data;
  },
}