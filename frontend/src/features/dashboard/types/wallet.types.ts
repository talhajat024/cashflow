export type Wallet={
    id:string;
    name:string; // "Talha Muzzamil"
    number:string; // "**** **** **** 7256"
    balance:number;
    currency:string;
    isDefault:boolean;
}

export type CardStatus = "Active" | "Inactive" | "Blocked";

export type CardDetails={
    number:string;
    expireDate:string;
    cvc:string;
    status:CardStatus;
}

export type LimitPeriod = "Monthly" | "Weekly" | "Yearly";

export type CardLimit= {
    used:number;
    total:number;
    currency:string;
    period:LimitPeriod;
};

export type BalanceStatPoint = {
  month: string;          // "Jan", "Feb"
  amount: number;
};

export type BalanceStatistics={
    data:BalanceStatPoint[];
    activeMonth:string;
    activeAmount:number;
    changePercent:number;
    isPositive:boolean;    
}

export type WalletTransactionStaus="Success" | "Pending" | "Failed";

export type WalletTransaction={
    id:string;
    company:string;
    category:string;
    type:string;
    amount:number;
    status:WalletTransactionStaus;
    logo?:string;
}

export type WalletTabData={
    wallets:Wallet[];
    selectedWallet:{
        details:CardDetails;
        limit:CardLimit;
        statistics:BalanceStatistics;
        lastTransaction:WalletTransaction[];
    }
}

