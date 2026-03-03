using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Infrastructure.Data;
using CashFlow.Api.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace CashFlow.Api.Infrastructure.Repositories;

public class UserRepository:IUserRepository
{
    private readonly AppDbContext _context;
    public UserRepository(AppDbContext context)
    {
        _context=context;
    }
    public async Task<User?> GetByEmailAsync(string email)
    => await _context.Users
    .FirstOrDefaultAsync(u=> u.Email.ToLower() == email.ToLower());

    public async Task<User?> GetByIdAsync(Guid id)
    => await _context.Users.FindAsync(id);

    public async Task<User?> GetByIdWithRefreshTokensAsync(Guid id)
    => await _context.Users
    .Include(u=> u.RefreshTokens)
    .FirstOrDefaultAsync(u=> u.Id == id);

    public async Task AddAsync(User user)
    => await _context.Users.AddAsync(user);

    public async Task UpdateAsync(User user)
    => _context.Users.Update(user);

    public async Task AddRefreshTokenAsync(RefreshToken token)
    => await _context.RefreshTokens
    .AddAsync(token);

    public async Task<RefreshToken?> GetRefreshTokenAsync(string token)
    => await _context.RefreshTokens
    .Include(rt=> rt.User)
    .FirstOrDefaultAsync(rt=> rt.Token == token);

    public async Task SaveChangesAsync()
    => await _context.SaveChangesAsync();

}
