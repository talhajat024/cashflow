using CashFlow.Api.Application.Common;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Repositories;
using MediatR;

namespace CashFlow.Api.Application.Reports.Queries.GetIncomeVsExpense;

public class GetIncomeVsExpenseHandler:IRequestHandler<GetIncomeVsExpenseQuery,Result<List<IncomeVsExpenseMonthDto>>>
{
    private readonly ITransactionRepository _transactionRepo;
    public GetIncomeVsExpenseHandler(ITransactionRepository transactionRepo)
    {
        _transactionRepo=transactionRepo;
    }
    public async Task<Result<List<IncomeVsExpenseMonthDto>>> Handle(GetIncomeVsExpenseQuery query,CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var start= new DateTime(now.Year,now.Month,1).AddMonths(-11);

        var allTransactions = await _transactionRepo.GetByUserAsync(query.UserId);
        var relevant = allTransactions.Where(t=> t.Date >= start).ToList();

        var result= Enumerable.Range(0,12)
        .Select(i=> start.AddMonths(i))
        .Select(m=> new IncomeVsExpenseMonthDto
        {
            Month = m.ToString("MMM"),
            Income= relevant.Where(t=> t.Date.Year == m.Year && t.Date.Month == m.Month && t.Type == TransactionType.Income).Sum(t=> t.Amount),
            Expense= relevant
                            .Where(t => t.Date.Year == m.Year && t.Date.Month == m.Month && t.Type == TransactionType.Expense)
                            .Sum(t => t.Amount),
        }).ToList();

        return Result<List<IncomeVsExpenseMonthDto>>.Success(result);
    }
}
