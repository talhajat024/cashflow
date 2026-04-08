using MediatR;
using CashFlow.Api.Infrastructure.Repositories;
using CashFlow.Api.Application.DTOs.Invoices;
using CashFlow.Api.Application.Common;

namespace CashFlow.Api.Application.Invoices.Queries.GetInvoiceSummary;

public class GetInvoiceSummaryHandler:IRequestHandler<GetInvoiceSummaryQuery,Result<InvoiceSummaryDto>>
{
    private readonly IInvoiceRepository _invoiceRepository;
    public GetInvoiceSummaryHandler(IInvoiceRepository invoiceRepository)
    {
        _invoiceRepository=invoiceRepository;
    }

    public async Task<Result<InvoiceSummaryDto>> Handle(GetInvoiceSummaryQuery request,CancellationToken cancellationToken)
    {
        try
        {
            var summary= await _invoiceRepository.GetSummaryAsync(request.UserId);
            return Result<InvoiceSummaryDto>.Success(summary);
        }
        catch(Exception ex)
        {
            return Result<InvoiceSummaryDto>.Failure($"Failed to get invoice summary: {ex.Message}");
        }
    }
}
