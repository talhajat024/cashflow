using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Application.DTOs.Invoices;

public class UpdateInvoiceStatusRequestDto
{
    public InvoiceStatus Status {get;set;}
}
