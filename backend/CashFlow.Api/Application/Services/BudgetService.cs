using CashFlow.Api.Application.Interfaces;
using Mscc.GenerativeAI;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace CashFlow.Api.Application.Services;

public class BudgetService:IBudgetService
{
    private readonly string _apiKey;
    public BudgetService(IConfiguration configuration)
    {
        _apiKey=configuration["Gemini:ApiKey"]
            ?? throw new InvalidOperationException("Gemini API key not configured");
    }

    public async Task<BudgetRecommendationResult> GenerateRecommendationsAsync(List<CategorySpendingData> spendingData,decimal totalMonthlyIncome)
    {
        try
        {
            var googleAI= new GoogleAI(_apiKey);
            var model = googleAI.GenerativeModel("gemini-2.5-flash");

            var prompt = BuildPrompt(spendingData,totalMonthlyIncome);
            var response = await model.GenerateContent(prompt);
            var text= response.Text?.Trim() ?? string.Empty;
            
            Console.WriteLine($"AI Budget Response: {text}");

            return ParseResponse(text, spendingData);
        }
        catch(Exception ex)
        {
            Console.WriteLine($" Budget recommendation failed: {ex.Message}");
            return FallbackRecommendations(spendingData);
        }
    }

    private static string BuildPrompt(
        List<CategorySpendingData> spendingData,
        decimal totalMonthlyIncome)
    {
        var categoryLines = string.Join("\n", spendingData.Select(c =>
            $"- {c.Category}: avg ${c.MonthlyAvg:F0}/month " +
            $"(last month: ${c.LastMonth:F0}, two months ago: ${c.TwoMonthsAgo:F0})"));

        // Use regular string concatenation to avoid raw string interpolation issues
        return
            "You are a personal finance advisor. Generate budget recommendations.\n\n" +
            $"User's monthly income: ${totalMonthlyIncome:F0}\n\n" +
            "Current spending by category (last 3 months average):\n" +
            categoryLines + "\n\n" +
            "Return ONLY a JSON object in this exact format, no explanation:\n" +
            "{\n" +
            "  \"categories\": [\n" +
            "    {\n" +
            "      \"category\": \"Food\",\n" +
            "      \"suggestedBudget\": 650,\n" +
            "      \"reasoning\": \"Reduce by 150 to improve savings\",\n" +
            "      \"priority\": \"High\"\n" +
            "    }\n" +
            "  ],\n" +
            "  \"overallInsight\": \"You could save 200 per month with these adjustments\"\n" +
            "}\n\n" +
            "Rules:\n" +
            "- priority must be: High, Medium, or Low\n" +
            "- suggestedBudget should be realistic (5-20% reduction max)\n" +
            "- reasoning max 8 words\n" +
            "- overallInsight max 12 words\n" +
            "- Return valid JSON only — no markdown, no backticks";
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
