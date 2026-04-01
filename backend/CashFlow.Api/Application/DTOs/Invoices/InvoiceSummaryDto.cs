namespace CashFlow.Api.Application.DTOs.Invoices;

public class InvoiceSummaryDto
{
    public int TotalClients {get;set;}
    public int TotalInvoices {get;set;}
    public int PendingInvoices {get;set;}
    public int PaidInvoices {get;set;}
    public decimal TotalPendingAmount {get;set;}
    public decimal TotalPaidAmount {get;set;}
}
