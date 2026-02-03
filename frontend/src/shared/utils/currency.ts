export function getCurrencySymbol(code:string):string{
    switch(code.toUpperCase())
    {
        case "USD":
            return "$";
        case "EUR":
            return "€";
        case "GBP":
            return "£";
        case "INR":
            return "₹";
        case "JPY":
            return "¥";
        default:
            return code; // fallback: show "USD", "EUR", etc.
    }
}