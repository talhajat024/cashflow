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
    private readonly IWalletService _walletService;
    public DashboardService(ITransactionService transactionService,IWalletService walletService)
    {
        _transactionService=transactionService;
        _walletService=walletService;
    }

    public async Task<DashboardOverviewDto> GetOverviewAsync(Guid userId,int balanceRangeInMonths)
    {
        var now= DateTime.UtcNow;

        // Date Range
        var thisMonthStart = new DateTime(now.Year,now.Month,1);
        var thisMonthEnd = thisMonthStart.AddMonths(1).AddDays(-1);
        var lastMonthStart = thisMonthStart.AddMonths(-1);
        var lastMonthEnd = thisMonthStart.AddDays(-1);

        // Parallel Queries via Services
        var totalBalanceTask = _walletService.GetTotalBalanceAsync(userId);
        var incomeThisMonthTask = _transactionService.GetTotalByTypeAndPeriodAsync(userId,TransactionType.Income,thisMonthStart,thisMonthEnd);
        var incomeLastMonthTask = _transactionService.GetTotalByTypeAndPeriodAsync(userId,TransactionType.Income,lastMonthStart,lastMonthEnd); 
        var spendingThisMonthTask = _transactionService.GetTotalByTypeAndPeriodAsync(userId,TransactionType.Expense,thisMonthStart,thisMonthEnd); 
        var spendingLastMonthTask = _transactionService.GetTotalByTypeAndPeriodAsync(userId,TransactionType.Expense,lastMonthStart,lastMonthEnd); 
        var allTransactionsTask =  _transactionService.GetAllAsync(userId);

        await Task.WhenAll(
            totalBalanceTask,
            incomeThisMonthTask,incomeLastMonthTask,
            spendingThisMonthTask,spendingLastMonthTask,
            allTransactionsTask
        );

        var totalBalance= totalBalanceTask.Result;
        var incomeThisMonth= incomeThisMonthTask.Result;
        var incomeLastMonth= incomeLastMonthTask.Result;
        var spendingThisMonth=spendingThisMonthTask.Result;
        var spendingLastMonth= spendingLastMonthTask.Result;
        var allTransactions=allTransactionsTask.Result;

        var incomeChange = CalculatePercentageChange(incomeLastMonth,incomeThisMonth);
        var spendingChange = CalculatePercentageChange(spendingLastMonth,spendingThisMonth);

        return new DashboardOverviewDto
        {
            SummaryCards=BuildSummaryCards(totalBalance,incomeThisMonth,incomeChange,spendingThisMonth,spendingChange),
            BalanceOverviewChart = BuildBalanceOverviewChart(allTransactions,balanceRangeInMonths),
            AllSpending = BuildAllSpending(allTransactions),
            RecentTransactions = BuildRecentTransactions(allTransactions)
        };        
    }

    private static IReadOnlyList<SummaryCardDto> BuildSummaryCards(decimal totalBalance,decimal incomeThisMonth,decimal incomeChange,decimal spendingThisMonth,decimal spendingChange)
    {
        var now= DateTime.UtcNow.ToString("MMM yyyy");

        return new List<SummaryCardDto>
        {
            new()
            {
                Key="totalBalance",
                Title="Total Balance",
                Amount=totalBalance,
                PercentageChange=0, 
                ComparisonLabel="All Wallets",
                DateRange=now
            },
            new()
            {
                Key="totalIncome",
                Title="Total Income",
                Amount= incomeThisMonth,
                PercentageChange=Math.Abs(incomeChange), 
                ComparisonLabel=incomeChange >= 0 ? "▲ vs last month" : "▼ vs last month",
                DateRange=now
            },
            new()
            {
                Key="totalSpending",
                Title="Total Spending",
                Amount=spendingThisMonth,
                PercentageChange=Math.Abs(spendingChange),
                ComparisonLabel=spendingChange <= 0 ? "▲ vs last month" : "▼ vs last month",
                DateRange=now
            }
        };
    }

    private static BalanceOverviewChartDto BuildBalanceOverviewChart(IEnumerable<Transaction> transactions,int rangeInMonths)
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
        var grouped = transactions.GroupBy(t=> new{t.Date.Year,t.Date.Month})
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

    private static AllSpendingDto BuildAllSpending(IEnumerable<Transaction> transactions)
    {
        var now = DateTime.UtcNow;
        var expenses = transactions
            .Where(t=> t.Type == TransactionType.Expense)
            .ToList();

        var summary = new SpendingSummaryDto
        {
            Weekly = expenses.Where(t=> t.Date >= now.AddDays(-7))
            .Sum(t=> t.Amount),

            Monthly = expenses
            .Where(t=> t.Date >= now.AddMonths(-1))
            .Sum(t=> t.Amount),

            Yearly = expenses.Where(t=> t.Date >= now.AddYears(-1))
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

       var rangeExpenses = expenses.Where(t=> t.Date >= rangeStart)
       .ToList();

       decimal total = rangeExpenses.Sum(t=> t.Amount);
       var categories = rangeExpenses.GroupBy(t=> t.Category).Select(g=>
       {
           var amount = g.Sum(x=> x.Amount);
           return new SpendingCategoryDto
           {
               Key = g.Key.ToLower().Replace(" ",""),
               Label = g.Key,
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


    private static List<TransactionDto> BuildRecentTransactions(IEnumerable<Transaction> transactions,int count =5)
    {
        return transactions.OrderByDescending(t=> t.Date).Take(count).Select(t=> new TransactionDto
        {
            Company= t.CounterpartyName,
            Category = t.Category,
            Type=t.Nature.ToString(),
            Date=t.Date,
            Amount = t.Amount,
            Status = t.Status.ToString(),
            IconKey = ResolveIconKey(t.Category)
        })
        .ToList();
    }


    // Helpers

    private static decimal CalculatePercentageChange(decimal previous, decimal current)
    {
        if (previous == 0) return current > 0 ? 100 : 0;
        return Math.Round(((current - previous) / previous) * 100, 1);
    }

    private static string ResolveIconKey(string category)
    {
        return category.ToLower() switch
        {
        "entertainment" => "shopping-cart",
        "application"   => "briefcase",
        "food"          => "utensils",
        "travel"        => "plane",
        "payroll"       => "users",
        "business"      => "building",
        "employment"    => "briefcase",
        "freelance"     => "laptop",
        "utilities"     => "zap",
        "housing"       => "home",
        _               => "wallet"
        };
    }
}
