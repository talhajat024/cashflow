using Microsoft.AspNetCore.Mvc;
using CashFlow.Api.Application.DTOs;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Application.Dashboard.Queries.GetHealthScore;
using MediatR;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
namespace CashFlow.Api.Controllers;


[ApiController]
[Route("api/dashboard")]
[Authorize]
public class DashboardController:ControllerBase
{
    private readonly IDashboardService _dashboardService;
    private readonly IMediator _mediator;
    public DashboardController(IDashboardService dashboardService,IMediator mediator)
    {
        _dashboardService= dashboardService;
        _mediator=mediator;
    }
    
    [HttpGet("overview")]
    public async Task<ActionResult<DashboardOverviewDto>> GetOverview([FromQuery] int balanceRangeInMonths=6)
    {
        var userId = GetCurrentUserId();
        var overview =  await _dashboardService.GetOverviewAsync(userId,balanceRangeInMonths);
        return Ok(overview);
    }

    [HttpGet("health-score")]
    public async Task<IActionResult> GetHealthScore()
    {
        var userId = GetCurrentUserId();
        var result = await _mediator.Send(new GetHealthScoreQuery(userId));

        if (result.IsFailure)
            return StatusCode(result.StatusCode, new { error = result.Error });

        return Ok(result.Value);
    }

    private Guid GetCurrentUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (claim != null) return Guid.Parse(claim);

        return Guid.Parse("11111111-1111-1111-1111-111111111111");
    }

}
