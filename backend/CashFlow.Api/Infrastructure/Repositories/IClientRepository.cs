using CashFlow.Api.Domain.Entities;

namespace CashFlow.Api.Infrastructure.Repositories;

public interface IClientRepository
{
    Task<Client?> GetByIdAsync(int id,Guid userId);
    Task<IEnumerable<Client>> GetByUserIdAsync(Guid userId);
    Task<Client> CreateAsync(Client client);
    Task UpdateAsync(Client client);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id,Guid userId);
}
