using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CashFlow.Api.Domain.Entities;

public class User
{
    public Guid Id {get;set;}=Guid.NewGuid();

    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string Email {get;set;}=string.Empty;

    [Required]
    public string PasswordHash {get;set;}=string.Empty;
    public string Role {get;set;}= "user";

    // Additional Profile fields for profile page
    public string? Avatar {get;set;}
    public string? PhoneNumber {get;set;}
    public string? City {get;set;}
    public string? State {get;set;}
    public string? ZipCode {get;set;}
    public string? Country {get;set;}
    public string? FullAddress {get;set;}

    // Payment Preferences
    public string? Currency {get;set;}
    public string? DefaultPaymentMethod {get;set;}
    public bool AllowApplePay {get;set;}
    public bool AllowGooglePay {get;set;}


    // Timestamp
    public DateTime CreatedAt {get;set;}=DateTime.UtcNow;
    public DateTime? LastLogin {get;set;}
    public DateTime? UpdatedAt {get;set;}

    // Computed properties (not stored in DB)
    [NotMapped]
    public string FullName => $"{FirstName} {LastName}".Trim();
    
    [NotMapped]
    public string DisplayName => string.IsNullOrEmpty(FullName) ? Email : FullName;

    // Navigation properties
    public virtual ICollection<RefreshToken> RefreshTokens {get;set;} = new List<RefreshToken>();
    public virtual ICollection<Wallet> Wallets {get;set;}=new List<Wallet>();
    public virtual ICollection<Invoice> Invoices {get;set;} = new List<Invoice>();
    public virtual ICollection<Client> Clients {get;set;} = new List<Client>();
    public virtual ICollection<Transaction> Transactions {get;set;}= new List<Transaction>();
    
}
