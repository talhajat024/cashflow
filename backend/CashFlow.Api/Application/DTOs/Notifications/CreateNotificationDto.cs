using System;

namespace CashFlow.Api.Application.DTOs.Notifications;

public class CreateNotificationDto
{
    public Guid UserId {get;set;}
    public string Type {get;set;}=string.Empty;
    public string Title {get;set;}=string.Empty;
    public string Message {get;set;}=string.Empty;

}
