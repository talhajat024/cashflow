using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CashFlow.Api.Infrastructure.Repositories;

public class WalletRepository:IWalletRepository
{
    private readonly AppDbContext _context;
    private readonly IDbContextFactory<AppDbContext> _contextFactory;
    public WalletRepository(AppDbContext context,IDbContextFactory<AppDbContext> contextFactory)
    {
        _context=context;
        _contextFactory=contextFactory;
    }

    public async Task<List<Wallet>> GetByUserIdAsync(Guid userId)
    => await _context.Wallets.Where(w=> w.UserId == userId).OrderByDescending(w=> w.IsDefault).ThenBy(w=> w.CreatedAt).ToListAsync();

    public async Task<Wallet?> GetByIdAsync(Guid id)
    => await _context.Wallets.FindAsync(id);

    public async Task<decimal> GetTotalBalanceAsync(Guid userId)
    {
        await using var ctx= await _contextFactory.CreateDbContextAsync();
        return await ctx.Wallets.Where(w=> w.UserId == userId)
        .SumAsync(w=> w.Balance);
    }

    public async Task AddAsync(Wallet wallet)
    => await _context.Wallets.AddAsync(wallet);

    public async Task UpdateAsync(Wallet wallet)
    => _context.Wallets.Update(wallet);

    public async Task SaveChangesAsync()
    => await _context.SaveChangesAsync();
}
