using MediatR;
using CashFlow.Api.Application.DTOs.Invoices;
using CashFlow.Api.Application.Common;
using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Application.Invoices.Commands.UpdateInvoiceStatus;

public class UpdateInvoiceStatusCommand:IRequest<Result<InvoiceDto>>
{
    public int Id { get; set; }
    public Guid UserId { get; set; }
    public InvoiceStatus Status { get; set; }
}
