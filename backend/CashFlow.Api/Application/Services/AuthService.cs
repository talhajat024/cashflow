using CashFlow.Api.Application.DTOs.Auth;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Infrastructure.Repositories;

namespace CashFlow.Api.Application.Services;

public class AuthService:IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _config;
    private readonly IEmailService _emailService;

    public AuthService(IUserRepository userRepository,ITokenService tokenService,IConfiguration config,IEmailService emailService)
    {
        _userRepository=userRepository;
        _tokenService=tokenService;
        _config= config;
        _emailService=emailService;
    }

    public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto)
    {
        // find user
        var user = await _userRepository.GetByEmailAsync(dto.Email) ?? throw new UnauthorizedAccessException("Invalid Email or Password");
        // verify password
        if(!BCrypt.Net.BCrypt.Verify(dto.Password,user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password");

        // Update last login
        user.LastLogin= DateTime.UtcNow;
        await _userRepository.UpdateAsync(user);

        // generate token
        var accessToken=_tokenService.GenerateAccessToken(user);
        var refreshToken= await CreateRefreshTokenAsync(user.Id);

        await _userRepository.SaveChangesAsync();
        return new AuthResponseDto
        {
            AccessToken=accessToken,
            RefreshToken= refreshToken,
            User=MapToUserDto(user)
        };
    }

    public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
    {
        // find refresh token in DB
        var storedToken= await _userRepository.GetRefreshTokenAsync(refreshToken) ?? throw new UnauthorizedAccessException("Invalid refresh token");

        // 2. Validate
        if(!storedToken.IsActive)
        {
            throw new UnauthorizedAccessException("Refresh token is expired or revoked");
        }

        // Mark old token as used
        storedToken.IsUsed=true;
        await _userRepository.UpdateAsync(storedToken.User);

        // Generate new tokens
        var newAccessTokens = _tokenService.GenerateAccessToken(storedToken.User);
        var newRefreshToken = await CreateRefreshTokenAsync(storedToken.UserId);

        await _userRepository.SaveChangesAsync();

        return new AuthResponseDto
        {
            AccessToken=newAccessTokens,
            RefreshToken= newRefreshToken,
            User= MapToUserDto(storedToken.User)
        };
    }

    public async Task<AuthResponseDto> RegisterAsync(RegisterRequestDto dto)
    {
        // validate password match
        if(dto.Password != dto.ConfirmPassword)
        {
            throw new InvalidOperationException("Password do not match");
        }

        // check duplicate email
        if(await _userRepository.EmailExistsAsync(dto.Email))
        {
            throw new InvalidOperationException("An account with this email already exists");
        }

        // Create User
        var user= new User
        {
            Id=Guid.NewGuid(),
            Name=dto.Name.Trim(),
            Email=dto.Email.ToLower().Trim(),
            PasswordHash=BCrypt.Net.BCrypt.HashPassword(dto.Password),
            CreatedAt=DateTime.UtcNow,
        };

        await _userRepository.AddAsync(user);
        await _userRepository.SaveChangesAsync();

        _=Task.Run(()=> _emailService.SendWelcomeEmailAsync(user.Email,user.Name));

        // Return user
        return new AuthResponseDto
        {
            User=MapToUserDto(user)
        };
    }

    public async Task LogoutAsync(string refreshToken)
    {
        var storedToken= await _userRepository.GetRefreshTokenAsync(refreshToken);
        if(storedToken != null)
        {
         storedToken.IsRevoked=true;
         await _userRepository.SaveChangesAsync();   
        }
    }

    public async Task<UserDto> GetCurrentUserAsync(Guid userId)
    {
        var user= await _userRepository.GetByIdAsync(userId)
        ?? throw new UnauthorizedAccessException("User not found");

        return MapToUserDto(user);
    }


    // Private Helpers
    private async Task<string> CreateRefreshTokenAsync(Guid userId)
    {
        var token= new RefreshToken
        {
            Token= _tokenService.GenerateRefreshToken(),
            UserId= userId,
            ExpiresAt= DateTime.UtcNow.AddDays(int.Parse(_config["Jwt:RefreshTokenExpiryDays"]!))
        };

        await _userRepository.AddRefreshTokenAsync(token);
        return token.Token;
    }

    private static UserDto MapToUserDto(User user)=> new()
    {
        Id= user.Id,
        Name= user.Name,
        Email=user.Email,
        Role= user.Role,
        Avatar= user.Avatar,
        CreatedAt= user.CreatedAt,
        LastLogin= user.LastLogin
    };
}
