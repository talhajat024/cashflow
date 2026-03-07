using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
namespace CashFlow.Api.Infrastructure.Repositories;

public class TransactionRepository:ITransactionRepository
{
    private readonly AppDbContext _context;
    private readonly IDbContextFactory<AppDbContext> _contextFactory;
    public TransactionRepository(AppDbContext context,IDbContextFactory<AppDbContext> contextFactory)
    {
        _context=context;
        _contextFactory=contextFactory;
    } 
    
    public async Task<IReadOnlyList<Transaction>> GetByUserAsync(Guid userId)
    => await _context.Transactions.Where(t=> t.UserId== userId)
    .Include(t=> t.Wallet)
    .OrderByDescending(t=> t.Date)
    .ToListAsync();

    public async Task<IReadOnlyList<Transaction>> GetRecentAsync(Guid userId,int count)
    => await _context.Transactions.Where(t=> t.UserId == userId)
    .Include(t=> t.Wallet)
    .OrderByDescending(t=> t.Date)
    .Take(count)
    .ToListAsync();

    public async Task<decimal> GetTotalByTypeAndPeriodAsync(Guid userId,TransactionType type,DateTime startDate,DateTime endDate)
    {
        await using var ctx = await _contextFactory.CreateDbContextAsync();
        return await ctx.Transactions.Where(t=> t.UserId == userId && t.Type == type && t.Date >= startDate && t.Date <= endDate).SumAsync(t=> t.Amount);
    }

    public async Task<decimal> GetAllTimeTotalByTypeAsync(Guid userId,TransactionType type)
    {
        await using var ctx = await _contextFactory.CreateDbContextAsync();
        return await ctx.Transactions.Where(t=> t.UserId == userId && t.Type == type).SumAsync(t=> t.Amount);
    }
    public async Task AddAsync(Transaction transaction)
    => await _context.Transactions.AddAsync(transaction);

    public async Task SaveChangesAsync()
    => await _context.SaveChangesAsync();
}
