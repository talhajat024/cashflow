using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Application.DTOs;
using CashFlow.Api.Application.DTOs.SummaryCards;
using CashFlow.Api.Application.DTOs.BalanceOverview;
using CashFlow.Api.Application.DTOs.Spending;
using CashFlow.Api.Application.DTOs.Transactions;

namespace CashFlow.Api.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly ITransactionService _transactionService;
    public DashboardService(ITransactionService transactionService)
    {
        _transactionService=transactionService;
    }


    public async Task<DashboardOverviewDto> GetOverviewAsync(Guid userId,int balanceRangeInMonths)
    {
        var transactions= await _transactionService.GetAllAsync(userId);

            return new DashboardOverviewDto
            {
                SummaryCards=BuildSummaryCards(transactions),
                BalanceOverviewChart = BuildBalanceOverviewChart(transactions,balanceRangeInMonths),
                AllSpending = BuildAllSpending(transactions),
                RecentTransactions = BuildRecentTransactions(transactions)
            };        
    }

    private IReadOnlyList<SummaryCardDto> BuildSummaryCards(IEnumerable<Transaction> transactions)
    {
        var income = transactions.Where(t=> t.Type == TransactionType.Income).Sum(t=> t.Amount);
        var expense = transactions.Where(t=> t.Type == TransactionType.Expense).Sum(t=> t.Amount);

        return new List<SummaryCardDto>
        {
            new()
            {
                Key="totalBalance",
                Title="Total Balance",
                Amount=income-expense,
                PercentageChange=16, // dummy
                ComparisonLabel="Last Year",
                DateRange="Jul - Sep 2023"
            },
            new()
            {
                Key="totalIncome",
                Title="Total Income",
                Amount= income,
                PercentageChange=12, // dummy
                ComparisonLabel="Last Month",
                DateRange="Jul - Sep 2023"
            },
            new()
            {
                Key="totalSpending",
                Title="Total Spending",
                Amount=expense,
                PercentageChange=-10,
                ComparisonLabel="Last Year",
                DateRange="Jul - Sep 2023"
            }
        };
    }

    private BalanceOverviewChartDto BuildBalanceOverviewChart(IEnumerable<Transaction> transactions,int rangeInMonths)
    {
        var now = DateTime.UtcNow;
        var months = Enumerable.Range(0,rangeInMonths)
        .Select(i=>
        {
            var date = now.AddMonths(-(rangeInMonths-1-i));
            return new
            {
                date.Year,
                date.Month,
                Label=date.ToString("MMM")
            };
        })
        .ToList();

        // Group Transactions by year + month
        var grouped = transactions.GroupBy(t=> new{t.CreatedAt.Year,t.CreatedAt.Month})
        .ToDictionary(g=> g.Key,g=> g.ToList());

        var incomeSeries = new BalanceChartSeriesDto
        {
            Name ="Income",
            Data= months.Select(m=>
            {
                grouped.TryGetValue(
                    new {m.Year,m.Month},
                    out var monthTransactions);

                var total = monthTransactions?
                .Where(t=> t.Type == TransactionType.Income)
                .Sum(t=> t.Amount) ?? 0;

                return new MonthlyAmountDto
                {
                    Month=m.Month,
                    MonthLabel=m.Label,
                    Amount=total
                };
            }).ToList()
        };

        // Build spending series
        var spendingSeries = new BalanceChartSeriesDto
        {
            Name = "Spending",
            Data = months.Select(m=>
            {
                grouped.TryGetValue(
                    new {m.Year,m.Month},
                    out var monthTransactions);
                
                var total = monthTransactions?
                .Where(t=> t.Type == TransactionType.Expense)
                .Sum(t=> t.Amount) ?? 0;

                return new MonthlyAmountDto
                {
                    Month= m.Month,
                    MonthLabel= m.Label,
                    Amount=total
                };
            }).ToList()
        };

        return new BalanceOverviewChartDto
        {
            RangeInMonths = rangeInMonths,
            HighlightedIndex = months.Count -1,
            Series = new [] {incomeSeries,spendingSeries}
        };
    }

    private AllSpendingDto BuildAllSpending(IEnumerable<Transaction> transactions)
    {
        var now = DateTime.UtcNow;
        var expenses = transactions
            .Where(t=> t.Type == TransactionType.Expense)
            .ToList();

        var summary = new SpendingSummaryDto
        {
            Weekly = expenses.Where(t=> t.CreatedAt >= now.AddDays(-7))
            .Sum(t=> t.Amount),

            Monthly = expenses
            .Where(t=> t.CreatedAt >= now.AddMonths(-1))
            .Sum(t=> t.Amount),

            Yearly = expenses.Where(t=> t.CreatedAt >= now.AddYears(-1))
            .Sum(t=> t.Amount)
        };    

        // Build donut chart per range
        var byRange = new Dictionary<TimeRange,DonutChartDto>();

        foreach(var range in Enum.GetValues<TimeRange>())
        {
            DateTime rangeStart = range switch
            {
                TimeRange.Weekly=> now.AddDays(-7),
                TimeRange.Monthly => now.AddMonths(-1),
                TimeRange.Yearly => now.AddYears(-1),
                 _ => now.AddMonths(-1)
            };

       var rangeExpenses = expenses.Where(t=> t.CreatedAt >= rangeStart)
       .ToList();

       decimal total = rangeExpenses.Sum(t=> t.Amount);
       var categories = rangeExpenses.GroupBy(t=> new {t.CategoryKey,t.CategoryLabel}).Select(g=>
       {
           var amount = g.Sum(x=> x.Amount);
           return new SpendingCategoryDto
           {
               Key = g.Key.CategoryKey,
               Label = g.Key.CategoryLabel,
               Amount = amount,
               Percentage= total ==0
               ? 0 : Math.Round((amount/total)*100,2)
           };
       }).OrderByDescending(c => c.Amount)
        .ToList();

        byRange[range]= new DonutChartDto
        {
            Total=total,
            Categories=categories
        };
        }

        return new AllSpendingDto
        {
            Currency="USD",
            Summary =summary,
           ByRange=byRange
        };
    }


    private List<TransactionDto> BuildRecentTransactions(IEnumerable<Transaction> transactions,int count =5)
    {
        return transactions.OrderByDescending(t=> t.CreatedAt).Take(count).Select(t=> new TransactionDto
        {
            Company= ResolveCompanyName(t),
            Category = t.CategoryLabel,
            Type=t.Type.ToString(),
            Date=t.CreatedAt,
            Amount = t.Amount,
            Status = "Completed",
            IconKey = ResolveIconKey(t.CategoryKey)
        })
        .ToList();
    }

    private static string ResolveCompanyName(Transaction transaction)
    {
        // Placeholder logic — replace later with real merchant data
        return transaction.Type == TransactionType.Income
            ? "Income"
            : transaction.CategoryLabel;
    }
    
    private static string ResolveIconKey(string categoryKey)
    {
        return categoryKey switch
        {
            "shopping"  => "shopping-cart",
            "workspace" => "briefcase",
            "food"      => "utensils",
            "travel"    => "plane",
            _           => "wallet"
        };
    }
}
