using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Collections.Concurrent;

namespace CashFlow.Api.Hubs;

[Authorize]
public class NotificationHub:Hub
{
    private static readonly ConcurrentDictionary<string,string> _userConnections= new();
    public override async Task OnConnectedAsync()
    {
        var userId= Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(!string.IsNullOrEmpty(userId))
        {
            _userConnections.AddOrUpdate(userId,Context.ConnectionId,(key,old)=> Context.ConnectionId);
        }
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if(!string.IsNullOrEmpty(userId))
        {
            _userConnections.TryRemove(userId,out _);
        }
        await base.OnDisconnectedAsync(exception);
    }

    public static async Task SendNotificationToUser(string userId,object notification,IHubContext<NotificationHub> hubContext)
    {
        if(_userConnections.TryGetValue(userId,out var connectionId))
        {
            await hubContext.Clients.Client(connectionId).SendAsync("ReceiveNotification",notification);
        }
    }

    public static async Task UpdateUnreadCount(string userId,int count,IHubContext<NotificationHub> hubContext)
    {
        if(_userConnections.TryGetValue(userId,out var connectionId))
        {
            await hubContext.Clients.Client(connectionId).SendAsync("unreadCountUpdated",count);
        }
    }
}
