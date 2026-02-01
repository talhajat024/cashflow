namespace CashFlow.Api.Application.DTOs.Transactions;

public class TransactionDto
{
    public string Company {get;set;}= default!;
    public string Category {get;set;}= default!;
    public string Type {get;set;}= default!;
    public DateTime Date {get;set;}
    public decimal Amount {get;set;}
    public string Status {get;set;} =default!;
    public string IconKey {get;set;}= default!;
}
