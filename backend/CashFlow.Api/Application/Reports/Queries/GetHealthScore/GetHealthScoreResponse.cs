namespace CashFlow.Api.Application.Reports.Queries.GetHealthScore;

public class GetHealthScoreResponse
{
    public int Score {get;set;}
    public string Grade {get;set;}=string.Empty;
    public string Summary {get;set;}=string.Empty;
    public List<string> Strengths {get;set;}=[];
    public List<string> Improvements {get;set;}=[];
    public HealthScoreBreakdownDto Breakdown {get;set;}= new();
}

public class HealthScoreBreakdownDto
{
    public int SavingsRate {get;set;}
    public int IncomeStability {get;set;}
    public int SpendingControl {get;set;}
    public int BalanceGrowth {get;set;}
}
