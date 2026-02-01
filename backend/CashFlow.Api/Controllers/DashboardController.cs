using Microsoft.AspNetCore.Mvc;
using CashFlow.Api.Application.DTOs;
using CashFlow.Api.Application.Interfaces;
using System.Formats.Asn1;
using CashFlow.Api.Domain.Enums;
namespace CashFlow.Api.Controllers;


[ApiController]
[Route("api/dashboard")]
public class DashboardController:ControllerBase
{
    private readonly IDashboardService _dashboardService;
    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService= dashboardService;
    }
    
    [HttpGet("overview")]
    public async Task<ActionResult<DashboardOverviewDto>> GetOverview([FromQuery] TimeRange spendingRange = TimeRange.Monthly,[FromQuery] int balanceRangeInMonths=6)
    {
        var userId = GetCurrentUserId();
        var overview =  await _dashboardService.GetOverviewAsync(userId,spendingRange,balanceRangeInMonths);
        return Ok(overview);
    }

    private Guid GetCurrentUserId()
    {
        return Guid.Parse("11111111-1111-1111-1111-111111111111");
    }

}
