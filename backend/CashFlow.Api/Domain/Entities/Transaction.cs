namespace CashFlow.Api.Domain.Entities;

public class Transaction
{
    public Guid Id {get;set;}
    public Guid UserId {get;set;}
    public decimal Amount {get;set;}
    public TransactionType Type {get;set;}
    public DateTime CreatedAt {get;set;}
    public string CategoryKey {get;set;}= string.Empty;
    public string CategoryLabel {get;set;}= string.Empty;
}

public enum TransactionType
{
    Income,
    Expense,
}


