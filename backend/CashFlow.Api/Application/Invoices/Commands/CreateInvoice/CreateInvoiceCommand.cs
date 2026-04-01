using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;
using MediatR;

namespace CashFlow.Api.Application.Invoices.Commands.CreateInvoice;

public class CreateInvoiceCommand:IRequest<Result<InvoiceDto>>
{
    public Guid UserId {get;set;}
    public int ClientId {get;set;}
    public DateTime IssueDate {get;set;}
    public DateTime DueDate {get;set;}
    public decimal Amount {get;set;}
    public string? Description {get;set;}
}
