using CashFlow.Api.Application.Common;
using MediatR;

namespace CashFlow.Api.Application.Dashboard.Queries.GetHealthScore;

public record GetHealthScoreQuery(Guid UserId):IRequest<Result<GetHealthScoreResponse>>;
