import { Card, CardContent } from "../../../../shared/ui";
import {
  table,
  headerRow,
  body,
  headerCellCenter,
  headerCellLeft,
} from "./RecentTransactions.styles";

import { TransactionRow } from "./TransactionsRow";
import type { Transaction } from "../../types/dashboard.types";

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className={table()}>
          {/* ===== Table Header ===== */}
          <div className={headerRow()}>
            <div className={headerCellLeft}>Company Name</div>
            <div className={headerCellCenter}>Type</div>
            <div className={headerCellCenter}>Date</div>
            <div className={headerCellCenter}>Amount</div>
            <div className={headerCellCenter}>Status</div>
          </div>

          {/* ===== Table Body ===== */}
          <div className={body()}>
            {transactions.map((tx) => (
             <TransactionRow
            key={`${tx.company}-${tx.date}`}
            icon={
             <img
               src={`/icons/${tx.iconKey}.svg`}
             alt={tx.company}
                />
            }
            company={tx.company}
            category={tx.category}
            type={tx.type}
            date={tx.date}
            amount={tx.amount}
            status={
              tx.status === "completed" ? "completed" : "incomplete"
            }
            />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
