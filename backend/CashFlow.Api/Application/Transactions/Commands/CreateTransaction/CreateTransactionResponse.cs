using CashFlow.Api.Domain.Enums;
namespace CashFlow.Api.Application.Transactions.Commands.CreateTransaction;

public class CreateTransactionResponse
{
    public Guid Id {get;set;}
    public Guid WalletId {get;set;}
    public decimal Amount {get;set;}
    public string Type {get;set;} = string.Empty;
    public string Nature {get;set;}=string.Empty;
    public string Category {get;set;}=string.Empty;
    public string Description { get; set; } = string.Empty;
    public string CounterpartyName {get;set;}=string.Empty;
    public string Status {get;set;}=string.Empty;
    public DateTime Date {get;set;}
    public DateTime CreatedAt {get;set;}

    // Anomaly detection
    public bool IsAnomaly {get;set;}
    public string AnomalyReason {get;set;}= string.Empty;
}
