using System;

namespace CashFlow.Api.Domain.Entities;

public class Notification
{
    public Guid Id {get;set;}=Guid.NewGuid();
    public Guid UserId {get;set;}
    public string Type {get;set;} = string.Empty;
    public string Title {get;set;}=string.Empty;
    public string Message {get;set;}=string.Empty;
    public bool IsRead {get;set;}
    public DateTime CreatedAt {get;set;} = DateTime.UtcNow;
    public DateTime? ReadAt {get;set;}

    // Navigation Property User
    public virtual User? User {get;set;}
}
