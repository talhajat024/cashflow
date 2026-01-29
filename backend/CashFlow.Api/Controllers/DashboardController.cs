using Microsoft.AspNetCore.Mvc;
using CashFlow.Api.Application.DTOs;
using CashFlow.Api.Application.Interfaces;
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
    public IActionResult GetOverview()
    {
        var userId = GetCurrentUserId();
        var overview =  _dashboardService.GetOverview(userId);
        var dto= new DashboardOverviewDto
        {
            TotalBalance = overview.TotalBalance,
        TotalIncome = overview.TotalIncome,
        TotalSpending = overview.TotalSpending,
        RecentTransactions = overview.RecentTransactions.Select(t => new TransactionDto
        {
            Amount = t.Amount,
            Type = t.Type.ToString(),
            Date = t.CreatedAt
        }).ToList()
        };
        return Ok(dto);
    }

    private Guid GetCurrentUserId()
    {
        return Guid.Parse("11111111-1111-1111-1111-111111111111");
    }

}
