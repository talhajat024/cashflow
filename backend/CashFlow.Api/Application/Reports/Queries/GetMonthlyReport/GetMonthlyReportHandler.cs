using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.PDF;
using CashFlow.Api.Infrastructure.Repositories;
using Humanizer;
using MediatR;

namespace CashFlow.Api.Application.Reports.Queries.GetMonthlyReport;

public class GetMonthlyReportHandler:IRequestHandler<GetMonthlyReportQuery,byte[]>
{
    private readonly ITransactionRepository _transactionRepo;
    private readonly IWalletRepository _walletRepo;
    private readonly IReportService _reportService;
    private readonly PdfGenerator _pdfGenerator;

    public GetMonthlyReportHandler(ITransactionRepository transactionRepo,IWalletRepository walletRepo,IReportService reportService,PdfGenerator pdfGenerator)
    {
        _transactionRepo=transactionRepo;
        _walletRepo=walletRepo;
        _reportService=reportService;
        _pdfGenerator=pdfGenerator;
    }

    public async Task<byte[]> Handle(GetMonthlyReportQuery query,CancellationToken cancellationToken)
    {
        var monthStart= new DateTime(query.Year,query.Month,1);
        var monthEnd = monthStart.AddMonths(1).AddDays(-1);

        // Fetch Data
        var allTransactions = await _transactionRepo.GetByUserAsync(query.UserId);
        var wallets= await _walletRepo.GetByUserIdAsync(query.UserId);

        var monthTransactions = allTransactions.Where(t=> t.Date >= monthStart && t.Date <= monthEnd).ToList();

        // Calculate Totals
        var totalIncome = monthTransactions.Where(t=> t.Type == TransactionType.Income)
        .Sum(t=> t.Amount);

        var totalSpending = monthTransactions.Where(t=> t.Type == TransactionType.Expense)
        .Sum(t=> t.Amount);

        var netSavings = totalIncome - totalSpending;
        var savingsRate = totalIncome > 0 ? (netSavings/totalIncome)*100:0;
        var closingBalance = wallets.Sum(w=> w.Balance);
        var openingBalance = closingBalance - netSavings;

        // Category Breakdown
        var categories = monthTransactions.Where(t=> t.Type == TransactionType.Expense)
        .GroupBy(t=> t.Category)
        .Select(g=>
        {
            var amount = g.Sum(x=> x.Amount);
            return new ReportCategoryData
            {
                Category= g.Key,
                Amount = amount,
                Percentage = totalSpending > 0 ? Math.Round((amount/totalSpending)*100,1):0,
            };
        }).OrderByDescending(c=> c.Amount)
        .ToList();


        // Top Transactions
        var topTransactions = monthTransactions.OrderByDescending(t=> t.Amount)
        .Take(5)
        .Select(t=> new ReportTransactionData
        {
            Company=t.CounterpartyName,
            Category= t.Category,
            Amount=t.Amount,
            Type=t.Type.ToString(),
            Date=t.Date,
        }).ToList();

        // Build Report Data
        var reportData = new MonthlyReportData
        {
            UserName=query.UserName,
            Month= query.Month,
            Year= query.Year,
            MonthName=monthStart.ToString("MMMM"),
            TotalIncome=totalIncome,
            TotalSpending=totalSpending,
            NetSavings= netSavings,
            SavingsRate=Math.Round(savingsRate,1),
            OpeningBalance=openingBalance,
            ClosingBalance=closingBalance,
            Categories=categories,
            TopTransactions=topTransactions,
        };

        var narrative = await _reportService.GenerateReportNarrativeAsync(reportData);
        reportData.Narrative = narrative;

        // Generate pdf 
        return _pdfGenerator.Generate(reportData);
    }
}
