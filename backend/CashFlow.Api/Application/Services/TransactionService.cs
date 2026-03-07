using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Infrastructure.Repositories;
using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Application.Services;

public class TransactionService:ITransactionService
{ 
    private readonly ITransactionRepository _transactionRepository;
    public TransactionService(ITransactionRepository transactionRepository)
    {
        _transactionRepository=transactionRepository;
    }

    public async Task<IReadOnlyList<Transaction>> GetAllAsync(Guid userId)
    {
        return await _transactionRepository.GetByUserAsync(userId);
    }
    public async Task<IReadOnlyList<Transaction>> GetRecentAsync(Guid userId,int count)
    {
        return await _transactionRepository.GetRecentAsync(userId,count);
    }

    public async Task<decimal> GetTotalByTypeAndPeriodAsync(Guid userId,TransactionType type,DateTime startDate,DateTime endDate)
    => await _transactionRepository.GetTotalByTypeAndPeriodAsync(userId,type,startDate,endDate);

    public async Task<decimal> GetAllTimeTotalByTypeAsync(Guid userId,TransactionType type)
    => await _transactionRepository.GetAllTimeTotalByTypeAsync(userId,type);
}
