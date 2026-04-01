using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;
using CashFlow.Api.Infrastructure.Repositories;
using MediatR;
namespace CashFlow.Api.Application.Invoices.Queries.GetInvoices;

public class GetInvoicesHandler:IRequestHandler<GetInvoicesQuery,Result<IEnumerable<InvoiceDto>>>
{
    public readonly IInvoiceRepository _invoiceRepository;
    public GetInvoicesHandler(IInvoiceRepository invoiceRepository)
    {
        _invoiceRepository = invoiceRepository;
    }

    public async Task<Result<IEnumerable<InvoiceDto>>> Handle(GetInvoicesQuery request,CancellationToken cancellationToken)
    {
        var invoices = await _invoiceRepository.GetByUserIdAsync(request.UserId,request.Status);
        var invoiceDtos = invoices.Select(i=> new InvoiceDto
        {
            Id = i.Id,
            InvoiceNumber=i.InvoiceNumber,
            ClientName=i.Client.Name,
            CompanyName=i.Client.Company,
            IssueDate = i.IssueDate,
            DueDate= i.DueDate,
            Amount = i.Amount,
            Status = i.Status.ToString(),
            Description= i.Description,
            PdfUrl= i.PdfUrl
        });
        return Result<IEnumerable<InvoiceDto>>.Success(invoiceDtos);
    }
}