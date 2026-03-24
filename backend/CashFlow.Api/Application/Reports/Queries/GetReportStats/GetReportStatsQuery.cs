using CashFlow.Api.Application.Common;
using MediatR;
 
namespace CashFlow.Api.Application.Reports.Queries.GetReportStats;
 
public class GetReportStatsQuery : IRequest<Result<GetReportStatsResponse>>
{
    public Guid UserId { get; }
    public GetReportStatsQuery(Guid userId) => UserId = userId;
}