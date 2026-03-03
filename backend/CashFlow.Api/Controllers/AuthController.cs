using CashFlow.Api.Application.DTOs.Auth;
using CashFlow.Api.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CashFlow.Api.Controllers;


[ApiController]
[Route("api/auth")]
public class AuthController:ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IConfiguration _config;
    public AuthController(IAuthService authService,IConfiguration config)
    {
        _authService=authService;
        _config=config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
    {
        try
        {
            var result = await _authService.LoginAsync(dto);

            // Set HttpOnly cookies
            SetAccessTokenCookie(result.AccessToken);
            SetRefreshTokenCookie(result.RefreshToken);
            SetCsrfCookie();

            // Only return user in body - tokens are in cookies
            return Ok(new {user=result.User});
        }
        catch(UnauthorizedAccessException ex)
        {
            return Unauthorized(new {message=ex.Message});
        }
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken= Request.Cookies["refreshToken"];
        if(string.IsNullOrEmpty(refreshToken))
        {
            return Unauthorized(new {message="No refresh token found"});
        }
        try
        {
            var result = await _authService.RefreshTokenAsync(refreshToken);
            SetAccessTokenCookie(result.AccessToken);
            SetRefreshTokenCookie(result.RefreshToken);
            SetCsrfCookie();

            return Ok(new {user=result.User});
        }
        catch(UnauthorizedAccessException ex)
        {
            return Unauthorized(new {message= ex.Message});
        }
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var refreshToken= Request.Cookies["refreshToken"];
        if(!string.IsNullOrEmpty(refreshToken))
        {
            await _authService.LogoutAsync(refreshToken);
        }

        // Clear all auth cookies
        ClearAuthCookies();
        return Ok(new {message="Loggged out successfully"});
    }


    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        try
        {
            var userIdClaim= User.FindFirst(ClaimTypes.NameIdentifier)
            ?? User.FindFirst("sub");

            if(userIdClaim == null || !Guid.TryParse(userIdClaim.Value,out var userId))
            return Unauthorized(new {message="Invalid token"});

            var user = await _authService.GetCurrentUserAsync(userId);
            return Ok(user);
        }
        catch(UnauthorizedAccessException ex)
        {
            return Unauthorized(new {message=ex.Message});
        }
    }

    // Private Cookies Helpers
    private void SetAccessTokenCookie(string token)
    {
        Response.Cookies.Append("accessToken",token,new CookieOptions
        {
            HttpOnly=true,
            Secure=true,
            SameSite=SameSiteMode.Strict,
            Expires=DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:AccessTokenExpiryMinutes"]!))
        });
    }

    private void SetRefreshTokenCookie(string token)
    {
        Response.Cookies.Append("refreshToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(
                int.Parse(_config["Jwt:RefreshTokenExpiryDays"]!)),
            Path = "/api/auth" 
        });
    }

    private void SetCsrfCookie()
    {
        Response.Cookies.Append("XSRF-TOKEN", Guid.NewGuid().ToString(), new CookieOptions
        {
            HttpOnly = false,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddMinutes(
                int.Parse(_config["Jwt:AccessTokenExpiryMinutes"]!))
        });
    }

    private void ClearAuthCookies()
    {
        Response.Cookies.Delete("accessToken");
        Response.Cookies.Delete("refreshToken");
        Response.Cookies.Delete("XSRF-TOKEN");
    }

}
