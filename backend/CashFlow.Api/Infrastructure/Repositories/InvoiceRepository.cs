using Microsoft.EntityFrameworkCore;
using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Data;
using CashFlow.Api.Application.DTOs.Invoices;

namespace CashFlow.Api.Infrastructure.Repositories;

public class InvoiceRepository : IInvoiceRepository
{
    private readonly AppDbContext _context;

    public InvoiceRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Invoice?> GetByIdAsync(int id, Guid userId)
    {
        return await _context.Invoices
            .Include(i => i.Client)
            .FirstOrDefaultAsync(i => i.Id == id && i.Client.UserId == userId);
    }

    public async Task<IEnumerable<Invoice>> GetByUserIdAsync(Guid userId, int? status = null)
    {
        var query = _context.Invoices
            .Include(i => i.Client)
            .Where(i => i.Client.UserId == userId);

        if (status.HasValue)
        {
            query = query.Where(i => (int)i.Status == status.Value);
        }

        return await query
            .OrderByDescending(i => i.IssueDate)
            .ToListAsync();
    }

    public async Task<Invoice> CreateAsync(Invoice invoice)
    {
        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }

    public async Task UpdateAsync(Invoice invoice)
    {
        _context.Invoices.Update(invoice);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice != null)
        {
            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id, Guid userId)
    {
        return await _context.Invoices
            .AnyAsync(i => i.Id == id && i.Client.UserId == userId);
    }

    public async Task<InvoiceSummaryDto> GetSummaryAsync(Guid userId)
    {
        var invoices = await _context.Invoices
            .Include(i => i.Client)
            .Where(i => i.Client.UserId == userId)
            .ToListAsync();

        var clients = await _context.Clients
            .Where(c => c.UserId == userId)
            .ToListAsync();

        return new InvoiceSummaryDto
        {
            TotalClients = clients.Count,
            TotalInvoices = invoices.Count,
            PendingInvoices = invoices.Count(i => i.Status == InvoiceStatus.Pending),
            PaidInvoices = invoices.Count(i => i.Status == InvoiceStatus.Paid),
            TotalPendingAmount = invoices.Where(i => i.Status == InvoiceStatus.Pending).Sum(i => i.Amount),
            TotalPaidAmount = invoices.Where(i => i.Status == InvoiceStatus.Paid).Sum(i => i.Amount)
        };
    }
}