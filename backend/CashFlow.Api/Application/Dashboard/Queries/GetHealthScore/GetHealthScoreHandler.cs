using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Repositories;
using MediatR;

namespace CashFlow.Api.Application.Dashboard.Queries.GetHealthScore;

public class GetHealthScoreHandler:IRequestHandler<GetHealthScoreQuery,Result<GetHealthScoreResponse>>
{
    private readonly ITransactionRepository _transactionRepo;
    private readonly IWalletRepository _walletRepo;
    private readonly IHealthScoreService _healthScoreService;

    public GetHealthScoreHandler(ITransactionRepository transactionRepo,IWalletRepository walletRepo,IHealthScoreService healthScoreService)
    {
        _transactionRepo=transactionRepo;
        _walletRepo=walletRepo;
        _healthScoreService=healthScoreService;
    }

    public async Task<Result<GetHealthScoreResponse>> Handle(GetHealthScoreQuery query,CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;

        // Date Ranges 
        var thisMonthStart = new DateTime(now.Year,now.Month,1);
        var lastMonthStart = thisMonthStart.AddMonths(-1);
        var twoMonthsStart = thisMonthStart.AddMonths(-2);
        var threeMonthsStart= thisMonthStart.AddMonths(-3);

        // Fetch Data
        var allTransactions = await _transactionRepo.GetByUserAsync(query.UserId);
        var wallets = await _walletRepo.GetByUserIdAsync(query.UserId);

        if(!allTransactions.Any())
        {
            return Result<GetHealthScoreResponse>.NotFound("No transaction data found to calculate health score");
        }

        var threeMonthTx = allTransactions.Where(t=> t.Date >= threeMonthsStart)
        .ToList();

        // Income Calculations
        var incomeThisMonth    = threeMonthTx
            .Where(t => t.Type == TransactionType.Income && t.Date >= thisMonthStart)
            .Sum(t => t.Amount);

        var incomeLastMonth    = threeMonthTx
            .Where(t => t.Type == TransactionType.Income &&
                        t.Date >= lastMonthStart && t.Date < thisMonthStart)
            .Sum(t => t.Amount);

        var incomeTwoMonths    = threeMonthTx
            .Where(t => t.Type == TransactionType.Income &&
                        t.Date >= twoMonthsStart && t.Date < lastMonthStart)
            .Sum(t => t.Amount);

        var avgIncome = (incomeThisMonth + incomeLastMonth + incomeTwoMonths) / 3;


        // Spending Calculations 
        var spendingThisMonth  = threeMonthTx
            .Where(t => t.Type == TransactionType.Expense && t.Date >= thisMonthStart)
            .Sum(t => t.Amount);

        var spendingLastMonth  = threeMonthTx
            .Where(t => t.Type == TransactionType.Expense &&
                        t.Date >= lastMonthStart && t.Date < thisMonthStart)
            .Sum(t => t.Amount);

        var spendingTwoMonths  = threeMonthTx
            .Where(t => t.Type == TransactionType.Expense &&
                        t.Date >= twoMonthsStart && t.Date < lastMonthStart)
            .Sum(t => t.Amount);

        var avgSpending = (spendingThisMonth + spendingLastMonth + spendingTwoMonths) / 3;

        //  Savings Rate 
        var avgSavingsRate = avgIncome > 0
            ? ((avgIncome - avgSpending) / avgIncome) * 100 : 0;

        //  Balance 
        var currentBalance = wallets.Sum(w => w.Balance);
        var balanceGrowth  = currentBalance - (currentBalance - incomeThisMonth + spendingThisMonth);

        //  Top Categories 
        var topCategories = threeMonthTx
            .Where(t => t.Type == TransactionType.Expense)
            .GroupBy(t => t.Category)
            .OrderByDescending(g => g.Sum(t => t.Amount))
            .Take(3)
            .Select(g => g.Key)
            .ToList();

        //  Build Health Score Data 
        var healthData = new HealthScoreData
        {
            AvgMonthlyIncome   = Math.Round(avgIncome, 2),
            IncomeThisMonth    = incomeThisMonth,
            IncomeLastMonth    = incomeLastMonth,
            IncomeTwoMonthsAgo = incomeTwoMonths,
            AvgMonthlySpending = Math.Round(avgSpending, 2),
            SpendingThisMonth  = spendingThisMonth,
            SpendingLastMonth  = spendingLastMonth,
            AvgSavingsRate     = Math.Round(avgSavingsRate, 1),
            CurrentBalance     = currentBalance,
            BalanceGrowth      = balanceGrowth,
            TopCategories      = topCategories,
            TotalTransactions  = threeMonthTx.Count,
        };

        //  Call AI 
        var result = await _healthScoreService.GenerateHealthScoreAsync(healthData);

        return Result<GetHealthScoreResponse>.Success(new GetHealthScoreResponse
        {
            Score        = result.Score,
            Grade        = result.Grade,
            Summary      = result.Summary,
            Strengths    = result.Strengths,
            Improvements = result.Improvements,
            Breakdown    = new HealthScoreBreakdownDto
            {
                SavingsRate     = result.SavingsRate,
                IncomeStability = result.IncomeStability,
                SpendingControl = result.SpendingControl,
                BalanceGrowth   = result.BalanceGrowth,
            }
        });
    }
}
