using CashFlow.Api.Application.Interfaces;
using Mscc.GenerativeAI;

namespace CashFlow.Api.Application.Services;

public class InsightService:IInsightService
{
    private readonly string _apiKey;
    public InsightService(IConfiguration configuration)
    {
        _apiKey= configuration["Gemini:ApiKey"] ?? throw new InvalidOperationException("Gemini API key not configured");
    }

    public async Task<string> GenerateInsightAsync(SpendingInsightData data)
    {
        try
        {
            var googleAI = new GoogleAI(_apiKey);
            var model = googleAI.GenerativeModel("gemini-2.5-flash");

            var prompt = BuildPrompt(data);
            var response = await model.GenerateContent(prompt);

            var insight = response.Text?.Trim() ?? string.Empty;

            Console.WriteLine($"AI Insight: {insight}");
            return string.IsNullOrEmpty(insight) ? FallbackInsight(data):insight;
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Insight generation failed:{ex.Message}");
            return FallbackInsight(data);
        }
    }

    public static string BuildPrompt(SpendingInsightData data)
    {
        var thisMonth = string.Join(", ",data.ThisMonthCategories.Select(c=> $"{c.Category}: ${c.Amount:F0}"));
        
        var lastMonth = string.Join(", ", data.LastMonthCategories
            .Select(c => $"{c.Category}: ${c.Amount:F0}"));

        return $"""
            You are a personal finance advisor. Analyze this spending data and generate
            ONE short, specific, actionable insight (max 12 words).
            
            This month:
            - Total Income:   ${data.TotalIncomeThisMonth:F0}
            - Total Spending: ${data.TotalSpendingThisMonth:F0}
            - By category:    {thisMonth}
            
            Last month:
            - Total Income:   ${data.TotalIncomeLastMonth:F0}
            - Total Spending: ${data.TotalSpendingLastMonth:F0}
            - By category:    {lastMonth}
            
            Rules:
            - Return ONLY the insight text — no explanation, no prefix like "Insight:"
            - Be specific with numbers or percentages when relevant
            - Focus on the most notable change or pattern
            - Keep it under 12 words
            - Examples:
              "You spent 40% more on Food this month"
              "Great job! Spending down 15% vs last month"
              "Entertainment costs increased by $50 this month"
              "You're on track to save $500 this month"
            """;
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
