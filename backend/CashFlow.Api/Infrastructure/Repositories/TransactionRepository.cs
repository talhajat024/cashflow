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
            Amount = 1800,
            Type = TransactionType.Expense,
            Nature = TransactionNature.Subscription,
            Status = TransactionStatus.Incomplete,
            CounterpartyName = "Figma",
            MerchantCategory = "Application",
            CategoryKey = "workspace",
            CategoryLabel = "Workspace",
            CreatedAt = DateTime.UtcNow.AddDays(-2)
        },

        // ===== Expense: Employee Salary =====
        new Transaction
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Amount = 4200,
            Type = TransactionType.Expense,
            Nature = TransactionNature.Payout,
            Status = TransactionStatus.Incomplete,
            CounterpartyName = "Employees",
            MerchantCategory = "Payroll",
            CategoryKey = "employeesalary",
            CategoryLabel = "Employee Salary",
            CreatedAt = DateTime.UtcNow.AddDays(-5)
        },

        // ===== Expense: Shopping / Entertainment =====
        new Transaction
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Amount = 950,
            Type = TransactionType.Expense,
            Nature = TransactionNature.Subscription,
            Status = TransactionStatus.Incomplete,
            CounterpartyName = "Spotify",
            MerchantCategory = "Entertainment",
            CategoryKey = "shopping",
            CategoryLabel = "Shopping",
            CreatedAt = DateTime.UtcNow.AddDays(-1)
        },

        // ===== Income: Business Income =====
        new Transaction
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Amount = 9000,
            Type = TransactionType.Income,
            Nature = TransactionNature.Receive,
            Status = TransactionStatus.Completed,
            CounterpartyName = "Client Payments",
            MerchantCategory = "Business",
            CategoryKey = "income",
            CategoryLabel = "Business Income",
            CreatedAt = DateTime.UtcNow.AddDays(-7)
        }
    };

}
