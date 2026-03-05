using CashFlow.Api.Application.DTOs.Auth;
using Microsoft.AspNetCore.Identity.Data;
namespace CashFlow.Api.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(LoginRequestDto dto);
    Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto);
    Task LogoutAsync(string refreshToken);
    Task<UserDto> GetCurrentUserAsync(Guid userId);
}