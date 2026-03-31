using CashFlow.Api.Application.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace CashFlow.Api.Application.Services;

public class InsightService:IInsightService
{
    private readonly IGeminiClientFactory _gemini;
    private readonly IDistributedCache _cache;
    public InsightService(IGeminiClientFactory gemini,IDistributedCache cache)
    {
        _gemini=gemini;
        _cache=cache;
    }

    public async Task<string> GenerateInsightAsync(SpendingInsightData data)
    {
        var cacheKey= $"insight:{data.TotalIncomeThisMonth:F0}:{data.TotalSpendingThisMonth:F0}:" +
                       $"{data.TotalIncomeLastMonth:F0}:{data.TotalSpendingLastMonth:F0}";
        var cached= await _cache.GetStringAsync(cacheKey);
        if(cached is not null)
        {
            Console.WriteLine($"CACHE HIT Insight at {DateTime.UtcNow:HH:mm:ss}");
            return cached;
        }

        Console.WriteLine($" CACHE MISS Insight at {DateTime.UtcNow:HH:mm:ss}");
        try
        {
            var model = _gemini.CreateModel();

            var prompt = BuildPrompt(data);
            var response = await model.GenerateContent(prompt);
            var insight = response.Text?.Trim() ?? string.Empty;

            if(string.IsNullOrEmpty(insight))
                return FallbackInsight(data);

            Console.WriteLine($"AI Insight: {insight}");
            await _cache.SetStringAsync(cacheKey,insight,new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow=TimeSpan.FromHours(1)
            });
            return insight;
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Insight generation failed:{ex.Message}");
            return FallbackInsight(data);
        }
    }

    public static string BuildPrompt(SpendingInsightData data)
    {
        var thisMonth = string.Join(",", data.ThisMonthCategories.Select(c => $"{c.Category}:${c.Amount:F0}"));
        var lastMonth = string.Join(",", data.LastMonthCategories.Select(c => $"{c.Category}:${c.Amount:F0}"));

        return $"ThisMonth:income${data.TotalIncomeThisMonth:F0},spend${data.TotalSpendingThisMonth:F0},[{thisMonth}]." +
               $"LastMonth:income${data.TotalIncomeLastMonth:F0},spend${data.TotalSpendingLastMonth:F0},[{lastMonth}].\n" +
               "Reply ONE insight sentence≤12words. No prefix. No explanation. No quotes.";
    }

    private static string FallbackInsight(SpendingInsightData data)
    {
        if(data.TotalSpendingLastMonth == 0)
            return "Start Tracking your spending to get insights";
        
        var change = data.TotalSpendingThisMonth - data.TotalSpendingLastMonth;
        var pct = Math.Abs(Math.Round((change/data.TotalSpendingLastMonth)*100,0));
        return change > 0 ? $"Spending up {pct}% vs last month"
            : $"Great job! Spending down {pct}% vs last month";
    }

}
