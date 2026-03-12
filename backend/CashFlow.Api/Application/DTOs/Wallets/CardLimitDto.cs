namespace CashFlow.Api.Application.DTOs.Wallets;

public class CardLimitDto
{
    public decimal Used {get;set;}
    public decimal Total {get;set;}
    public string Currency {get;set;}="USD";
    public string Period {get;set;}="Monthly";
}
