using CashFlow.Api.Domain.Entities;

namespace CashFlow.Api.Application.Interfaces;

public interface ITransactionService
{
    Task<IReadOnlyList<Transaction>> GetAllAsync(Guid userId);
    Task<IReadOnlyList<Transaction>> GetRecentAsync(Guid userId,int count);
}
