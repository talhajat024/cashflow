using CashFlow.Api.Application.Common;
using MediatR;

namespace CashFlow.Api.Application.Wallets.Queries.GetWalletTab;

public record GetWalletTabQuery(Guid UserId,Guid? WalletId):IRequest<Result<GetWalletTabResponse>>;
