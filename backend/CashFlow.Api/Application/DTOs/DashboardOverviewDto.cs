namespace CashFlow.Api.Application.DTOs;

public class DashboardOverviewDto
{
    public decimal TotalBalance {get;set;}
    public decimal TotalIncome {get;set;}
    public decimal TotalSpending {get;set;}

    public IEnumerable<TransactionDto> RecentTransactions { get; set; } = [];

}
