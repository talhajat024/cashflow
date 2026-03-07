using CashFlow.Api.Domain.Entities;
using CashFlow.Api.Domain.Enums;
using Microsoft.EntityFrameworkCore;
namespace CashFlow.Api.Infrastructure.Data;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options){ }
    public DbSet<User> Users=> Set<User>();
    public DbSet<RefreshToken> RefreshTokens=> Set<RefreshToken>();
    public DbSet<Wallet> Wallets=> Set<Wallet>();
    public DbSet<Transaction> Transactions=> Set<Transaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // User
        modelBuilder.Entity<User>(entity=>
        {
            entity.HasKey(u=> u.Id);
            entity.HasIndex(u=> u.Email).IsUnique();
            entity.Property(u=> u.Email).IsRequired().HasMaxLength(256);
            entity.Property(u=> u.Name).IsRequired().HasMaxLength(100);
            entity.Property(u=> u.PasswordHash).IsRequired();
            entity.Property(u=> u.Role).HasDefaultValue("user");
        });

        // Refresh Token
        modelBuilder.Entity<RefreshToken>(entity=>
        {
            entity.HasKey(rt=> rt.Id);
            entity.HasIndex(rt=> rt.Token).IsUnique();
            entity.HasOne(rt=> rt.User)
            .WithMany(u=> u.RefreshTokens)
            .HasForeignKey(rt=> rt.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        });

        // Wallet
        modelBuilder.Entity<Wallet>(entity =>
        {
            entity.HasKey(w=> w.Id);
            entity.Property(w=> w.Balance)
            .HasColumnType("decimal(18,2)");
            entity.Property(w=> w.Name)
            .IsRequired()
            .HasMaxLength(100);
            entity.Property(w=> w.Currency)
            .HasDefaultValue("USD")
            .HasMaxLength(10);
            entity.HasOne(w=> w.User)
            .WithMany()
            .HasForeignKey(w=> w.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        });

        // Transaction
        modelBuilder.Entity<Transaction>(entity =>
        {
            entity.HasKey(t=> t.Id);

            // Amount
            entity.Property(t=> t.Amount)
            .HasColumnType("decimal(18,2)");

            // enums stored as string
            entity.Property(t=> t.Type)
            .HasConversion<string>()
            .HasMaxLength(20);

            entity.Property(t=> t.Nature)
            .HasConversion<string>()
            .HasMaxLength(30);

            entity.Property(t=> t.Status)
            .HasConversion<string>()
            .HasMaxLength(20);
            
            // Counterparty
            entity.Property(t=> t.CounterpartyName)
            .IsRequired()
            .HasMaxLength(100);

            entity.Property(t=> t.CounterpartyLogo)
            .HasMaxLength(500)
            .IsRequired(false);

            // Category
            entity.Property(t=> t.Category)
            .IsRequired()
            .HasMaxLength(100);

            // Description
            entity.Property(t=> t.Description)
            .HasMaxLength(500)
            .IsRequired(false);

            // Dates
            entity.Property(t=> t.Date)
            .IsRequired();

            entity.Property(t=> t.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");

            // Relationship

            // Transaction -> source wallet
            entity.HasOne(t=> t.Wallet)
            .WithMany(w=> w.Transactions)
            .HasForeignKey(t=> t.WalletId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false);

            // Transaction - destination wallet (transfer only)
            entity.HasOne(t=> t.ToWallet)
            .WithMany()
            .HasForeignKey(t=> t.ToWalletId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired(false);

            // Transaction -> User (for fast queries)
            entity.HasOne(t=> t.User)
            .WithMany()
            .HasForeignKey(t=> t.UserId)
            .OnDelete(DeleteBehavior.NoAction);

            // Indexes
            entity.HasIndex(t=> new {t.UserId,t.Date});
            entity.HasIndex(t=> new {t.UserId,t.Type});
            entity.HasIndex(t=> new {t.UserId,t.Status});

        });
    }
}
