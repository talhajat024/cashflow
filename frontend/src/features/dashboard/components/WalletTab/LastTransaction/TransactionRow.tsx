import { transactionRow } from "./TransactionRow.styles";
import type { WalletTransaction } from "../../../types/wallet.types";

type TransactionRowProps={
    transaction:WalletTransaction;
}

export function TransactionRow({transaction}:TransactionRowProps){
    const s= transactionRow({status:transaction.status});
    return(
        <div className={s.container()}>
       
        <div className={s.logoWrapper()}>
          {transaction.logo ? (
            <img
              src={transaction.logo}
              alt={transaction.company}
              className={s.logo()}
            />
          ) : (
            <span className={s.logoFallback()}>
              {transaction.company.charAt(0)}
            </span>
          )}
        </div>

        <div className={s.info()}>
          <span className={s.company()}>{transaction.company}</span>
          <span className={s.category()}>{transaction.category}</span>
        </div>
      

      <span className={s.type()}>{transaction.type}</span>

      
        <span className={s.amount()}>
          ${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
        <span className={s.statusBadge()}>{transaction.status.toUpperCase()}</span>
    
    </div>
    )
}

