namespace CashFlow.Api.Application.DTOs.BalanceOverview;

public class BalanceOverviewChartDto
{
    public int RangeInMonths {get;set;}  // Number of Months In range (3,6,12)
    public int? HighlightedIndex { get; set; }
    public IReadOnlyList<BalanceChartSeriesDto> Series {get;set;}= Array.Empty<BalanceChartSeriesDto>();


}
