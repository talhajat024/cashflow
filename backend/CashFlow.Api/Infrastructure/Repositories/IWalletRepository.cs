using CashFlow.Api.Domain.Entities;

namespace CashFlow.Api.Infrastructure.Repositories;

public interface IWalletRepository
{
    Task<List<Wallet>> GetByUserIdAsync(Guid userId);
    Task<Wallet?> GetByIdAsync(Guid id);
    Task<decimal> GetTotalBalanceAsync(Guid userId);
    Task AddAsync(Wallet wallet);
    Task UpdateAsync(Wallet wallet);
    Task SaveChangesAsync();
}
