namespace CashFlow.Api.Application.Common;

public class Result<T>
{
    public bool IsSuccess {get;}
    public bool IsFailure => !IsSuccess;
    public T? Value {get;}
    public string Error {get;}
    public int StatusCode {get;}

    // Private Constructor
    private Result(bool isSuccess,T? value,string error,int statusCode)
    {
        IsSuccess= isSuccess;
        Value= value;
        Error=error;
        StatusCode=statusCode;
    }

    // Fcatory Method
    public static Result<T> Success(T value)=>
    new(true,value,string.Empty,200);

    public static Result<T> Failure(string error,int statusCode=400)=>
    new(false,default,error,statusCode);

    public static Result<T> NotFound(string error)=>
    new(false,default,error,404);

    public static Result<T> Unauthorized(string error)=>
    new(false,default,error,401);

    public static Result<T> Conflict(string error)=>
    new(false,default,error,409);

}

// ── Non-generic Result (for operations that return no data) ──
public class Result
{
    public bool IsSuccess {get;}
    public bool IsFailure => !IsSuccess;
    public string Error {get;}
    public int StatusCode {get;}

    public Result(bool isSuccess,string error, int statusCode)
    {
        IsSuccess=isSuccess;
        Error=error;
        StatusCode=statusCode;
    }

    public static Result Success()=> 
    new(true,string.Empty,200);

    public static Result Failure(string error,int statusCode=400)=>
    new(false,error,statusCode);

    public static Result NotFound(string error)=>
    new(false,error,404);

    public static Result Unauthorized(string error)=>
    new(false,error,401);

    public static Result Conflict(string error)=>
    new(false,error,409);
    
}
