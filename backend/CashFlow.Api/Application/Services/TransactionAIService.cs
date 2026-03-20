using Mscc.GenerativeAI;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using CashFlow.Api.Application.Interfaces;
using Mscc.GenerativeAI.Types;
using System.Linq.Expressions;

namespace CashFlow.Api.Application.Services;

public class TransactionAIService :ITransactionAIService
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

    public TransactionAIService(IConfiguration configuration)
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

    public async Task<string> GenerateDescriptionAsync(string merchantName,decimal amount,string type,string nature)
    {
        try
        {
            var model= CreateModel();
            var prompt= $"""
                Generate a short, natural transaction description (max 8 words).
                
                Transaction details:
                - Merchant: {merchantName}
                - Amount:   ${amount:F2}
                - Type:     {type}
                - Nature:   {nature}
                
                Rules:
                - Return ONLY the description text
                - No explanation, no punctuation at end
                - Be specific and natural
                - Max 8 words
                Examples:
                - Netflix, Expense, Subscription    → Monthly Netflix streaming subscription
                - Walmart, Expense, Payout          → Weekly grocery shopping at Walmart
                - Salary, Income, Receive           → Monthly salary payment received
                - Amazon, Expense, Payout           → Online purchase from Amazon
                - Electric Company, Expense, Payout → Monthly electricity bill payment
                """;

                var response = await model.GenerateContent(prompt);
                var description= response.Text?.Trim() ?? string.Empty;

                Console.WriteLine($" AI Description: {merchantName} → {description}");

                return string.IsNullOrEmpty(description)
                ? FallbackDescription(merchantName,nature)
                : description;
            
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Description generation failed: {ex.Message}");
            return FallbackDescription(merchantName,nature);
        }
    }
    public async Task<AnomalyResult> DetectAnomalyAsync(AnomalyDetectionData data)
    {
        try
        {
            if(data.TotalTransactions < 5)
                return new AnomalyResult {IsAnomaly=false};
            
            var model = CreateModel();
            var prompt = $"""
            You are a financial fraud and anomaly detector.
            Analyze this transaction and determine if it is anomalous.

            New Transaction:
            - Merchant: {data.MerchantName}
            - Amount:   ${data.Amount:F2}
            - Type:     {data.Type}
            - Nature:   {data.Nature}

            User's History:
            - Average transaction amount:       ${data.AverageAmount:F2}
            - Maximum transaction amount:       ${data.MaxAmount:F2}
            - Average amount for {data.Type}:   ${data.AverageAmountForType:F2}
            - Merchant seen before:             {(data.MerchantSeenBefore ? "Yes" : "No")}
            - Total transactions in history:    {data.TotalTransactions}

            Rules:
            - Respond with ONLY this exact format:
              ANOMALY: true | reason: <short reason max 10 words>
              ANOMALY: false
            - Flag as anomaly if:
              Amount is 3x or more than average
              New merchant with unusually high amount
              Unusual transaction type pattern
            - Do NOT flag normal variations

            Examples:
            ANOMALY: true | reason: Amount is 10x your usual transfer amount
            ANOMALY: false
            """;

            var response = await model.GenerateContent(prompt);
            var text= response.Text?.Trim() ?? "ANOMALY: false";

            return ParseAnomalyResult(text);            
        }
        catch(Exception ex)
        {
            Console.WriteLine($"Anomaly detection failed:{ex.Message}");
            return new AnomalyResult {IsAnomaly=false};
        }
    }

    // Helpers

    private static AnomalyResult ParseAnomalyResult(string text)
    {
        var isAnomaly = text.Contains("ANOMALY: true",StringComparison.OrdinalIgnoreCase);
        if(!isAnomaly)
            return new AnomalyResult {IsAnomaly=false};
        
        var reason = string.Empty;
        var reasonIndex= text.IndexOf("reason:",StringComparison.OrdinalIgnoreCase);
        if(reasonIndex >=0)
            reason=text[(reasonIndex+7)..].Trim();

        Console.WriteLine($"Anomaly detected: {reason}"); 

         return new AnomalyResult
        {
            IsAnomaly = true,
            Reason    = reason
        };
    }
    private GenerativeModel CreateModel()
    {
        var googleAI = new GoogleAI(_apiKey);
        return googleAI.GenerativeModel("gemini-2.5-flash");
    }

    private static string FallbackDescription(string merchantName,string nature)=>
        $"{nature} - {merchantName}";
}