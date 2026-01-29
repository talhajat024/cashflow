using CashFlow.Api.Domain.Entities;
namespace CashFlow.Api.Domain.Models;

public class DashboardOverview
{
    public decimal TotalBalance { get; set; }
    public decimal TotalIncome { get; set; }
    public decimal TotalSpending { get; set; }
    public List<Transaction> RecentTransactions { get; set; } = [];
}
