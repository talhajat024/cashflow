namespace CashFlow.Api.Domain.Entities;

public class RefreshToken
{
    public Guid Id {get;set;}= Guid.NewGuid();
    public string Token {get;set;}=string.Empty;
    public DateTime ExpiresAt {get;set;}
    public DateTime CreatedAt {get;set;}=DateTime.UtcNow;
    public bool IsRevoked{get;set;} = false;
    public bool IsUsed{get;set;}=false;

    // Foreign Key
    public Guid UserId {get;set;}
    public User User{get;set;}=null!;
    public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
    public bool IsActive => !IsRevoked && !IsUsed && !IsExpired;
}
