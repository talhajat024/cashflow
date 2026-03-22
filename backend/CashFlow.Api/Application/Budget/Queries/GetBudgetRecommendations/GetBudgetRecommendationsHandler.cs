using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Repositories;
using MediatR;

namespace CashFlow.Api.Application.Budget.Queries.GetBudgetRecommendations;

public class GetBudgetRecommendationsHandler:IRequestHandler<GetBudgetRecommendationsQuery,Result<GetBudgetRecommendationsResponse>>
{
    private readonly ITransactionRepository _transactionRepo;
    private readonly IBudgetService _budgetService;
    
    public GetBudgetRecommendationsHandler(ITransactionRepository transactionRepo,IBudgetService budgetService)
    {
        _transactionRepo= transactionRepo;
        _budgetService= budgetService;
    }

    public async Task<Result<GetBudgetRecommendationsResponse>> Handle(GetBudgetRecommendationsQuery query,CancellationToken cancellationToken)
    {
        var now= DateTime.UtcNow;

        // Date Ranges 
        var ThisMonthStart = new DateTime(now.Year,now.Month,1);
        var lastMonthStart = ThisMonthStart.AddMonths(-1);
        var twoMonthsStart = ThisMonthStart.AddMonths(-2);
        var threeMonthsStart = ThisMonthStart.AddMonths(-3);

        // Get all Transactions (last 3 months)
        var allTransactions= await _transactionRepo.GetByUserAsync(query.UserId);
        var expenses = allTransactions.Where(t=> t.Type == TransactionType.Expense)
        .ToList();

        var income = allTransactions.Where(t=> t.Type == TransactionType.Income && t.Date >= threeMonthsStart).Sum(t=> t.Amount);
        var monthlyIncome = income/3;

        if(!expenses.Any())
        {
            return Result<GetBudgetRecommendationsResponse>.NotFound("No Spending data foundto generate recommendations");
        }

        // Build Category Spending Data
        var categories= expenses.Where(t=> t.Date >= threeMonthsStart)
        .GroupBy(t=> t.Category)
        .Select(g=>
        {
            var lastMonth= g.Where(t=> t.Date >= lastMonthStart && t.Date < ThisMonthStart).Sum(t=> t.Amount);
            var twoMonths = g.Where(t=> t.Date >= twoMonthsStart && t.Date < lastMonthStart).Sum(t=> t.Amount);
            var threeMonths = g.Where(t=> t.Date >= threeMonthsStart && t.Date < twoMonthsStart).Sum(t=> t.Amount);
            var avg= (lastMonth+twoMonths+threeMonths);

            return new CategorySpendingData
            {
                Category= g.Key,
                MonthlyAvg=Math.Round(avg,2),
                LastMonth = Math.Round(lastMonth,2),
                TwoMonthsAgo=Math.Round(twoMonths,2),
            };
        }).Where(c=> c.MonthlyAvg > 0)
        .OrderByDescending(c=> c.MonthlyAvg)
        .ToList();

        var aiResult = await _budgetService.GenerateRecommendationsAsync(categories,monthlyIncome);

        var recommendations = aiResult.Categories.Select(c=>
        {
            var current = categories.FirstOrDefault(x=> x.Category == c.Category);
            return new BudgetRecommendationDto
            {
                Category = c.Category,
                CurrentAvg = current?.MonthlyAvg ?? 0,
                SuggestedBudget = c.SuggestedBudget,
                Reasoning= c.Reasoning,
                Priority=c.Priority
            };
        }).ToList();

        var totalCurrent = recommendations.Sum(r=> r.CurrentAvg);
        var totalSuggested = recommendations.Sum(r=> r.SuggestedBudget);

        return Result<GetBudgetRecommendationsResponse>.Success(new GetBudgetRecommendationsResponse
        {
            Recommendations      = recommendations,
                TotalCurrentSpending  = Math.Round(totalCurrent, 2),
                TotalSuggestedBudget  = Math.Round(totalSuggested, 2),
                PotentialSavings      = Math.Round(totalCurrent - totalSuggested, 2),
                OverallInsight        = aiResult.OverallInsight,
        });
    }
}
