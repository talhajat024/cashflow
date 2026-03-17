using System.Security.Claims;
using CashFlow.Api.Application.Transactions.Commands.CreateTransaction;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CashFlow.Api.Controllers;

[ApiController]
[Route("api/transactions")]
[Authorize]
public class TransactionController:ControllerBase
{
    private readonly IMediator _mediator;
    public TransactionController(IMediator mediator)
    {
        _mediator=mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTransactionRequest request)
    {
        var userId= Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var command = new CreateTransactionCommand(
            UserId:          userId,
            WalletId:        request.WalletId,
            ToWalletId:      request.ToWalletId,
            Amount:          request.Amount,
            Type:            request.Type.ToString(),
            Nature:          request.Nature.ToString(),
            CounterpartyName: request.CounterpartyName,
            CounterpartyLogo: request.CounterpartyLogo,
            Description:     request.Description,
            Date:            request.Date
        );
        var result = await _mediator.Send(command);
        if(result.IsFailure)
        {
            return StatusCode(result.StatusCode, new {error =result.Error});
        }
        return Ok(result.Value);
    }
}
