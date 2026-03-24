using System.Security.Claims;
using CashFlow.Api.Application.Reports.Queries.GetMonthlyReport;
using CashFlow.Api.Application.Reports.Queries.GetReportStats;
using CashFlow.Api.Application.Reports.Queries.GetIncomeVsExpense;
using CashFlow.Api.Application.Reports.Queries.GetTransactionStats;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CashFlow.Api.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize]
public class ReportController:ControllerBase
{
    private readonly IMediator _mediator;
    public ReportController(IMediator mediator)
    {
        _mediator=mediator;
    }

    private Guid GetUserId()=> 
        Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet("monthly")]
    public async Task<IActionResult> GetMonthlyReport([FromQuery] int month,[FromQuery] int year)
    {
        var userId= Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var userName = User.FindFirstValue(ClaimTypes.Name) ?? "User";

        if(month < 1 || month > 12)
        {
            return BadRequest(new {error="Invalid month"});
        }

        if(year < 2000 || year > DateTime.UtcNow.Year)
        {
            return BadRequest(new {error= "Invalid year"});
        }

        var pdfBytes = await _mediator.Send(new GetMonthlyReportQuery(userId,userName,month,year));
        var fileName = $"CashFlow-Report-{year}-{month:D2}.pdf";

        return File(pdfBytes,"application/pdf",fileName); 
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var result = await _mediator.Send(new GetReportStatsQuery(GetUserId()));
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Error);
    }

    [HttpGet("income-vs-expense")]
    public async Task<IActionResult> GetIncomeVsExpense()
    {
        var result = await _mediator.Send(new GetIncomeVsExpenseQuery(GetUserId()));
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Error);
    }
 
    // ─── GET /api/reports/transaction-stats ──────────────────────────────────
    [HttpGet("transaction-stats")]
    public async Task<IActionResult> GetTransactionStats()
    {
        var result = await _mediator.Send(new GetTransactionStatsQuery(GetUserId()));
        return result.IsSuccess ? Ok(result.Value) : NotFound(result.Error);
    }
}

