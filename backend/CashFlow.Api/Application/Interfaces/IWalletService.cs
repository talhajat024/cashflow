using CashFlow.Api.Domain.Entities;

namespace CashFlow.Api.Application.Interfaces;

public interface IWalletService
{
    Task<decimal> GetTotalBalanceAsync(Guid userId);
    Task<List<Wallet>> GetWalletsAsync(Guid userId); 
}
