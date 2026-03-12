namespace CashFlow.Api.Application.DTOs.Wallets;

public class CardDetailsDto
{
    public string Number {get;set;}=string.Empty;
    public string ExpireDate {get;set;}=string.Empty;
    public string Cvc {get;set;}=string.Empty;
    public string Status {get;set;}=string.Empty;
}
