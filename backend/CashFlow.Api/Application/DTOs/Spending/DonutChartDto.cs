using CashFlow.Api.Domain.Enums;
namespace CashFlow.Api.Application.DTOs.Spending;

public class DonutChartDto
{
    public decimal Total {get;set;}
    public IReadOnlyList<SpendingCategoryDto> Categories {get;set;} = Array.Empty<SpendingCategoryDto>();
}
