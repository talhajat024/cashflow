using CashFlow.Api.Domain.Enums;
namespace CashFlow.Api.Domain.Entities;

public class Transaction
{
    public Guid Id {get;set;}=Guid.NewGuid();

    // Ownership
    public Guid UserId {get;set;}
    public Guid WalletId {get;set;}
    public Guid? ToWalletId {get;set;}

    // Financial
    public decimal Amount {get;set;}
    public TransactionType Type {get;set;}
    public TransactionNature Nature {get;set;}
    public TransactionStatus Status {get;set;}=TransactionStatus.Completed;

    // Counterparty (who)
    public string CounterpartyName {get;set;}=string.Empty;
    public string? CounterpartyLogo {get;set;}
    public string Category {get;set;}=string.Empty;

    // Details (why)
    public string? Description {get;set;} // optional note

    // Dates
    public DateTime Date {get;set;}= DateTime.UtcNow;
    public DateTime CreatedAt {get;set;}=DateTime.UtcNow;

    // Navigation
    public User User {get;set;}= null!;
    public Wallet Wallet {get;set;} = null!;
    public Wallet? ToWallet {get;set;}
}







