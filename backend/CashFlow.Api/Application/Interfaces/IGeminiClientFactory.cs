using Mscc.GenerativeAI;

namespace CashFlow.Api.Application.Interfaces;

public interface IGeminiClientFactory
{
    GenerativeModel CreateModel(string modelName = "gemini-2.5-flash-lite");
}
