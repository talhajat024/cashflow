using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;
using MediatR;

namespace CashFlow.Api.Application.Clients.Commands.CreateClient;

public class CreateClientCommand : IRequest<Result<ClientDto>>
{
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Company { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
}