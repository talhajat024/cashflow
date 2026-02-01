using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Infrastructure.Repositories;

namespace CashFlow.Api.Application.Services;

public class TransactionService:ITransactionService
{ 
    private readonly ITransactionRepository _repository;
    public TransactionService(ITransactionRepository repository)
    {
        _repository=repository;
    }

    public async Task<IReadOnlyList<Transaction>> GetAllAsync(Guid userId)
    {
        return await _repository.GetByUserAsync(userId);
    }
    public async Task<IReadOnlyList<Transaction>> GetRecentAsync(Guid userId,int count)
    {
        return await _repository.GetRecentAsync(userId,count);
    }
}
