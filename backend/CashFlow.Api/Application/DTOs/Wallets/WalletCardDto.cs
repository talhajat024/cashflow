namespace CashFlow.Api.Application.DTOs.Wallets;

public class WalletCardDto
{
    public Guid Id {get;set;}
    public string Name {get;set;} =string.Empty;
    public string Number {get;set;}=string.Empty;
    public decimal Balance {get;set;}
    public string Currency {get;set;}="USD";
    public bool IsDefault {get;set;}
}
