namespace CashFlow.Api.Application.DTOs.BalanceOverview;

public class BalanceChartSeriesDto
{
    public string Name {get;set;}= string.Empty;  // Income or spending
    public IReadOnlyList<MonthlyAmountDto> Data {get;set;} = Array.Empty<MonthlyAmountDto>();
}
