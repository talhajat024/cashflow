using CashFlow.Api.Domain.Models;
namespace CashFlow.Api.Application.Interfaces;

public interface IDashboardService
{
    DashboardOverview GetOverview(Guid userId);
}
