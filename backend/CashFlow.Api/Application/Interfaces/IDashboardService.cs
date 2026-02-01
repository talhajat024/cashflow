using CashFlow.Api.Application.DTOs;
using CashFlow.Api.Domain.Enums;
namespace CashFlow.Api.Application.Interfaces;

public interface IDashboardService
{
    Task<DashboardOverviewDto> GetOverviewAsync(Guid userId,TimeRange spendingRange,int balanceRangeInMonths);
}
