using MediatR;
using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Infrastructure.Repositories;
using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.DTOs.Invoices;

namespace CashFlow.Api.Application.Clients.Commands.CreateClient;

public class CreateClientHandler : IRequestHandler<CreateClientCommand, Result<ClientDto>>
{
    private readonly IClientRepository _clientRepository;

    public CreateClientHandler(IClientRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    public async Task<Result<ClientDto>> Handle(CreateClientCommand request, CancellationToken cancellationToken)
    {
        var client = new Client
        {
            Name = request.Name,
            Email = request.Email,
            Company = request.Company,
            Phone = request.Phone,
            Address = request.Address,
            UserId = request.UserId,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _clientRepository.CreateAsync(client);

        var clientDto = new ClientDto
        {
            Id = created.Id,
            Name = created.Name,
            Email = created.Email,
            Company = created.Company,
            Phone = created.Phone,
            Address = created.Address,
            TotalInvoices = 0,
            TotalAmount = 0
        };

        return Result<ClientDto>.Success(clientDto);
    }
}