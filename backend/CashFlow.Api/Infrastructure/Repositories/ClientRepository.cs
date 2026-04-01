using Microsoft.EntityFrameworkCore;
using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Infrastructure.Data;

namespace CashFlow.Api.Infrastructure.Repositories;

public class ClientRepository:IClientRepository
{
    private readonly AppDbContext _context;
    public ClientRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Client?> GetByIdAsync(int id,Guid userId)
    {
        return await _context.Clients.Include(c=> c.Invoices).FirstOrDefaultAsync(c=> c.Id == id && c.UserId == userId);
    }

    public async Task<IEnumerable<Client>> GetByUserIdAsync(Guid userId)
    {
        return await _context.Clients.Where(c=> c.UserId == userId).OrderByDescending(c=> c.CreatedAt).ToListAsync();
    }

    public async Task<Client> CreateAsync(Client client)
    {
        _context.Clients.Add(client);
        await _context.SaveChangesAsync();
        return client;
    }

    public async Task UpdateAsync(Client client)
    {
        _context.Clients.Update(client);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client != null)
        {
            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id, Guid userId)
    {
        return await _context.Clients.AnyAsync(c => c.Id == id && c.UserId == userId);
    }

}
