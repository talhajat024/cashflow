namespace CashFlow.Api.Application.Interfaces;

public interface IReportService
{
    Task<string> GenerateReportNarrativeAsync(MonthlyReportData data);
}

public class MonthlyReportData
{
    public string UserName {get;set;}=string.Empty;
    public int Month {get;set;}
    public int Year {get;set;}
    public string MonthName {get;set;}= string.Empty;

    public decimal TotalIncome {get;set;}
    public decimal TotalSpending {get;set;}
    public decimal NetSavings {get;set;}
    public decimal SavingsRate {get;set;}
    public decimal OpeningBalance {get;set;}
    public decimal ClosingBalance {get;set;}
    public string Narrative { get; set; } = string.Empty;
    public List<ReportCategoryData>    Categories       { get; set; } = [];
    public List<ReportTransactionData> TopTransactions  { get; set; } = [];
}

public class ReportCategoryData
{
    public string Category {get;set;} = string.Empty;
    public decimal Amount {get;set;}
    public decimal Percentage {get;set;}
}

public class ReportTransactionData
{
    public string Company {get;set;} = string.Empty;
    public string Category {get;set;}= string.Empty;
    public decimal Amount {get;set;} 
    public string Type {get;set;} =string.Empty;
    public DateTime Date {get;set;}
}






