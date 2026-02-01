using CashFlow.Api.Domain.Entities;

namespace CashFlow.Api.Infrastructure.Repositories;

public interface ITransactionRepository
{
    Task<IReadOnlyList<Transaction>> GetByUserAsync(Guid userId);
    Task<IReadOnlyList<Transaction>> GetRecentAsync(Guid userId,int count);
}
