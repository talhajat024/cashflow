using System.Text;
using CashFlow.Api.Application.Interfaces;
using CashFlow.Api.Application.Services;
using CashFlow.Api.Infrastructure.Data;
using CashFlow.Api.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<AppDbContext>(options=> options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Auth service
builder.Services.AddScoped<IUserRepository,UserRepository>();
builder.Services.AddScoped<IAuthService,AuthService>();
builder.Services.AddScoped<ITokenService,TokenService>();

// Jwt Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters= new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!))
    };

    // Read JWT from HttpOnly cookie instead of Authorization header
    options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["accessToken"];
                return Task.CompletedTask;
            }
        };
});

builder.Services.AddAuthorization();

// Cors
builder.Services.AddCors(options=>
{
    options.AddPolicy("AllowFrontend",policy=>
    {
        policy
        .WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials(); // required for cookies
    });
});

// DI
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();


builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
     app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await DatabaseSeeder.SeedAsync(context);
}

app.Run();
