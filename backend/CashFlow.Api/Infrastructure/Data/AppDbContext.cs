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
    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Invoice> Invoices => Set<Invoice>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // User
        modelBuilder.Entity<User>(entity=>
        {
            entity.HasKey(u=> u.Id);
            entity.HasIndex(u=> u.Email).IsUnique();
            entity.Property(u=> u.Email).IsRequired().HasMaxLength(256);
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
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

            // Card Details
            entity.Property(w=> w.CardNumber)
            .HasMaxLength(50);

            entity.Property(w=> w.ExpireDate)
            .HasMaxLength(10);

            entity.Property(w=> w.Cvc)
            .HasMaxLength(10);

            entity.Property(w=> w.CardStatus)
            .HasMaxLength(20)
            .HasDefaultValue("Active");

            // Card Limit
            entity.Property(w=> w.CreditLimit)
            .HasColumnType("decimal(18,2)");

            entity.Property(w=> w.UsedLimit)
            .HasColumnType("decimal(18,2)");

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

            modelBuilder.Entity<Client>(entity =>
    {
        entity.HasKey(c => c.Id);
        
        entity.Property(c => c.Name)
            .IsRequired()
            .HasMaxLength(200);
            
        entity.Property(c => c.Email)
            .IsRequired()
            .HasMaxLength(256);
            
        entity.Property(c => c.Company)
            .HasMaxLength(200);
            
        entity.Property(c => c.Phone)
            .HasMaxLength(50);
            
        entity.Property(c => c.Address)
            .HasMaxLength(500);
            
        entity.Property(c => c.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");
            
        // Relationship with User - now Guid matches
        entity.HasOne(c => c.User)
            .WithMany()
            .HasForeignKey(c => c.UserId)
            .OnDelete(DeleteBehavior.Cascade);
            
        // Indexes
        entity.HasIndex(c => new { c.UserId, c.Email }).IsUnique();
        entity.HasIndex(c => c.UserId);
    });

       // Invoice configuration
    modelBuilder.Entity<Invoice>(entity =>
    {
        entity.HasKey(i => i.Id);
        
        entity.Property(i => i.InvoiceNumber)
            .IsRequired()
            .HasMaxLength(50);
            
        entity.Property(i => i.Amount)
            .HasColumnType("decimal(18,2)");
            
        entity.Property(i => i.Status)
            .HasConversion<int>()
            .HasDefaultValue(InvoiceStatus.Draft);
            
        entity.Property(i => i.Description)
            .HasMaxLength(500);
            
        entity.Property(i => i.PdfUrl)
            .HasMaxLength(500);
            
        entity.Property(i => i.CreatedAt)
            .HasDefaultValueSql("GETUTCDATE()");
            
        // Relationship with Client
        entity.HasOne(i => i.Client)
            .WithMany(c => c.Invoices)
            .HasForeignKey(i => i.ClientId)
            .OnDelete(DeleteBehavior.Restrict);
            
        // Relationship with Transaction - ensure type matches
        entity.HasOne(i => i.Transaction)
            .WithMany()
            .HasForeignKey(i => i.TransactionId)
            .OnDelete(DeleteBehavior.SetNull);
            
        // Indexes
        entity.HasIndex(i => new { i.ClientId, i.Status });
        entity.HasIndex(i => i.InvoiceNumber).IsUnique();
        entity.HasIndex(i => i.DueDate);
    });
    }
}
