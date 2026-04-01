namespace CashFlow.Api.Domain.Entities;

public class Client
{
    public int Id {get;set;}
    public string Name {get;set;}=string.Empty;
    public string Email {get;set;}=string.Empty;
    public string? Company {get;set;}
    public string? Phone {get;set;}
    public string? Address {get;set;}
    public Guid UserId {get;set;}
    public User User {get;set;}=null!;
    public DateTime CreatedAt {get;set;}=DateTime.UtcNow;
    public ICollection<Invoice> Invoices {get;set;}= new List<Invoice>();
}
