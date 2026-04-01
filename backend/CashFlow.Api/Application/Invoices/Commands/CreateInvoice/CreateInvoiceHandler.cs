using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;
using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Repositories;
using MediatR;

namespace CashFlow.Api.Application.Invoices.Commands.CreateInvoice;

public class CreateInvoiceHandler:IRequestHandler<CreateInvoiceCommand, Result<InvoiceDto>>
{
    private readonly IInvoiceRepository _invoiceRepository;
    private readonly IClientRepository _clientRepository;

    public CreateInvoiceHandler(IInvoiceRepository invoiceRepository, IClientRepository clientRepository)
    {
        _invoiceRepository = invoiceRepository;
        _clientRepository = clientRepository;
    }

    public async Task<Result<InvoiceDto>> Handle(CreateInvoiceCommand request,CancellationToken cancellationToken)
    {
        var client = await _clientRepository.GetByIdAsync(request.ClientId, request.UserId);
        if(client == null)
        {
            return Result<InvoiceDto>.Failure("Client not found");
        }

        var invoiceNumber= GenerateInvoiceNumber();
        var invoice = new Invoice
        {
            InvoiceNumber= invoiceNumber,
            ClientId = request.ClientId,
            IssueDate = request.IssueDate,
            DueDate = request.DueDate,
            Amount = request.Amount,
            Status = InvoiceStatus.Pending,
            Description= request.Description
        };

        var created = await _invoiceRepository.CreateAsync(invoice);
        var invoiceDto = new InvoiceDto
        {
            Id = created.Id,
            InvoiceNumber= created.InvoiceNumber,
            ClientName= client.Name,
            CompanyName= client.Company,
            IssueDate = created.IssueDate,
            DueDate = created.DueDate,
            Amount= created.Amount,
            Status= created.Status.ToString(),
            Description= created.Description
        };

        return Result<InvoiceDto>.Success(invoiceDto);
    }

    private string GenerateInvoiceNumber()
    {
        return $"INV-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 6).ToUpper()}";
    }

}
