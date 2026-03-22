using MediatR;
namespace CashFlow.Api.Application.Reports.Queries.GetMonthlyReport;

public record GetMonthlyReportQuery(Guid UserId,string UserName,int Month,int Year):IRequest<byte[]>;
