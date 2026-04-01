namespace CashFlow.Api.Application.DTOs.Invoices;

public class InvoiceDto
{
    public int Id {get;set;}
    public string InvoiceNumber {get;set;}=string.Empty;
    public string ClientName {get;set;}=string.Empty;
    public string? CompanyName {get;set;}
    public DateTime IssueDate {get;set;}
    public DateTime DueDate {get;set;}
    public decimal Amount {get;set;}
    public string Status {get;set;}=string.Empty;
    public string? Description {get;set;}
    public string? PdfUrl {get;set;}
}
