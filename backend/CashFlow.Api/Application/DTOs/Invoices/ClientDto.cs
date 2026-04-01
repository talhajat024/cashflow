namespace CashFlow.Api.Application.DTOs.Invoices;

public class ClientDto
{
    public int Id {get;set;}
    public string Name {get;set;}=string.Empty;
    public string Email {get;set;}=string.Empty;
    public string? Company {get;set;}
    public string? Phone {get;set;}
    public int TotalInvoices {get;set;}
    public decimal TotalAmount {get;set;}
}
