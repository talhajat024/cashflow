using Mscc.GenerativeAI;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using CashFlow.Api.Application.Interfaces;

namespace CashFlow.Api.Application.AI;

public class CategorizationService :ICategorizationService
{
    private readonly string _apiKey;

    private static readonly HashSet<string> ValidCategories = new(StringComparer.OrdinalIgnoreCase)
    {
        "Entertainment", "Application", "Food", "Travel",
        "Payroll", "Business", "Employment", "Freelance",
        "Utilities", "Housing", "Transfer", "Other"
    };

    private const string Prompt =
        "You are a financial transaction categorizer. " +
        "Given a merchant name and amount, return ONLY one category from this exact list: " +
        "Entertainment, Application, Food, Travel, Payroll, Business, " +
        "Employment, Freelance, Utilities, Housing, Transfer, Other. " +
        "Return ONLY the category name — no explanation, no punctuation, no extra text. " +
        "If unsure, return: Other. " +
        "Examples: Netflix=Entertainment, Walmart=Food, Shell=Travel, " +
        "AWS=Application, Rent=Housing, Electric Company=Utilities";

    public CategorizationService(IConfiguration configuration)
    {
        _apiKey = configuration["Gemini:ApiKey"]
            ?? throw new InvalidOperationException("Gemini API key not configured");
    }

    public async Task<string> CategorizeAsync(string merchantName, decimal amount)
    {
        try
        {
            var googleAI = new GoogleAI(_apiKey);
            var model= googleAI.GenerativeModel("gemini-2.5-flash");

            var fullPrompt = $"{Prompt}\n\nMerchant: {merchantName}, Amount: ${amount:F2}";
            var response   = await model.GenerateContent(fullPrompt);
            var category   = response.Text?.Trim() ?? "Other";

            Console.WriteLine($" AI Category: {merchantName} → {category}");

            return ValidCategories.Contains(category) ? category : "Other";
        }
        catch (Exception ex)
        {
            
            Console.WriteLine($" Categorization failed: {ex.Message}");
            return "Other";
        }
    }
}