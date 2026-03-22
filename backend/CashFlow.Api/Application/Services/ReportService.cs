using CashFlow.Api.Application.Interfaces;
using Mscc.GenerativeAI;
using Microsoft.Extensions.Configuration;

namespace CashFlow.Api.Application.Services;

public class ReportService :IReportService
{
    private readonly string _apiKey;
    public ReportService(IConfiguration configuration)

    {
        _apiKey= configuration["Gemini:ApiKey"]
         ?? throw new InvalidOperationException("Gemini API key not configured.");
    }

    public async Task<string> GenerateReportNarrativeAsync(MonthlyReportData data)
    {
        try
        {
            var googleAI = new GoogleAI(_apiKey);
            var model= googleAI.GenerativeModel("gemini-2.5-flash");

            var categoryLines = string.Join("\n",data.Categories.Select(c=> 
            $"- {c.Category}: ${c.Amount:F2} ({c.Percentage:F1}%)"));

            var prompt = $"""
                You are a professional financial advisor writing a monthly report.
                Write a concise, insightful financial narrative (3-4 sentences max).

                Client: {data.UserName}
                Month: {data.MonthName} {data.Year}

                Financial Summary:
                - Total Income:    ${data.TotalIncome:F2}
                - Total Spending:  ${data.TotalSpending:F2}
                - Net Savings:     ${data.NetSavings:F2}
                - Savings Rate:    {data.SavingsRate:F1}%
                - Opening Balance: ${data.OpeningBalance:F2}
                - Closing Balance: ${data.ClosingBalance:F2}

                Spending by Category:
                {categoryLines}

                Rules:
                - Professional but friendly tone
                - Mention the biggest spending category
                - Comment on savings rate (good if above 20%)
                - Give one specific actionable recommendation
                - Max 4 sentences
                - No bullet points — flowing paragraph only
                """;

            var response= await model.GenerateContent(prompt);
            var narrative = response.Text?.Trim() ?? FallbackNarrative(data);

            Console.WriteLine($"AI Report Narrative generated");
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
