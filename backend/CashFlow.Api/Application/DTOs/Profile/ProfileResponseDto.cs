using System;

namespace CashFlow.Api.Application.DTOs.Profile;

public class ProfileResponseDto
{
    public string Id {get;set;} = string.Empty;
    public string Email {get;set;} = string.Empty;
    public string FirstName {get;set;} = string.Empty;
    public string LastName {get;set;}=string.Empty;
    public string? PhoneNumber {get;set;}
    public string? City {get;set;}
    public string? State {get;set;} 
    public string? ZipCode {get;set;}
    public string? Country {get;set;}
    public string? FullAddress {get;set;}
    public string? AvatarUrl {get;set;}
    public string? Role {get;set;}
    public DateTime CreatedAt {get;set;}
    public DateTime? UpdatedAt {get;set;}

}

public class UpdateProfileRequestDto
{
    public string FirstName {get;set;} = string.Empty;
    public string LastName {get;set;}=string.Empty;
    public string? PhoneNumber {get;set;}
    public string? City {get;set;}
    public string? State {get;set;}
    public string? ZipCode {get;set;}
    public string? Country {get;set;}
    public string? FullAddress {get;set;}
}

public class ChangePasswordRequestDto
{
    public string CurrentPassword {get;set;}=string.Empty;
    public string NewPassword {get;set;}=string.Empty;
    public string ConfirmPassword {get;set;}=string.Empty;
}

public class UpdatePaymentMethodRequestDto
{
    public string Currency {get;set;}="USD";
    public string PaymentMethod {get;set;}= string.Empty;
    public bool AllowApplePay {get;set;}
    public bool AllowGooglePay {get;set;}
}
