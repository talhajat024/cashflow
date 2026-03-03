using CashFlow.Api.Application.DTOs.Auth;
namespace CashFlow.Api.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginRequestDto dto);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    Task LogoutAsync(string refreshToken);
    Task<UserDto> GetCurrentUserAsync(Guid userId);
}