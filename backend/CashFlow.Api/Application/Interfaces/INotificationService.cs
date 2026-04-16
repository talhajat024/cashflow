using CashFlow.Api.Application.DTOs.Notifications;

namespace CashFlow.Api.Application.Interfaces;

public interface INotificationService
{
    Task<IEnumerable<NotificationDto>> GetUserNotificationsAsync(Guid userId);
    Task<int> GetUnreadCountAsync(Guid userId);
    Task<NotificationDto> CreateNotificationAsync(CreateNotificationDto dto);
    Task<bool> MarkAsReadAsync(Guid notificationId,Guid userId);
    Task<bool> MarkAllAsReadAsync(Guid userId);
}
