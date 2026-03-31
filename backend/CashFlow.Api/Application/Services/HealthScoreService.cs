using CashFlow.Api.Application.Interfaces;
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;

namespace CashFlow.Api.Application.Services;

public class HealthScoreService:IHealthScoreService
{
    private readonly IGeminiClientFactory _gemini;
    private readonly IDistributedCache _cache;
    public HealthScoreService(IGeminiClientFactory gemini,IDistributedCache cache)
    {
        _gemini=gemini;
        _cache= cache;
    }

    public async Task<HealthScoreResult> GenerateHealthScoreAsync(HealthScoreData data)
    {
        var cacheKey= $"healthscore:{data.AvgMonthlyIncome:F0}:{data.AvgMonthlySpending:F0}:" +
                       $"{data.AvgSavingsRate:F1}:{data.CurrentBalance:F0}:{data.TotalTransactions}";
        var cached= await _cache.GetStringAsync(cacheKey);
        if(cached is not null)
        {
            Console.WriteLine("CACHE HIT HealthScore at {DateTime.UtcNow:HH:mm:ss}");
            return JsonSerializer.Deserialize<HealthScoreResult>(cached)!;
        }

        Console.WriteLine($" CACHE MISS HealthScore at {DateTime.UtcNow:HH:mm:ss}");
        try
        {
            var model = _gemini.CreateModel();
            var prompt= BuildPrompt(data);
            var response = await model.GenerateContent(prompt);
            var text= response.Text?.Trim() ?? string.Empty;

            var result = ParseResponse(text,data);
            await _cache.SetStringAsync(cacheKey,JsonSerializer.Serialize(result), new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(2)
            });
            return result;
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Health score generation failed: {ex.Message}");
            return FallbackScore(data);
        }
    }

    private static string BuildPrompt(HealthScoreData data)
    {
        var categories = string.Join(",", data.TopCategories);

        return $"Income:{data.AvgMonthlyIncome:F0}/mo,Spend:{data.AvgMonthlySpending:F0}/mo," +
               $"Savings:{data.AvgSavingsRate:F1}%,Balance:{data.CurrentBalance:F0}," +
               $"Growth:{data.BalanceGrowth:F0},IncomeMonths:{data.IncomeThisMonth:F0}/{data.IncomeLastMonth:F0}/{data.IncomeTwoMonthsAgo:F0}," +
               $"SpendMonths:{data.SpendingThisMonth:F0}/{data.SpendingLastMonth:F0}," +
               $"Transactions:{data.TotalTransactions},TopCategories:{categories}.\n" +
               "JSON only:{\"score\":0,\"grade\":\"\",\"summary\":\"\",\"strengths\":[],\"improvements\":[]," +
               "\"breakdown\":{\"savingsRate\":0,\"incomeStability\":0,\"spendingControl\":0,\"balanceGrowth\":0}}\n" +
               "Rules: score=0-100. grade=A(90+)/B(75-89)/C(60-74)/D(45-59)/F(<45). " +
               "2-3 strengths/improvements≤8words each. summary≤10words. No markdown.";
    }
    private static HealthScoreResult ParseResponse(string text, HealthScoreData data)
    {
        try
        {
            var clean = text.Replace("```json", "")
                .Replace("```", "")
                .Trim();
            var json = JsonDocument.Parse(clean);
            var root = json.RootElement;

            var strengths = root.GetProperty("strengths").EnumerateArray().Select(s=> s.GetString() ?? string.Empty)
            .ToList();

            var improvements = root.GetProperty("improvements")
            .EnumerateArray()
            .Select(s=> s.GetString() ?? string.Empty)
            .ToList();

            var breakdown = root.GetProperty("breakdown");

            return new HealthScoreResult
            {
                Score = root.GetProperty("score").GetInt32(),
                Grade = root.GetProperty("grade").GetString() ?? "C",
                Summary         = root.GetProperty("summary").GetString() ?? string.Empty,
                Strengths       = strengths,
                Improvements    = improvements,
                SavingsRate     = breakdown.GetProperty("savingsRate").GetInt32(),
                IncomeStability = breakdown.GetProperty("incomeStability").GetInt32(),
                SpendingControl = breakdown.GetProperty("spendingControl").GetInt32(),
                BalanceGrowth   = breakdown.GetProperty("balanceGrowth").GetInt32(),
            };
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Health score parse failed: {ex.Message}");
            return FallbackScore(data);
        }
    }

    private static HealthScoreResult FallbackScore(HealthScoreData data)
    {
        // Calculate basic score from data
        var savingsScore = Math.Min(100,(int)(data.AvgSavingsRate*4));
        var balanceScore = data.BalanceGrowth >= 0 ? 75 : 40;
        var overallScore = (savingsScore + balanceScore) /2 ;

        var grade= overallScore switch
        {
            >= 90 => "A",
            >= 75 => "B",
            >= 60 => "C",
            >= 45 => "D",
            _     => "F"

        };

        return new HealthScoreResult
        {
            Score = overallScore,
            Grade = grade,
            Summary         = "Based on your recent financial activity",
            Strengths       = ["Regular transaction activity"],
            Improvements    = ["Track spending by category"],
            SavingsRate     = savingsScore,
            IncomeStability = 70,
            SpendingControl = 65,
            BalanceGrowth   = balanceScore
        };
    }
}
