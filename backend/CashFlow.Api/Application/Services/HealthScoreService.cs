using CashFlow.Api.Application.Interfaces;
using Mscc.GenerativeAI;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace CashFlow.Api.Application.Services;

public class HealthScoreService:IHealthScoreService
{
    private readonly string _apiKey;
    public HealthScoreService(IConfiguration configuration)
    {
        _apiKey=configuration["Gemini:ApiKey"] ?? throw new InvalidOperationException("Gemini API key not configured");
    }

    public async Task<HealthScoreResult> GenerateHealthScoreAsync(HealthScoreData data)
    {
        try
        {
            var googleAI= new GoogleAI(_apiKey);
            var model = googleAI.GenerativeModel("gemini-2.5-flash");

            var prompt= BuildPrompt(data);
            var response = await model.GenerateContent(prompt);
            var text= response.Text?.Trim() ?? string.Empty;

            Console.WriteLine($"AI Health Score Response: {text}");
            return ParseResponse(text,data);
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Health score generation failed: {ex.Message}");
            return FallbackScore(data);
        }
    }

    private static string BuildPrompt(HealthScoreData data)
    {
        var topCategories = string.Join(", ", data.TopCategories);
    
        return $$"""
            You are a financial health analyst. Score this user's financial health.
    
            Financial Data (last 3 months):
            - Average monthly income:       {{data.AvgMonthlyIncome:F2}}
            - Average monthly spending:     {{data.AvgMonthlySpending:F2}}
            - Average savings rate:         {{data.AvgSavingsRate:F1}}%
            - Current balance:              {{data.CurrentBalance:F2}}
            - Balance growth vs last month: {{data.BalanceGrowth:F2}}
            - Income this month:            {{data.IncomeThisMonth:F2}}
            - Income last month:            {{data.IncomeLastMonth:F2}}
            - Income two months ago:        {{data.IncomeTwoMonthsAgo:F2}}
            - Spending this month:          {{data.SpendingThisMonth:F2}}
            - Spending last month:          {{data.SpendingLastMonth:F2}}
            - Top spending categories:      {{topCategories}}
            - Total transactions:           {{data.TotalTransactions}}
    
            Return ONLY valid JSON in this exact format:
            {
              "score": 72,
              "grade": "B",
              "summary": "Good financial health with room to improve",
              "strengths": ["Consistent income", "Positive savings rate"],
              "improvements": ["Reduce food spending", "Build emergency fund"],
              "breakdown": {
                "savingsRate": 85,
                "incomeStability": 90,
                "spendingControl": 60,
                "balanceGrowth": 75
              }
            }
    
            Scoring Rules:
            - score: 0-100 overall financial health
            - grade: A(90-100), B(75-89), C(60-74), D(45-59), F(below 45)
            - strengths: 2-3 positive aspects max 8 words each
            - improvements: 2-3 actionable tips max 8 words each
            - breakdown scores: each 0-100
              savingsRate:     based on savings rate (20% or more = high score)
              incomeStability: based on income consistency across 3 months
              spendingControl: based on spending vs income ratio
              balanceGrowth:   based on balance trend
            - summary: max 10 words
            - Return valid JSON only — no markdown no backticks
            """;
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
