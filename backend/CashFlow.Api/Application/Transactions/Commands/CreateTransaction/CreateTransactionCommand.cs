using CashFlow.Api.Application.Common;
using MediatR;

namespace CashFlow.Api.Application.Transactions.Commands.CreateTransaction;

public record CreateTransactionCommand(Guid UserId,Guid WalletId,Guid? ToWalletId,decimal Amount,string Type,string Nature,string CounterpartyName,string? CounterpartyLogo,string? Description,DateTime? Date):IRequest<Result<CreateTransactionResponse>>;
