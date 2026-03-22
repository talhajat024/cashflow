namespace CashFlow.Api.Application.Budget.Queries.GetBudgetRecommendations;

public class GetBudgetRecommendationsResponse
{
    public List<BudgetRecommendationDto> Recommendations {get;set;}=[];
    public decimal TotalCurrentSpending {get;set;}
    public decimal TotalSuggestedBudget {get;set;}
    public decimal PotentialSavings {get;set;}
    public string OverallInsight {get;set;}=string.Empty; 
}

public class BudgetRecommendationDto
{
    public string Category {get;set;}= string.Empty;
    public decimal CurrentAvg {get;set;}
    public decimal SuggestedBudget {get;set;}
    public string Reasoning {get;set;}=string.Empty;
    public string Priority {get;set;}=string.Empty;
}
