using CashFlow.Api.Application.Interfaces;
using Mscc.GenerativeAI;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

namespace CashFlow.Api.Application.Services;

public class BudgetService:IBudgetService
{
    private readonly IGeminiClientFactory _gemini;
    private readonly IDistributedCache _cache;
    public BudgetService(IGeminiClientFactory gemini,IDistributedCache cache)
    {
        _gemini=gemini;
        _cache=cache;
    }

    public async Task<BudgetRecommendationResult> GenerateRecommendationsAsync(List<CategorySpendingData> spendingData,decimal totalMonthlyIncome)
    {
        var cacheKey = $"budget:{totalMonthlyIncome:F0}:{string.Join(",", spendingData.Select(s => $"{s.Category}:{s.MonthlyAvg:F0}"))}";
        // Check
        var cached= await _cache.GetStringAsync(cacheKey);
        if(cached is not null)
        {
            Console.WriteLine($" CACHE HIT at {DateTime.UtcNow:HH:mm:ss.fff}");
            return JsonSerializer.Deserialize<BudgetRecommendationResult>(cached)!;
        }
        Console.WriteLine($"CACHE MISS at {DateTime.UtcNow:HH:mm:ss.fff}");
        try
        {
            Console.WriteLine($" Gemini API CALLED at {DateTime.UtcNow:HH:mm:ss.fff}");
            var model = _gemini.CreateModel();
            var prompt = BuildPrompt(spendingData,totalMonthlyIncome);
            var response = await model.GenerateContent(prompt);
            var text= response.Text?.Trim() ?? string.Empty;
            var result = ParseResponse(text,spendingData);
            
            await _cache.SetStringAsync(cacheKey,JsonSerializer.Serialize(result),new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow=TimeSpan.FromHours(2)
            });
            return result;
        }
        catch(Exception ex)
        {
            Console.WriteLine($" Budget recommendation failed: {ex.Message}");
            return FallbackRecommendations(spendingData);
        }
    }

    private static string BuildPrompt(List<CategorySpendingData> spendingData, decimal totalMonthlyIncome)
    {
        var lines = string.Join(",", spendingData.Select(c =>
            $"{c.Category}:avg${c.MonthlyAvg:F0}/last${c.LastMonth:F0}"));

        return $"Finance advisor. Income:${totalMonthlyIncome:F0}. Spending:{lines}.\n" +
               "Reply ONLY JSON: {\"categories\":[{\"category\":\"\",\"suggestedBudget\":0," +
               "\"reasoning\":\"\",\"priority\":\"High|Medium|Low\"}]," +
               "\"overallInsight\":\"\"}\n" +
               "Max 5-20% reduction. Reasoning 8 words. Insight 12 words. No markdown.";
    }

    // Parse AI response
    private static BudgetRecommendationResult ParseResponse(string text,List<CategorySpendingData> spendingData)
    {
        try
        {
            var clean = text
                .Replace("```json", "")
                .Replace("```", "")
                .Trim();

            var json = JsonDocument.Parse(clean);
            var root = json.RootElement;

            var categories= root.GetProperty("categories").EnumerateArray().Select(c => new BudgetCategoryResult
                {
                    Category        = c.GetProperty("category").GetString()        ?? string.Empty,
                    SuggestedBudget = c.GetProperty("suggestedBudget").GetDecimal(),
                    Reasoning       = c.GetProperty("reasoning").GetString()       ?? string.Empty,
                    Priority        = c.GetProperty("priority").GetString()        ?? "Medium",
                }).ToList();

            var overallInsight=root.GetProperty("overallInsight").GetString() ?? string.Empty;

            return new BudgetRecommendationResult
            {
                Categories  = categories,
                OverallInsight= overallInsight,
            };
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Budget parse failed: {ex.Message}");
            return FallbackRecommendations(spendingData);
        }
    }

    private static BudgetRecommendationResult FallbackRecommendations(
        List<CategorySpendingData> spendingData)
    {
        return new BudgetRecommendationResult
        {
            Categories = spendingData.Select(c => new BudgetCategoryResult
            {
                Category        = c.Category,
                SuggestedBudget = Math.Round(c.MonthlyAvg * 0.9m, 0),
                Reasoning       = "Suggested 10% reduction",
                Priority        = "Medium",
            }).ToList(),
            OverallInsight = "Small reductions can lead to big savings"
        };
    }
}
