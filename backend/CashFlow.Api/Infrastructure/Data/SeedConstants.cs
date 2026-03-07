namespace CashFlow.Api.Infrastructure.Data;

public static class SeedConstants
{
    // User
    public static readonly Guid TestUserId = 
    Guid.Parse("11111111-1111-1111-1111-111111111111");

    // Wallets
    public static readonly Guid MainWalletId=
     Guid.Parse("22222222-2222-2222-2222-222222222222");

    public static readonly Guid SavingsWalletId = 
        Guid.Parse("33333333-3333-3333-3333-333333333333");

    public static readonly Guid CashWalletId = 
        Guid.Parse("44444444-4444-4444-4444-444444444444");

}
