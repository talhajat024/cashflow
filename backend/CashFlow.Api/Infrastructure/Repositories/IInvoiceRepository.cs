using CashFlow.Api.Application.DTOs.Invoices;
using CashFlow.Api.Domain.Entities;

namespace CashFlow.Api.Infrastructure.Repositories;

public interface IInvoiceRepository
{
    Task<Invoice?> GetByIdAsync(int id,Guid userId);
    Task<IEnumerable<Invoice>> GetByUserIdAsync(Guid userId,int? status=null);
    Task<Invoice> CreateAsync(Invoice invoice);
    Task UpdateAsync(Invoice invoice);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id,Guid userId);
    Task<InvoiceSummaryDto> GetSummaryAsync(Guid userId);
}
