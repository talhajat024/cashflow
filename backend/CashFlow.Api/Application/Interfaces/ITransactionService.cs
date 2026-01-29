using CashFlow.Api.Domain.Entities;

namespace CashFlow.Api.Application.Interfaces;

public interface ITransactionService
{
    IEnumerable<Transaction> GetRecent(Guid userId,int count);

}
