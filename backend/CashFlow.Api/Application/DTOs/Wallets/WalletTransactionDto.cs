namespace CashFlow.Api.Application.DTOs.Wallets;

public class WalletTransactionDto
{
    public Guid Id {get;set;}
    public string Company {get;set;}=string.Empty;
    public string Category {get;set;}=string.Empty;
    public string Type {get;set;} = string.Empty;
    public decimal Amount {get;set;}
    public string Status {get;set;}=string.Empty;
    public string? Logo {get;set;} 
}
