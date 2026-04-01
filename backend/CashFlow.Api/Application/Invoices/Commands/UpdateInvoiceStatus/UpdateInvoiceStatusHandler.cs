using MediatR;
using CashFlow.Api.Application.DTOs.Invoices;
using CashFlow.Api.Application.Common;
using CashFlow.Api.Infrastructure.Repositories;
using CashFlow.Api.Domain.Enums;

namespace CashFlow.Api.Application.Invoices.Commands.UpdateInvoiceStatus;

public class UpdateInvoiceStatusHandler:IRequestHandler<UpdateInvoiceStatusCommand,Result<InvoiceDto>>
{
    private readonly IInvoiceRepository _invoiceRepository;
    private readonly IClientRepository _clientRepository;
    public UpdateInvoiceStatusHandler(IInvoiceRepository invoiceRepository, IClientRepository clientRepository)
    {
        _invoiceRepository = invoiceRepository;
        _clientRepository = clientRepository;
    }

    public async Task<Result<InvoiceDto>> Handle(UpdateInvoiceStatusCommand request, CancellationToken cancellationToken)
    {
       var invoice = await _invoiceRepository.GetByIdAsync(request.Id,request.UserId);
       if(invoice == null)
        {
            return Result<InvoiceDto>.Failure("Invoice not found");
        }
        invoice.Status= request.Status;
        if(request.Status== InvoiceStatus.Paid)
        {
            invoice.PaidDate= DateTime.UtcNow;
        }

        await _invoiceRepository.UpdateAsync(invoice);
        var client = await _clientRepository.GetByIdAsync(invoice.ClientId,request.UserId);
        var invoiceDto =new InvoiceDto
        {
            Id = invoice.Id,
            InvoiceNumber = invoice.InvoiceNumber,
            ClientName = client?.Name ?? string.Empty,
            CompanyName = client?.Company,
            IssueDate = invoice.IssueDate,
            DueDate = invoice.DueDate,
            Amount = invoice.Amount,
            Status = invoice.Status.ToString(),
            Description = invoice.Description,
            PdfUrl = invoice.PdfUrl
        };
        return Result<InvoiceDto>.Success(invoiceDto);
    }
}
