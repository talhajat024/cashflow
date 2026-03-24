using CashFlow.Api.Application.Common;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Repositories;
using MediatR;

namespace CashFlow.Api.Application.Reports.Queries.GetReportStats;

public class GetReportStatsHandler : IRequestHandler<GetReportStatsQuery, Result<GetReportStatsResponse>>
{
    private readonly ITransactionRepository _transactionRepo;

    public GetReportStatsHandler(ITransactionRepository transactionRepo)
    {
        _transactionRepo = transactionRepo;
    }

    public async Task<Result<GetReportStatsResponse>> Handle(GetReportStatsQuery query, CancellationToken cancellationToken)
    {
        var now            = DateTime.UtcNow;
        var thisMonthStart = new DateTime(now.Year, now.Month, 1);
        var lastMonthStart = thisMonthStart.AddMonths(-1);

        var allTransactions = await _transactionRepo.GetByUserAsync(query.UserId);

        var relevant = allTransactions
            .Where(t => t.Date >= lastMonthStart)
            .ToList();

        var thisMonthIncome   = relevant.Where(t => t.Date >= thisMonthStart && t.Type == TransactionType.Income).Sum(t => t.Amount);
        var lastMonthIncome   = relevant.Where(t => t.Date >= lastMonthStart && t.Date < thisMonthStart && t.Type == TransactionType.Income).Sum(t => t.Amount);
        var thisMonthSpending = relevant.Where(t => t.Date >= thisMonthStart && t.Type == TransactionType.Expense).Sum(t => t.Amount);
        var lastMonthSpending = relevant.Where(t => t.Date >= lastMonthStart && t.Date < thisMonthStart && t.Type == TransactionType.Expense).Sum(t => t.Amount);

        var incomeChange   = lastMonthIncome   == 0 ? 0 : Math.Round((double)(thisMonthIncome   - lastMonthIncome)   / (double)lastMonthIncome   * 100, 1);
        var spendingChange = lastMonthSpending == 0 ? 0 : Math.Round((double)(thisMonthSpending - lastMonthSpending) / (double)lastMonthSpending * 100, 1);

        return Result<GetReportStatsResponse>.Success(new GetReportStatsResponse
        {
            TotalIncome           = thisMonthIncome,
            TotalSpending         = thisMonthSpending,
            IncomeChangePercent   = incomeChange,
            SpendingChangePercent = spendingChange,
        });
    }
}