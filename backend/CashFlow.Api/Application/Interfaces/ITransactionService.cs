using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Application.Interfaces;

public interface ITransactionService
{
    Task<IReadOnlyList<Transaction>> GetAllAsync(Guid userId);
    Task<IReadOnlyList<Transaction>> GetRecentAsync(Guid userId,int count);
    Task<decimal> GetTotalByTypeAndPeriodAsync(Guid userId,TransactionType type,DateTime startDate,DateTime endDate);
    Task<decimal> GetAllTimeTotalByTypeAsync(Guid userId,TransactionType type);
}
