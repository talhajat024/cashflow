import { MoreHorizontal } from "lucide-react";
import { Card, CardHeader, CardContent } from "../../../../../shared/ui";
import { TransactionRow } from "./TransactionRow";
import { styles } from "./LastTransaction.styles";
import type { WalletTransaction } from "../../../types/wallet.types";

type LastTransactionProps = {
  transactions: WalletTransaction[];
};

export function LastTransaction({ transactions }: LastTransactionProps) {
  return (
    <Card>
      <CardHeader className={styles.header()}>
        <h3 className={styles.title()}>Last Transaction</h3>
        <button className={styles.menuButton()}>
          <MoreHorizontal size={18} />
        </button>
      </CardHeader>

      <CardContent>
        <div className={styles.list()}>
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}