namespace CashFlow.Api.Application.Reports.Queries.GetReportStats;

public class GetReportStatsResponse
{
    public decimal TotalIncome {get;set;}
    public decimal TotalSpending {get;set;}
    public double IncomeChangePercent {get;set;}
    public double SpendingChangePercent {get;set;}
}
