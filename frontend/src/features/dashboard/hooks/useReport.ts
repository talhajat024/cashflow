import { useState,useEffect } from "react";
import { reportApi } from "../api/report.api";
import type { HealthScore,BudgetRecommendations,ReportStats,
  IncomeVsExpenseMonth,
  TransactionStats, } from "../types/report.types";

export function useReport()
{
    const now = new Date();
    const [healthScore,setHealthScore]=useState<HealthScore | null>(null);
    const [budgetRecommendations,setBudgetRecommendations]=useState<BudgetRecommendations | null>(null);
    const [reportStats, setReportStats]  = useState<ReportStats | null>(null);
    const [incomeVsExpense, setIncomeVsExpense]    = useState<IncomeVsExpenseMonth[]>([]);
    const [transactionStats, setTransactionStats] = useState<TransactionStats | null>(null);

    const [loading,setLoading]=useState(true);
    const [error,setError]=useState<string | null>(null);
    const [selectedMonth,setSelectedMonth]=useState(now.getMonth() +1);
    const [selectedYear,setSelectedYear]=useState(now.getFullYear());
    const [downloading,setDownloading]=useState(false);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async ()=>{
        try{
            setLoading(true);
            setError(null);

            // fetch both in parallel
             const [healthData, budgetData, statsData, chartData, txStatsData] =
        await Promise.all([
          reportApi.getHealthScore(),
          reportApi.getBudgetRecommendations(),
          reportApi.getReportStats(),
          reportApi.getIncomeVsExpense(),
          reportApi.getTransactionStats(),
        ]);
 
      setHealthScore(healthData);
      setBudgetRecommendations(budgetData);
      setReportStats(statsData);
      setIncomeVsExpense(chartData);
      setTransactionStats(txStatsData);
        }
        catch(error)
        {
            setError("Failed to load report data");
        }
        finally{
            setLoading(false);
        }
    };

   const downloadReport = async () => {
    try {
      setDownloading(true);
      const blob = await reportApi.downloadMonthlyReport(selectedMonth, selectedYear);
      const url  = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href     = url;
      link.download = `CashFlow-Report-${selectedYear}-${String(selectedMonth).padStart(2, "0")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to download report");
    } finally {
      setDownloading(false);
    }
  };
    
    return{
    healthScore,
    budgetRecommendations,
    reportStats,
    incomeVsExpense,
    transactionStats,
    loading,
    error,
    selectedMonth,
    selectedYear,
    setSelectedMonth,
    setSelectedYear,
    downloading,
    downloadReport,
    }
}