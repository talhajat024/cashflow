using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;
using MediatR;

namespace CashFlow.Api.Application.Invoices.Queries.GetInvoiceSummary;

public class GetInvoiceSummaryQuery:IRequest<Result<InvoiceSummaryDto>>
{
    public Guid UserId {get;set;}
}
