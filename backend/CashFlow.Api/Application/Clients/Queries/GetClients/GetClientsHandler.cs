using MediatR;
using CashFlow.Api.Infrastructure.Repositories;
using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;

namespace CashFlow.Api.Application.Clients.Queries.GetClients;

public class GetClientsHandler : IRequestHandler<GetClientsQuery, Result<IEnumerable<ClientDto>>>
{
    private readonly IClientRepository _clientRepository;

    public GetClientsHandler(IClientRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    public async Task<Result<IEnumerable<ClientDto>>> Handle(GetClientsQuery request, CancellationToken cancellationToken)
    {
        var clients = await _clientRepository.GetByUserIdAsync(request.UserId);
        
        var clientDtos = clients.Select(c => new ClientDto
        {
            Id = c.Id,
            Name = c.Name,
            Email = c.Email,
            Company = c.Company,
            Phone = c.Phone,
            Address = c.Address,
            TotalInvoices = c.Invoices?.Count ?? 0,
            TotalAmount = c.Invoices?.Sum(i => i.Amount) ?? 0
        });

        return Result<IEnumerable<ClientDto>>.Success(clientDtos);
    }
}