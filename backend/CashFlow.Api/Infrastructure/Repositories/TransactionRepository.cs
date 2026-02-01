using CashFlow.Api.Domain.Entities;
namespace CashFlow.Api.Infrastructure.Repositories;

public class TransactionRepository:ITransactionRepository
{
    public Task<IReadOnlyList<Transaction>> GetByUserAsync(Guid userId)
    {
        var data = GetSeedData(userId);
        return Task.FromResult<IReadOnlyList<Transaction>>(
            data.Where(t => t.UserId == userId)
            .OrderByDescending(t => t.CreatedAt)
            .ToList()
        );
    }

    public Task<IReadOnlyList<Transaction>> GetRecentAsync(Guid userId,int count)
    {
        var data = GetSeedData(userId);
        return Task.FromResult<IReadOnlyList<Transaction>>(
            data
            .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .Take(count)
                .ToList()
        );
    }

    private static List<Transaction> GetSeedData(Guid userId)=>
    new()
    {
            new Transaction
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Amount = 1200,
                Type = TransactionType.Expense,
                CategoryKey="shopping",
                CategoryLabel="Shopping",
                CreatedAt = DateTime.UtcNow.AddDays(-1)
            },
            new Transaction
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Amount = 4500,
                Type = TransactionType.Income,
                CategoryKey="workspace",
                CategoryLabel="Workspace",
                CreatedAt = DateTime.UtcNow.AddDays(-2)
            }
    };

}
