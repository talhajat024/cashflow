using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Infrastructure.Repositories;

public interface ITransactionRepository
{
    Task<IReadOnlyList<Transaction>> GetByUserAsync(Guid userId);
    Task<IReadOnlyList<Transaction>> GetRecentAsync(Guid userId,int count);
    Task<decimal> GetTotalByTypeAndPeriodAsync(Guid userId, TransactionType type, DateTime startDate, DateTime endDate);
    Task<decimal> GetAllTimeTotalByTypeAsync(Guid userId, TransactionType type);
    Task AddAsync(Transaction transaction);
    Task SaveChangesAsync();
}
