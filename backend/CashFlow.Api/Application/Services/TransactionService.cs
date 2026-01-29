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

    public IEnumerable<Transaction> GetRecent(Guid userId,int count)
    {
        return _repository.GetRecent(userId, count);
    }
}
