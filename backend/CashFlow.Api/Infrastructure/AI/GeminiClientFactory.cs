using CashFlow.Api.Application.Interfaces;
using Mscc.GenerativeAI;

namespace CashFlow.Api.Infrastructure.AI;

public class GeminiClientFactory:IGeminiClientFactory
{
    private readonly GoogleAI _googleAI;
    public GeminiClientFactory(IConfiguration configuration)
    {
        var apiKey= configuration["Gemini:ApiKey"] ?? throw new InvalidOperationException("Gemini API key not configured.");
        _googleAI= new GoogleAI(apiKey);
    }

    public GenerativeModel CreateModel(string modelName="gemini-2.5-flash-lite")
        => _googleAI.GenerativeModel(modelName);

}
