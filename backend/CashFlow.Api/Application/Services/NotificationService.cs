using Microsoft.AspNetCore.SignalR;
using CashFlow.Api.Application.DTOs.Notifications;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Hubs;
using CashFlow.Api.Infrastructure.Repositories;

namespace CashFlow.Api.Application.Services;

public class NotificationService:INotificationService
{
    private readonly INotificationRepository _notificationRepository;
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationService(INotificationRepository notificationRepository,IHubContext<NotificationHub> hubContext)
    {
        _notificationRepository= notificationRepository;
        _hubContext=hubContext;
    }

    public async Task<IEnumerable<NotificationDto>> GetUserNotificationsAsync(Guid userId)
    {
        var notifications = await _notificationRepository.GetByUserIdAsync(userId);
        return notifications.Select(MapToDto);
    }

    public async Task<int> GetUnreadCountAsync(Guid userId)
    {
        return await _notificationRepository.GetUnreadCountAsync(userId);
    }

    public async Task<NotificationDto> CreateNotificationAsync(CreateNotificationDto dto)
    {
        var notification = new Notification
        {
            UserId= dto.UserId,
            Type= dto.Type,
            Title=dto.Title,
            Message = dto.Message,
            IsRead= false,
            CreatedAt= DateTime.UtcNow,
        };
        var created = await _notificationRepository.CreateAsync(notification);

        // send real-time notification
        await NotificationHub.SendNotificationToUser(dto.UserId.ToString(),MapToDto(created),_hubContext);

        // Update Unread Count
        var unreadCount = await _notificationRepository.GetUnreadCountAsync(dto.UserId);
        await NotificationHub.UpdateUnreadCount(dto.UserId.ToString(),unreadCount,_hubContext);

        return MapToDto(created);
    }

    public async Task<bool> MarkAsReadAsync(Guid notificationId,Guid userId)
    {
        var result = await _notificationRepository.MarkAsReadAsync(notificationId);
        if(result)
        {
            var unreadCount = await _notificationRepository.GetUnreadCountAsync(userId);
            await NotificationHub.UpdateUnreadCount(userId.ToString(),unreadCount,_hubContext);
        }
        return result;
    }

    public async Task<bool> MarkAllAsReadAsync(Guid userId)
    {
        var result = await _notificationRepository.MarkAllAsReadAsync(userId);
        if(result)
        {
            await NotificationHub.UpdateUnreadCount(userId.ToString(), 0,_hubContext);
        }
        return result;
    }

    private static NotificationDto MapToDto(Notification notification)
    {
        return new NotificationDto
        {
            Id = notification.Id,
            Type= notification.Type,
            Title = notification.Title,
            Message=notification.Message,
            IsRead= notification.IsRead,
            CreatedAt= notification.CreatedAt,
            ReadAt=notification.ReadAt
        };
    }

}
