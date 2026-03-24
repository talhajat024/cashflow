using CashFlow.Api.Application.Common;
using MediatR;

namespace CashFlow.Api.Application.Reports.Queries.GetIncomeVsExpense;

public class GetIncomeVsExpenseQuery:IRequest<Result<List<IncomeVsExpenseMonthDto>>>
{
    public Guid UserId {get;}
    public GetIncomeVsExpenseQuery(Guid userId)=> UserId = userId;
}
