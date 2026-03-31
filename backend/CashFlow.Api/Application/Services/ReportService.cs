using CashFlow.Api.Application.Interfaces;
using Microsoft.Extensions.Caching.Distributed;

namespace CashFlow.Api.Application.Services;

public class ReportService :IReportService
{
    private readonly IGeminiClientFactory _gemini;
    private readonly IDistributedCache _cache;
    public ReportService(IGeminiClientFactory gemini,IDistributedCache cache)
    {
        _gemini = gemini;
        _cache= cache;
    }

    public async Task<string> GenerateReportNarrativeAsync(MonthlyReportData data)
    {
        var cacheKey = $"report:{data.UserName}:{data.Year}:{data.Month}:" +
                       $"{data.TotalIncome:F0}:{data.TotalSpending:F0}";

        var cached = await _cache.GetStringAsync(cacheKey);
        if (cached is not null)
        {
            Console.WriteLine($"CACHE HIT Report at {DateTime.UtcNow:HH:mm:ss}");
            return cached;
        }

        Console.WriteLine($" CACHE MISS Report at {DateTime.UtcNow:HH:mm:ss}");
        try
        {
            var model = _gemini.CreateModel();

            var categoryLines = string.Join(",", data.Categories.Select(c =>
            $"{c.Category}:${c.Amount:F0}({c.Percentage:F0}%)"));

            var prompt =
            $"Client:{data.UserName},{data.MonthName} {data.Year}. " +
            $"Income:${data.TotalIncome:F0},Spend:${data.TotalSpending:F0}," +
            $"Savings:${data.NetSavings:F0}({data.SavingsRate:F1}%)," +
            $"OpenBal:${data.OpeningBalance:F0},CloseBal:${data.ClosingBalance:F0}." +
            $"Categories:{categoryLines}.\n" +
            "Write 3-4 sentence financial narrative paragraph. " +
            "Mention biggest spending category. Comment savings rate (good if >20%). " +
            "One actionable recommendation. Professional friendly tone. No bullets. No markdown.";

            var response= await model.GenerateContent(prompt);
            var narrative = response.Text?.Trim() ?? FallbackNarrative(data);

            Console.WriteLine($"AI Report Narrative generated");

            await _cache.SetStringAsync(cacheKey,narrative,new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow= TimeSpan.FromHours(24)
            });
            return narrative;
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Report narrative failed: {ex.Message}");
            return FallbackNarrative(data);
        }
    }

    public static string FallbackNarrative(MonthlyReportData data)=>
        $"In {data.MonthName} {data.Year}, you earned ${data.TotalIncome:F2} and spent " +
        $"${data.TotalSpending:F2}, resulting in net savings of ${data.NetSavings:F2}. " +
        $"Your savings rate of {data.SavingsRate:F1}% " +
        (data.SavingsRate >= 20 ? "is excellent — keep it up!" : "has room for improvement.");
}
