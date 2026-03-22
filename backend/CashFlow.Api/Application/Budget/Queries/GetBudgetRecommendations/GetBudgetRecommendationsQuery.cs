using CashFlow.Api.Application.Common;
using MediatR;

namespace CashFlow.Api.Application.Budget.Queries.GetBudgetRecommendations;

public record GetBudgetRecommendationsQuery(Guid UserId):IRequest<Result<GetBudgetRecommendationsResponse>>;
