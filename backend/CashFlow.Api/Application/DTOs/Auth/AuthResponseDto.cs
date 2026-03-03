namespace CashFlow.Api.Application.DTOs.Auth;

public class AuthResponseDto
{
    public string AccessToken { get; set; } = string.Empty; 
    public string RefreshToken { get; set; } = string.Empty;
    public UserDto User {get;set;}=null!;
}

public class UserDto{
    public Guid Id {get;set;}
    public string Name {get;set;}=string.Empty;
    public string Email {get;set;}= string.Empty;
    public string Role {get;set;}=string.Empty;
    public string? Avatar {get;set;}
    public DateTime CreatedAt {get;set;}
    public DateTime? LastLogin {get;set;}
}
