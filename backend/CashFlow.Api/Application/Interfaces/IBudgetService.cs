using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace CashFlow.Api.Application.Interfaces;

public interface IBudgetService
{
    Task<BudgetRecommendationResult> GenerateRecommendationsAsync(List<CategorySpendingData> spendingData,decimal totalMontlyIncome);
}

public class CategorySpendingData
{
    public string Category {get;set;}=string.Empty;
    public decimal MonthlyAvg {get;set;}
    public decimal LastMonth {get;set;}
    public decimal TwoMonthsAgo {get;set;}
}

public class BudgetRecommendationResult
{
    public List<BudgetCategoryResult> Categories {get;set;}=[];
    public string OverallInsight {get;set;}= string.Empty;
    
}

public class BudgetCategoryResult
{
    public string Category {get;set;}=string.Empty;
    public decimal SuggestedBudget {get;set;}
    public string Reasoning {get;set;}=string.Empty;
    public string Priority {get;set;}=string.Empty;
}
