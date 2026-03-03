using CashFlow.Api.Domain.Entities;
namespace CashFlow.Api.Infrastructure.Repositories;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User?> GetByIdAsync(Guid Id);
    Task<User?> GetByIdWithRefreshTokensAsync(Guid id);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
    Task AddRefreshTokenAsync(RefreshToken token);
    Task<RefreshToken?> GetRefreshTokenAsync(string token); 
    Task SaveChangesAsync();
}
