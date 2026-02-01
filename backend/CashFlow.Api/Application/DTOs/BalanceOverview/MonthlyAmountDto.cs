namespace CashFlow.Api.Application.DTOs.BalanceOverview;

public class MonthlyAmountDto
{
    public int Month {get;set;}
    public string MonthLabel {get;set;} = string.Empty;
    public decimal Amount {get;set;}
}
