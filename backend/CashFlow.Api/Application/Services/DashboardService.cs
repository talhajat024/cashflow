using CashFlow.Api.Domain.Models;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Domain.Entities;
namespace CashFlow.Api.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly ITransactionService _transactionService;
    public DashboardService(ITransactionService transactionService)
    {
        _transactionService=transactionService;
    }


    public DashboardOverview GetOverview(Guid userId)
    {
        var transactions = _transactionService.GetRecent(userId,5);
        var income = transactions
            .Where(t => t.Type == TransactionType.Income)
            .Sum(t => t.Amount);

        var expense = transactions
            .Where(t => t.Type == TransactionType.Expense)
            .Sum(t => t.Amount);

            return new DashboardOverview
            {
                TotalIncome = income,
                TotalSpending = expense,
                TotalBalance = income- expense,
                RecentTransactions = transactions.ToList()
            };        
    }
}
