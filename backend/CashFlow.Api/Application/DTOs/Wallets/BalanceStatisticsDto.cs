
namespace CashFlow.Api.Application.DTOs.Wallets;

public class BalanceStatisticsDto
{
    public List<BalanceStatPointDto> Data {get;set;}=[];
    public string ActiveMonth {get;set;}=string.Empty;
    public decimal ActiveAmount {get;set;}
    public decimal ChangePercent {get;set;}
    public bool IsPositive {get;set;}
}

public class BalanceStatPointDto
{
    public string Month {get;set;}=string.Empty;
    public decimal Amount {get;set;}   
}