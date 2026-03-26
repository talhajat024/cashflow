using CashFlow.Api.Application.Common;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Repositories;
using MediatR;

namespace CashFlow.Api.Application.Reports.Queries.GetTransactionStats;

public class GetTransactionStatsHandler:IRequestHandler<GetTransactionStatsQuery,Result<GetTransactionStatsResponse>>
{
    private readonly ITransactionRepository _transactionRepo;
    public GetTransactionStatsHandler(ITransactionRepository transactionRepo)
    {
        _transactionRepo=transactionRepo;
    }

    public async Task<Result<GetTransactionStatsResponse>> Handle(GetTransactionStatsQuery query,CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var start= new DateTime(now.Year,now.Month,1);

        var allTransactions= await _transactionRepo.GetByUserAsync(query.UserId);
        var expenses= allTransactions.Where(t=> t.Type == TransactionType.Expense && t.Date >= start).ToList();

        var total= expenses.Sum(t=> t.Amount);
        var categories = expenses.GroupBy(t=> t.Category)
        .Select(g=> new TransactionCategoryDto
        {
            Name = g.Key,
            Amount = g.Sum(t=> t.Amount),
            Percentage = total == 0 ? 0 : Math.Round((double)g.Sum(t=> t.Amount)/(double)total*100,1)
            
        }).OrderByDescending(c=> c.Amount)
        .ToList();

        var topMerchants = expenses.Where(t=> !string.IsNullOrEmpty(t.CounterpartyName)).GroupBy(t=> new {t.CounterpartyName,t.CounterpartyLogo,t.Category})
        .Select(g=> new TopMerchantDto
        {
            Name= g.Key.CounterpartyName ?? string.Empty,
            Logo = g.Key.CounterpartyLogo,
            Category= g.Key.Category,
            TotalAmount= g.Sum(t=> t.Amount),
            Transactions= g.Count(),
        })
        .OrderByDescending(m=> m.TotalAmount)
        .Take(5)
        .ToList();

        return Result<GetTransactionStatsResponse>.Success(new GetTransactionStatsResponse
        {
            Categories= categories,
            TopMerchants= topMerchants,
            Total=total,
        });
    }
}
