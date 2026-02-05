using System.Security.Cryptography.X509Certificates;
using System.Transactions;

namespace CashFlow.Api.Domain.Entities;

public class Transaction
{
    public Guid Id {get;set;}
    public Guid UserId {get;set;}
    public decimal Amount {get;set;}
    public TransactionType Type {get;set;}
    public TransactionNature Nature {get;set;}
    public TransactionStatus Status {get;set;}
    public DateTime CreatedAt {get;set;}

    // who
    public string CounterpartyName {get;set;}= string.Empty;
    public string MerchantCategory {get;set;}=string.Empty;

    // why
    public string CategoryKey {get;set;}= string.Empty;
    public string CategoryLabel {get;set;}= string.Empty;
}

public enum TransactionType
{
    Income,
    Expense,
}

public enum TransactionStatus
{
    Pending,
    Completed,
    Failed
}

public enum TransactionNature
{
    Subscription,
    Receive,
    Transfer,
    Refund,
    Payout
}




