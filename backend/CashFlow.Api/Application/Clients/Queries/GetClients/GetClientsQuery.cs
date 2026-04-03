using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;
using MediatR;

namespace CashFlow.Api.Application.Clients.Queries.GetClients;

public class GetClientsQuery : IRequest<Result<IEnumerable<ClientDto>>>
{
    public Guid UserId { get; set; }
}