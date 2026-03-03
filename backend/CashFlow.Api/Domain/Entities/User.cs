namespace CashFlow.Api.Domain.Entities;

public class User
{
    public Guid Id {get;set;}=Guid.NewGuid();
    public string Name {get;set;}=string.Empty;
    public string Email {get;set;}=string.Empty;
    public string PasswordHash {get;set;}=string.Empty;
    public string Role {get;set;}= "user";
    public string? Avatar {get;set;}
    public DateTime CreatedAt {get;set;}=DateTime.UtcNow;
    public DateTime? LastLogin {get;set;}

    // Navigation
    public ICollection<RefreshToken> RefreshTokens {get;set;} = new List<RefreshToken>();
}
