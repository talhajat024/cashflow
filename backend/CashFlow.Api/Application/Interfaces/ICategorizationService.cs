namespace CashFlow.Api.Application.Interfaces;

public interface ICategorizationService
{
    Task<string> CategorizeAsync(string merchantName, decimal amount);
}
