namespace CashFlow.Api.Application.Interfaces;

public interface ITransactionAIService
{
    Task<string> CategorizeAsync(string merchantName, decimal amount);
    Task<string> GenerateDescriptionAsync(string merchantName,decimal amount,string type,string nature);
    Task<AnomalyResult> DetectAnomalyAsync(AnomalyDetectionData data);
}


public class AnomalyDetectionData
{
    public string MerchantName {get;set;}=string.Empty;
    public decimal Amount {get;set;}
    public string Type {get;set;} = string.Empty;
    public string Nature {get;set;} = string.Empty;

    // user history context
    public decimal AverageAmount {get;set;}
    public decimal MaxAmount {get;set;}
    public decimal AverageAmountForType {get;set;}
    public bool MerchantSeenBefore {get;set;}
    public int TotalTransactions {get;set;}
}

public class AnomalyResult
{
    public bool IsAnomaly {get;set;}
    public string Reason {get;set;} = string.Empty;
}
