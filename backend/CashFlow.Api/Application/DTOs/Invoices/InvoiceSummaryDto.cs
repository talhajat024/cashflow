namespace CashFlow.Api.Application.DTOs.Invoices;

public class InvoiceSummaryDto
{
    public int TotalClients {get;set;}
    public int TotalInvoices {get;set;}
    public decimal TotalPaidAmount {get;set;}
}
