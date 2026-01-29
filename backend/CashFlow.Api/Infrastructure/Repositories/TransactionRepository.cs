using CashFlow.Api.Domain.Entities;
namespace CashFlow.Api.Infrastructure.Repositories;

public class TransactionRepository:ITransactionRepository
{
    public IEnumerable<Transaction> GetRecent(Guid userId,int count)
    {
        return new List<Transaction>
        {
            new Transaction
            {
                Id = Guid.NewGuid(),
                UserId= userId,
                Amount=1200,
                Type = TransactionType.Expense,
                CreatedAt=DateTime.UtcNow.AddDays(-1)
            },
            new Transaction
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Amount = 4500,
                Type = TransactionType.Income,
                CreatedAt = DateTime.UtcNow.AddDays(-2)
            }
        }.OrderByDescending(t=>t.CreatedAt)
        .Take(count);
    }

}
