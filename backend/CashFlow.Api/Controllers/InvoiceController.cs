using System.Security.Claims;
using CashFlow.Api.Application.DTOs.Invoices;
using CashFlow.Api.Application.Invoices.Commands.CreateInvoice;
using CashFlow.Api.Application.Invoices.Commands.UpdateInvoiceStatus;
using CashFlow.Api.Application.Invoices.Queries.GetInvoices;
using CashFlow.Api.Application.Invoices.Queries.GetInvoiceSummary;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CashFlow.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class InvoiceController : ControllerBase
{
    private readonly IMediator _mediator;

    public InvoiceController(IMediator mediator)
    {
        _mediator = mediator;
    }

    private Guid GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdClaim))
        {
            throw new UnauthorizedAccessException("User ID not found");
        }
        return Guid.Parse(userIdClaim);
    }

    [HttpGet]
    public async Task<IActionResult> GetInvoices([FromQuery] int? status)
    {
        var query = new GetInvoicesQuery
        {
            UserId = GetUserId(),  // This returns Guid
            Status = status
        };
        
        var result = await _mediator.Send(query);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var query = new GetInvoiceSummaryQuery 
        { 
            UserId = GetUserId()  // This returns Guid
        };
        var result = await _mediator.Send(query);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }

    [HttpPost]
    public async Task<IActionResult> CreateInvoice([FromBody] CreateInvoiceCommand command)
    {
        command.UserId = GetUserId();  // This returns Guid
        var result = await _mediator.Send(command);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateInvoiceStatusRequestDto request)
    {
        var command = new UpdateInvoiceStatusCommand
        {
            Id = id,
            UserId = GetUserId(),  // This returns Guid
            Status = request.Status
        };
        
        var result = await _mediator.Send(command);
        return result.IsSuccess ? Ok(result.Value) : BadRequest(result.Error);
    }
}