using System;

namespace CashFlow.Api.Application.DTOs.SummaryCards;

public class SummaryCardDto
{
    public string Key {get;set;}= string.Empty;
    public string Title { get; set; } = string.Empty;
    public decimal Amount {get;set;}
    public decimal PercentageChange {get;set;}
    public bool IsPositiveTrend  {get;set;}
    public string ComparisonLabel {get;set;}= string.Empty;
    public string DateRange {get;set;} = string.Empty;
    public string Currency { get; set; } = "USD";
}
