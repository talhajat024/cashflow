namespace CashFlow.Api.Application.DTOs.Dashboard;

public class DashboardSummaryDto
{
    public BalanceSummaryDto TotalBalance {get;set;} =null!;
    public PeriodSummaryDto Income {get;set;} = null!;
    public PeriodSummaryDto Spending {get;set;}= null!;
    public NetCashFlowDto NetCashFlow {get;set;}=null!;
}

public class BalanceSummaryDto
{
    public decimal Amount{get;set;}
    public string Currency {get;set;}="USD";
}

public class PeriodSummaryDto
{
    public decimal ThisMonth {get;set;}
    public decimal AllTime {get;set;}
    public decimal PercentageChange {get;set;}
    public bool IsPositiveChange {get;set;}
}

public class NetCashFlowDto
{
    public decimal ThisMonth {get;set;}
    public decimal AllTime {get;set;}
}
