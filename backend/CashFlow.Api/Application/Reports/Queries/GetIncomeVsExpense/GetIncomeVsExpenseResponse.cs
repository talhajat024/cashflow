namespace CashFlow.Api.Application.Reports.Queries.GetIncomeVsExpense;

public class IncomeVsExpenseMonthDto
{
    public string Month {get;set;}=string.Empty;
    public decimal Income {get;set;}
    public decimal Expense {get;set;}
}
