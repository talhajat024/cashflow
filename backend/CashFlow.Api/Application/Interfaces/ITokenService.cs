using CashFlow.Api.Domain.Entities; 
namespace CashFlow.Api.Application.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    Guid? ValidateRefreshToken(string token);
}
