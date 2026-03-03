using CashFlow.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;
namespace CashFlow.Api.Infrastructure.Data;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options){ }
    public DbSet<User> Users=> Set<User>();
    public DbSet<RefreshToken> RefreshTokens=> Set<RefreshToken>();

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
    }
}
