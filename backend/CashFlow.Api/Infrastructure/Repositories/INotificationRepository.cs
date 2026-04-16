using CashFlow.Api.Domain.Entities;

namespace CashFlow.Api.Infrastructure.Repositories;

public interface INotificationRepository
{
    Task<Notification?> GetByIdAsync(Guid id);
    Task<IEnumerable<Notification>> GetByUserIdAsync(Guid userId);
    Task<int> GetUnreadCountAsync(Guid userId);
    Task<Notification> CreateAsync(Notification notification);
    Task<bool> MarkAsReadAsync(Guid id);
    Task<bool> MarkAllAsReadAsync(Guid userId);
    Task<bool> DeleteAsync(Guid id);
}
