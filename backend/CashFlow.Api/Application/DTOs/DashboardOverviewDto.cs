using CashFlow.Api.Application.DTOs.BalanceOverview;
using CashFlow.Api.Application.DTOs.Spending;
using CashFlow.Api.Application.DTOs.SummaryCards;
using CashFlow.Api.Application.DTOs.Transactions;
namespace CashFlow.Api.Application.DTOs;

public class DashboardOverviewDto
{
    public IReadOnlyList<SummaryCardDto> SummaryCards { get; set; }
        = Array.Empty<SummaryCardDto>();

    public BalanceOverviewChartDto BalanceOverviewChart {get;set;} = new();
    public AllSpendingDto AllSpending { get; set; } = new();
    
    public List<TransactionDto> RecentTransactions { get; set; } = [];
}
