namespace CashFlow.Api.Application.DTOs.Spending;

public class SpendingCategoryDto
{
    public string Key {get;set;} =string.Empty;
    public string Label {get;set;}=string.Empty;
    public decimal Amount {get;set;}
    public decimal Percentage {get;set;}
}
