using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace CashFlow.Api.Infrastructure.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if(await context.Users.AnyAsync()) return;
        var testUser= new User
        {
            Id=SeedConstants.TestUserId,
            Name="Test User",
            Email="test@cashflow.com",
            PasswordHash=BCrypt.Net.BCrypt.HashPassword("Test@123"),
            Role="User",
            CreatedAt=DateTime.UtcNow,
        };

        await context.Users.AddAsync(testUser);
        await context.SaveChangesAsync();
        Console.WriteLine("User Seeded");

        var wallets=new List<Wallet>
        {
            new()
            {
                 Id = SeedConstants.MainWalletId,      
            UserId = SeedConstants.TestUserId,
            Name = "Main Account",
            Balance = 2500.00m,
            Currency = "USD",
            Icon = "bank",
            IsDefault = true,
            CreatedAt = DateTime.UtcNow
            },
            new() {
            Id = SeedConstants.SavingsWalletId,   
            UserId = SeedConstants.TestUserId,
            Name = "Savings",
            Balance = 1800.00m,
            Currency = "USD",
            Icon = "piggy-bank",
            IsDefault = false,
            CreatedAt = DateTime.UtcNow
        },
        new() {
            Id = SeedConstants.CashWalletId,      
            UserId = SeedConstants.TestUserId,
            Name = "Cash",
            Balance = 300.00m,
            Currency = "USD",
            Icon = "cash",
            IsDefault = false,
            CreatedAt = DateTime.UtcNow
        },
        };
        await context.Wallets.AddRangeAsync(wallets);
        await context.SaveChangesAsync();
        Console.WriteLine("Wallets Seeded");

        
        var transactions=GetSeedTransactions();
        await context.Transactions.AddRangeAsync(transactions);
        await context.SaveChangesAsync();
        Console.WriteLine($"Transactions seeded: {transactions.Count} created");

        await context.SaveChangesAsync();

        Console.WriteLine("  Database seeded successfully");
        Console.WriteLine($" User:    test@cashflow.com / Test@123");
        Console.WriteLine($" Wallets: 3 created");
        Console.WriteLine($" Transactions: {transactions.Count} created");
    }

    private static List<Transaction> GetSeedTransactions()
    {
        var userId          = SeedConstants.TestUserId;
        var mainWalletId    = SeedConstants.MainWalletId;
        var savingsWalletId = SeedConstants.SavingsWalletId;
        var cashWalletId    = SeedConstants.CashWalletId;
        var now             = DateTime.UtcNow;

        return new List<Transaction>
        {
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 1800, Type = TransactionType.Expense,
                Nature = TransactionNature.Subscription, Status = TransactionStatus.Incomplete,
                CounterpartyName = "Figma", CounterpartyLogo = null,
                Category = "Application", Description = "Figma subscription",
                Date = now.AddDays(-2), CreatedAt = now.AddDays(-2)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 4200, Type = TransactionType.Expense,
                Nature = TransactionNature.Payout, Status = TransactionStatus.Incomplete,
                CounterpartyName = "Employees", CounterpartyLogo = null,
                Category = "Payroll", Description = "Employee salary",
                Date = now.AddDays(-5), CreatedAt = now.AddDays(-5)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 950, Type = TransactionType.Expense,
                Nature = TransactionNature.Subscription, Status = TransactionStatus.Incomplete,
                CounterpartyName = "Spotify", CounterpartyLogo = null,
                Category = "Entertainment", Description = "Spotify subscription",
                Date = now.AddDays(-1), CreatedAt = now.AddDays(-1)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 120, Type = TransactionType.Expense,
                Nature = TransactionNature.Payout, Status = TransactionStatus.Completed,
                CounterpartyName = "Electric Company", CounterpartyLogo = null,
                Category = "Utilities", Description = "Electricity bill",
                Date = now.AddDays(-4), CreatedAt = now.AddDays(-4)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = cashWalletId,
                Amount = 300, Type = TransactionType.Expense,
                Nature = TransactionNature.Payout, Status = TransactionStatus.Completed,
                CounterpartyName = "Grocery Store", CounterpartyLogo = null,
                Category = "Food", Description = "Weekly groceries",
                Date = now.AddDays(-3), CreatedAt = now.AddDays(-3)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 9000, Type = TransactionType.Income,
                Nature = TransactionNature.Receive, Status = TransactionStatus.Completed,
                CounterpartyName = "Client Payments", CounterpartyLogo = null,
                Category = "Business", Description = "Business income",
                Date = now.AddDays(-7), CreatedAt = now.AddDays(-7)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 3000, Type = TransactionType.Income,
                Nature = TransactionNature.Receive, Status = TransactionStatus.Completed,
                CounterpartyName = "Salary", CounterpartyLogo = null,
                Category = "Employment", Description = "Monthly salary",
                Date = new DateTime(now.Year, now.Month, 1),
                CreatedAt = new DateTime(now.Year, now.Month, 1)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 500, Type = TransactionType.Income,
                Nature = TransactionNature.Receive, Status = TransactionStatus.Completed,
                CounterpartyName = "Freelance Client", CounterpartyLogo = null,
                Category = "Freelance", Description = "Web project payment",
                Date = now.AddDays(-10), CreatedAt = now.AddDays(-10)
            },
            // Last month — for percentage change
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 3000, Type = TransactionType.Income,
                Nature = TransactionNature.Receive, Status = TransactionStatus.Completed,
                CounterpartyName = "Salary", CounterpartyLogo = null,
                Category = "Employment", Description = "Monthly salary",
                Date = now.AddMonths(-1), CreatedAt = now.AddMonths(-1)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 300, Type = TransactionType.Income,
                Nature = TransactionNature.Receive, Status = TransactionStatus.Completed,
                CounterpartyName = "Freelance Client", CounterpartyLogo = null,
                Category = "Freelance", Description = "Design project",
                Date = now.AddMonths(-1).AddDays(5),
                CreatedAt = now.AddMonths(-1).AddDays(5)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = mainWalletId,
                Amount = 800, Type = TransactionType.Expense,
                Nature = TransactionNature.Payout, Status = TransactionStatus.Completed,
                CounterpartyName = "Landlord", CounterpartyLogo = null,
                Category = "Housing", Description = "Monthly rent",
                Date = now.AddMonths(-1).AddDays(2),
                CreatedAt = now.AddMonths(-1).AddDays(2)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId, WalletId = cashWalletId,
                Amount = 400, Type = TransactionType.Expense,
                Nature = TransactionNature.Payout, Status = TransactionStatus.Completed,
                CounterpartyName = "Grocery Store", CounterpartyLogo = null,
                Category = "Food", Description = "Groceries",
                Date = now.AddMonths(-1).AddDays(8),
                CreatedAt = now.AddMonths(-1).AddDays(8)
            },
            new() {
                Id = Guid.NewGuid(), UserId = userId,
                WalletId = mainWalletId, ToWalletId = savingsWalletId,
                Amount = 200, Type = TransactionType.Transfer,
                Nature = TransactionNature.Transfer, Status = TransactionStatus.Completed,
                CounterpartyName = "Savings Account", CounterpartyLogo = null,
                Category = "Transfer", Description = "Monthly savings transfer",
                Date = new DateTime(now.Year, now.Month, 3),
                CreatedAt = new DateTime(now.Year, now.Month, 3)
            },
        };
    }
}
