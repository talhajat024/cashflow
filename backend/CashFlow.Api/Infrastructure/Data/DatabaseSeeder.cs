using CashFlow.Api.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CashFlow.Api.Infrastructure.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if(await context.Users.AnyAsync()) return;
        var testUser= new User
        {
            Id=Guid.NewGuid(),
            Name="Test User",
            Email="test@cashflow.com",
            PasswordHash=BCrypt.Net.BCrypt.HashPassword("Test@123"),
            Role="User",
            CreatedAt=DateTime.UtcNow,
        };

        await context.Users.AddAsync(testUser);
        await context.SaveChangesAsync();

        Console.WriteLine(" Test user seeded successfully");
        Console.WriteLine($"Email: test@cashflow.com");
        Console.WriteLine($"Password: Test@123");
    }


}
