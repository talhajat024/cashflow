using CashFlow.Api.Application.Common;
using MediatR;

namespace CashFlow.Api.Application.Reports.Queries.GetTransactionStats;

public class GetTransactionStatsQuery : IRequest<Result<GetTransactionStatsResponse>>
{
    public Guid UserId { get; }
    public GetTransactionStatsQuery(Guid userId) => UserId = userId;
}