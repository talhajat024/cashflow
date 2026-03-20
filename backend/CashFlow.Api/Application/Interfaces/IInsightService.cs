using CashFlow.Api.Application;
using CashFlow.Api.Application.DTOs.Spending;

namespace CashFlow.Api.Application.Interfaces;

public interface IInsightService
{
    Task<string> GenerateInsightAsync(SpendingInsightData data);
}

public class SpendingInsightData
{
    public string Currency {get;set;} = "USD";
    // This Month
    public decimal TotalIncomeThisMonth {get;set;}
    public decimal TotalSpendingThisMonth {get;set;}

    // Last Month 
    public decimal TotalIncomeLastMonth {get;set;}
    public decimal TotalSpendingLastMonth {get;set;}

    public List<CategorySpending> ThisMonthCategories {get;set;}=[];
    public List<CategorySpending> LastMonthCategories {get;set;}=[];
}

public class CategorySpending
{
    public string Category {get;set;} = string.Empty;
    public decimal Amount {get;set;}
    public decimal Percentage {get;set;}
}
