using CashFlow.Api.Domain.Entities;
namespace CashFlow.Api.Infrastructure.Repositories;

public interface ITransactionRepository
{
    IEnumerable<Transaction> GetRecent(Guid userId,int count);
}
