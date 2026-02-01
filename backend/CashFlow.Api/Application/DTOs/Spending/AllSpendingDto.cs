using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Application.DTOs.Spending;

public class AllSpendingDto
{
    public TimeRange ActiveRange { get; set; }
    public string Currency { get; set; } = "USD";
    public SpendingSummaryDto Summary { get; set; } = new();
    public DonutChartDto Chart { get; set; } = new();
}
