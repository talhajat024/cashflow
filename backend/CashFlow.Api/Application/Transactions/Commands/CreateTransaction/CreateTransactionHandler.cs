using CashFlow.Api.Application.Common;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;
using CashFlow.Api.Infrastructure.Repositories;
using MediatR;

namespace CashFlow.Api.Application.Transactions.Commands.CreateTransaction;

public class CreateTransactionHandler : IRequestHandler<CreateTransactionCommand, Result<CreateTransactionResponse>>
{
    private readonly ITransactionRepository _transactionRepo;
    private readonly IWalletRepository _walletRepo;
    private readonly ITransactionAIService _transactionAIService;

    public CreateTransactionHandler(ITransactionRepository transactionRepo,IWalletRepository walletRepo,ITransactionAIService transactionAIService)
    {
        _transactionRepo=transactionRepo;
        _walletRepo= walletRepo;
        _transactionAIService= transactionAIService;
    }

    public async Task<Result<CreateTransactionResponse>> Handle(CreateTransactionCommand command,CancellationToken cancellationToken)
    {
        // Validate Wallet
        var wallet= await _walletRepo.GetByIdAsync(command.WalletId);
        if(wallet == null)
            return Result<CreateTransactionResponse>.NotFound("Wallet Not Found");

        if(wallet.UserId != command.UserId)
            return Result<CreateTransactionResponse>.Unauthorized("Access denied");

        // Parse Enums
        if(!Enum.TryParse<TransactionType>(command.Type,out var type))
            return Result<CreateTransactionResponse>.Failure("Invalid transaction type");

        if(!Enum.TryParse<TransactionNature>(command.Nature,out var nature))
            return Result<CreateTransactionResponse>.Failure("Invalid transaction nature");

        Console.WriteLine($"Description: {command.Description}");

        var recentTransactions = await _transactionRepo.GetRecentAsync(command.UserId,30);

        // Build anomaly detection data
        var anomalyData= new AnomalyDetectionData
        {
            MerchantName         = command.CounterpartyName,
        Amount               = command.Amount,
        Type                 = command.Type,
        Nature               = command.Nature,
        TotalTransactions    = recentTransactions.Count,
        AverageAmount        = recentTransactions.Any()
            ? recentTransactions.Average(t => t.Amount) : 0,
        MaxAmount            = recentTransactions.Any()
            ? recentTransactions.Max(t => t.Amount) : 0,
        AverageAmountForType = recentTransactions
            .Where(t => t.Type.ToString() == command.Type)
            .Any()
                ? recentTransactions
                    .Where(t => t.Type.ToString() == command.Type)
                    .Average(t => t.Amount)
                : 0,
        MerchantSeenBefore   = recentTransactions
            .Any(t => t.CounterpartyName
                .Equals(command.CounterpartyName, StringComparison.OrdinalIgnoreCase)),
        };

         // Ai Categorization
         // Runs silently - returns others if fail
         var categoryTask=  _transactionAIService.CategorizeAsync(command.CounterpartyName,command.Amount);
         var descriptionTask= string.IsNullOrWhiteSpace(command.Description) ? _transactionAIService.GenerateDescriptionAsync(command.CounterpartyName,command.Amount,command.Type,command.Nature) : Task.FromResult(command.Description);
        var anomalyTask = _transactionAIService.DetectAnomalyAsync(anomalyData);

         await Task.WhenAll(categoryTask,descriptionTask,anomalyTask);

         var category = categoryTask.Result;
         var description = descriptionTask.Result; 
         var anomaly= anomalyTask.Result;

        Console.WriteLine($" AI Category: {command.CounterpartyName} → {category}");
        Console.WriteLine($" AI Description: {command.CounterpartyName} → {description}");
        Console.WriteLine($" AI Anomaly:     {command.CounterpartyName} → {anomaly.IsAnomaly} {anomaly.Reason}");

         var transaction = new Transaction
         {
            Id               = Guid.NewGuid(),
            UserId           = command.UserId,
            WalletId         = command.WalletId,
            ToWalletId       = command.ToWalletId,
            Amount           = command.Amount,
            Type             = type,
            Nature           = nature,
            Status           = TransactionStatus.Completed,
            CounterpartyName = command.CounterpartyName,
            CounterpartyLogo = command.CounterpartyLogo,
            Category         = category,              
            Description      = description,
            Date             = command.Date ?? DateTime.UtcNow,
            CreatedAt        = DateTime.UtcNow,
         };

         await _transactionRepo.AddAsync(transaction);
         await _transactionRepo.SaveChangesAsync();

         // Update wallet balance
         if(type == TransactionType.Income)
            wallet.Balance+=command.Amount;

        if(type == TransactionType.Expense)
            wallet.Balance -= command.Amount;

        await _walletRepo.UpdateAsync(wallet);
        await _walletRepo.SaveChangesAsync();

        return Result<CreateTransactionResponse>.Success(new CreateTransactionResponse
        {
            Id = transaction.Id,
             WalletId        = transaction.WalletId,
            Amount           = transaction.Amount,
            Type             = transaction.Type.ToString(),
            Nature           = transaction.Nature.ToString(),
            Category         = transaction.Category,
            CounterpartyName = transaction.CounterpartyName,
            Status           = transaction.Status.ToString(),
            Date             = transaction.Date,
            CreatedAt        = transaction.CreatedAt,
            Description= transaction.Description,
            IsAnomaly        = anomaly.IsAnomaly,       
            AnomalyReason    = anomaly.Reason,     
        });
    }
}
