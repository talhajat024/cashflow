using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Infrastructure.Repositories;
using CashFlow.Api.Application.Interfaces;

namespace CashFlow.Api.Application.Services;

public class WalletService:IWalletService
{
    private readonly IWalletRepository _walletRepository;
    public WalletService(IWalletRepository walletRepository)
    {
        _walletRepository= walletRepository;
    }
    public async Task<decimal> GetTotalBalanceAsync(Guid userId)
    => await _walletRepository.GetTotalBalanceAsync(userId);

    public async Task<List<Wallet>> GetWalletsAsync(Guid userId)
    => await _walletRepository.GetByUserIdAsync(userId);
}
