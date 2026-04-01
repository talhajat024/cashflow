using CashFlow.Api.Domain.Enums;
namespace CashFlow.Api.Domain.Entities;

public class Invoice
{
    public int Id {get;set;}
    public string InvoiceNumber {get;set;}=string.Empty;
    public int ClientId {get;set;}
    public Client Client {get;set;}=null!;
    public DateTime IssueDate {get;set;}
    public DateTime DueDate {get;set;}
     public DateTime? PaidDate { get; set; }
    public decimal Amount {get;set;}
    public InvoiceStatus Status {get;set;}
    public string? Description {get;set;}
    public Guid? TransactionId {get;set;}
    public Transaction? Transaction {get;set;}
    public string? PdfUrl {get;set;}
    public DateTime CreatedAt {get;set;}=DateTime.UtcNow;
}
