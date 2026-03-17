using CashFlow.Api.Application.AI;
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
    private readonly ICategorizationService _categorizationService;

    public CreateTransactionHandler(ITransactionRepository transactionRepo,IWalletRepository walletRepo,ICategorizationService categorizationService)
    {
        _transactionRepo=transactionRepo;
        _walletRepo= walletRepo;
        _categorizationService= categorizationService;
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
            return Result<CreateTransactionResponse>.Failure("Invalid transaction nature");

        if(!Enum.TryParse<TransactionNature>(command.Nature,out var nature))
            return Result<CreateTransactionResponse>.Failure("Invalid transaction nature");

         // Ai Categorization
         // Runs silently - returns others if fail
         var category= await _categorizationService.CategorizeAsync(command.CounterpartyName,command.Amount);

         Console.WriteLine($" AI Category: {command.CounterpartyName} → {category}");

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
            Description      = command.Description,
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
        });
    }
}
