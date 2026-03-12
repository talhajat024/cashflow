using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CashFlow.Api.Application.Wallets.Queries.GetWalletTab;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace CashFlow.Api.Controllers;


[ApiController]
[Route("api/wallets")]
[Authorize]
public class WalletController:ControllerBase
{
    private readonly IMediator _mediator;
    public WalletController(IMediator mediator)
    {
        _mediator=mediator;
    }

    // Get  /api/wallets/tab
    // Get  /api/wallets/tab?walletId=xx
    [HttpGet("tab")]
    public async Task<IActionResult> GetWalletTab([FromQuery] Guid? walletId)
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _mediator.Send(new GetWalletTabQuery(userId,walletId));
        if(result.IsFailure)
            return StatusCode(result.StatusCode,new {error=result.Error});

        return Ok(result.Value);
    }
}
