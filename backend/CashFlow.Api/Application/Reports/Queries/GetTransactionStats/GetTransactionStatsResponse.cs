namespace CashFlow.Api.Application.Reports.Queries.GetTransactionStats;

public class GetTransactionStatsResponse
{
    public List<TransactionCategoryDto> Categories {get;set;}=[];
    public List<TopMerchantDto> TopMerchants {get;set;}=[];
    public decimal Total {get;set;}
}

public class TransactionCategoryDto
{
    public string  Name       { get; set; } = string.Empty;
    public decimal Amount     { get; set; }
    public double  Percentage { get; set; }
}
 
public class TopMerchantDto
{
    public string  Name         { get; set; } = string.Empty;
    public string? Logo         { get; set; }
    public string  Category     { get; set; } = string.Empty;
    public decimal TotalAmount  { get; set; }
    public int     Transactions { get; set; }
}
