using CashFlow.Api.Application.Common;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Repositories;
using CashFlow.Api.Application.DTOs.Wallets;
using MediatR;

namespace CashFlow.Api.Application.Wallets.Queries.GetWalletTab;

public class GetWalletTabHandler:IRequestHandler<GetWalletTabQuery,Result<GetWalletTabResponse>>
{
    private readonly IWalletRepository _walletRepo;
    private readonly ITransactionRepository _transactionRepo;

    public GetWalletTabHandler(IWalletRepository walletRepo,ITransactionRepository transactionRepo)
    {
        _walletRepo=walletRepo;
        _transactionRepo=transactionRepo;
    }

    public async Task<Result<GetWalletTabResponse>> Handle(GetWalletTabQuery query,CancellationToken cancellationToken)
    {
        var wallets= await _walletRepo.GetByUserIdAsync(query.UserId);
        if (!wallets.Any())
        {
            return Result<GetWalletTabResponse>.NotFound("No wallets found");
        }
        // Select active Wallet
        var selected= query.WalletId.HasValue ? wallets.FirstOrDefault(w=> w.Id == query.WalletId)
        : wallets.FirstOrDefault(w=> w.IsDefault) ?? wallets.First();

        if(selected == null)
        {
            return Result<GetWalletTabResponse>.NotFound("Wallet not found");
        }

        if(selected.UserId != query.UserId)
        {
            return Result<GetWalletTabResponse>.Unauthorized("Access denied");
        }

        // Get Transaction for selected wallet
        var transactions = await _transactionRepo.GetByUserAsync(query.UserId);
        var walletTransactions = transactions.Where(t=> t.WalletId == selected.Id)
        .ToList();

        // Build Response 
        var response= new GetWalletTabResponse
        {
            Wallets=wallets.Select(w=> new WalletCardDto
            {
                Id=w.Id,
                Name = w.Name,
                Number=w.CardNumber,
                Balance= w.Balance,
                Currency=w.Currency,
                IsDefault=w.IsDefault,
            }).ToList(),
            SelectedWallet= new SelectedWalletDto
            {
                Details= new CardDetailsDto
                {
                    Number= selected.CardNumber,
                    ExpireDate=selected.ExpireDate,
                    Cvc= selected.Cvc,
                    Status=selected.CardStatus,
                },
                Limit = new CardLimitDto
                {
                    Used= selected.UsedLimit,
                    Total= selected.CreditLimit,
                    Currency= selected.Currency,
                    Period="Monthly",
                },
                Statistics= BuildStatistics(walletTransactions),
                LastTransaction= walletTransactions.OrderByDescending(t=> t.Date).Take(5).Select(t=> new WalletTransactionDto
                {
                    Id= t.Id,
                    Company= t.CounterpartyName,
                    Category=t.Category,
                    Type= t.Nature.ToString(),
                    Amount = t.Amount,
                    Status= t.Status.ToString(),
                    Logo=t.CounterpartyLogo,
                }).ToList(),
            }
        };
        return Result<GetWalletTabResponse>.Success(response);
    }

    private static BalanceStatisticsDto BuildStatistics(IEnumerable<Domain.Entities.Transaction> transactions)
    {
        var now = DateTime.UtcNow;

        var startMonths = new DateTime(now.Year,1,1);

        var months= Enumerable.Range(0,10)
        .Select(i=> startMonths.AddMonths(i))
        .ToList();

        Console.WriteLine($"Months: {string.Join(", ", months.Select(m => m.ToString("MMM yyyy")))}");

        // Income - Spending per month = net balance point
        var data = months.Select(m=>
        {
            var monthTx = transactions.Where(t=> t.Date.Year == m.Year  && t.Date.Month == m.Month).ToList();

            var income = monthTx.Where(t=> t.Type == TransactionType.Income).Sum(t=> t.Amount);
            var spending = monthTx.Where(t=> t.Type == TransactionType.Expense).Sum(t=> t.Amount);

            return new BalanceStatPointDto
            {
                Month= m.ToString("MMM"),
                Amount = income-spending,
            };
        }).ToList();

        // Active Month = current month
        var activeMonth = now.ToString("MMM");
        var activePoint = data.FirstOrDefault(d=> d.Month == activeMonth);
        var activeAmount = activePoint?.Amount ?? 0;

        // % Change vs last month
        var lastMonthPoint = data.Count >= 2 ? data[^2]:null;
        var lastMonthAmount = lastMonthPoint?.Amount ?? 0;

        decimal changePercent= lastMonthAmount == 0 ? 0 : Math.Round(((activeAmount - lastMonthAmount)/Math.Abs(lastMonthAmount))*100 ,1);
        return new BalanceStatisticsDto
        {
            Data = data,
            ActiveMonth=activeMonth,
            ActiveYear = now.Year,
            ActiveAmount=activeAmount,
            ChangePercent=Math.Abs(changePercent),
            IsPositive=changePercent >= 0,
        };
    }
}
