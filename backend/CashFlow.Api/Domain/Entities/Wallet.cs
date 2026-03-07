namespace CashFlow.Api.Domain.Entities;

public class Wallet
{
    public Guid Id {get;set;}=Guid.NewGuid();
    public Guid UserId {get;set;}
    public string Name {get;set;}= string.Empty;
    public decimal Balance {get;set;}=0;
    public string Currency {get;set;}="USD";
    public string? Icon {get;set;}
    public bool IsDefault {get;set;}= false;
    public DateTime CreatedAt {get;set;}= DateTime.UtcNow;

    // Navigation
    public User User {get;set;}=null!;
    public ICollection<Transaction> Transactions {get;set;} = new List<Transaction>();
}
