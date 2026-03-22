using System.Security.Claims;
using CashFlow.Api.Application.Budget.Queries.GetBudgetRecommendations;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mscc.GenerativeAI.Types;

namespace CashFlow.Api.Controllers;

[ApiController]
[Route("api/budget")]
[Authorize]
public class BudgetController:ControllerBase
{
    private readonly IMediator _mediator;
    public BudgetController(IMediator mediator)
    {
        _mediator=mediator;
    }

    // Get /api/budget/recommendations
    [HttpGet("recommendations")]
    public async Task<IActionResult> GetRecommendations()
    {
        var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result= await _mediator.Send(new GetBudgetRecommendationsQuery(userId));

        if(result.IsFailure)
        {
            return StatusCode(result.StatusCode,new {error= result.Error});
        }

        return Ok(result.Value);
    }
}
