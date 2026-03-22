using System.Security.Claims;
using CashFlow.Api.Application.Reports.Queries.GetMonthlyReport;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CashFlow.Api.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize]
public class ReportController:ControllerBase
{
    private readonly IMediator _meditor;
    public ReportController(IMediator mediator)
    {
        _meditor=mediator;
    }

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

        var pdfBytes = await _meditor.Send(new GetMonthlyReportQuery(userId,userName,month,year));
        var fileName = $"CashFlow-Report-{year}-{month:D2}.pdf";

        return File(pdfBytes,"application/pdf",fileName); 
    }
}
