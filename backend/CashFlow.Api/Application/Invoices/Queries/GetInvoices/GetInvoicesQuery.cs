using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;
using MediatR;
namespace CashFlow.Api.Application.Invoices.Queries.GetInvoices;

public class GetInvoicesQuery:IRequest<Result<IEnumerable<InvoiceDto>>>
{
    public Guid UserId {get;set;}
    public int? Status {get;set;}
}
