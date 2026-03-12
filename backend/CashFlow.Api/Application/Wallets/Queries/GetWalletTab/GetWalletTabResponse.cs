using CashFlow.Api.Application.DTOs.Wallets;
namespace CashFlow.Api.Application.Wallets.Queries.GetWalletTab;

public class GetWalletTabResponse
{
    public List<WalletCardDto> Wallets{get;set;}=[];
    public SelectedWalletDto SelectedWallet {get;set;}= new();
}


public class SelectedWalletDto
{
    public CardDetailsDto Details {get;set;}= new();
    public CardLimitDto Limit {get;set;}= new();
    public BalanceStatisticsDto Statistics {get;set;}= new();
    public List<WalletTransactionDto> LastTransaction {get;set;}= [];
}
