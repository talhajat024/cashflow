using Humanizer;

namespace CashFlow.Api.Application.Interfaces;

public interface IHealthScoreService
{
    Task<HealthScoreResult> GenerateHealthScoreAsync(HealthScoreData data);
}

public class HealthScoreData
{
    // Income
    public decimal AvgMonthlyIncome {get;set;}
    public decimal IncomeThisMonth {get;set;}
    public decimal IncomeLastMonth {get;set;}
    public decimal IncomeTwoMonthsAgo {get;set;}

    // Spending
    public decimal AvgMonthlySpending {get;set;}
    public decimal SpendingThisMonth {get;set;}
    public decimal SpendingLastMonth {get;set;}


    // Savings
    public decimal AvgSavingsRate {get;set;}
    public decimal CurrentBalance {get;set;}
    public decimal BalanceGrowth {get;set;}


    // Spending Category
    public List<string> TopCategories {get;set;}=[];
    public int TotalTransactions {get;set;}

}

public class HealthScoreResult
{
    public int Score {get;set;}
    public string Grade {get;set;}=string.Empty;
    public string Summary {get;set;}=string.Empty;
    public List<string> Strengths {get;set;}=[];
    public List<string> Improvements {get;set;}=[];
    public int SavingsRate {get;set;}
    public int IncomeStability {get;set;}
    public int SpendingControl {get;set;}
    public int BalanceGrowth {get;set;}
}
