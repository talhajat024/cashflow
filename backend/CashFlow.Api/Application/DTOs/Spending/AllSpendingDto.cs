using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Application.DTOs.Spending;

public class AllSpendingDto
{
    public string Currency { get; set; } = "USD";
    public SpendingSummaryDto Summary { get; set; } = new();
    public Dictionary<TimeRange,DonutChartDto> ByRange { get; set; } = new();
}
