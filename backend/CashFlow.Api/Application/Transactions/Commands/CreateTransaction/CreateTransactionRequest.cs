using System.ComponentModel.DataAnnotations;
using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Application.Transactions.Commands.CreateTransaction;

public class CreateTransactionRequest
{
    [Required]
    public Guid WalletId {get;set;}
    public Guid? ToWalletId {get;set;}

    [Required]
    [Range(0.01,double.MaxValue)]
    public decimal Amount {get;set;}

    [Required]
    public TransactionType Type {get;set;}

    [Required]
    public TransactionNature Nature {get;set;}

    [Required]
    [MaxLength(100)]
    public string CounterpartyName {get;set;}=string.Empty;
    public string? CounterpartyLogo {get;set;}
    public string? Description {get;set;}
    public DateTime? Date {get;set;}
}
