import {
  row,
  cellLeft,
  cellCenter,
  company,
  iconWrapper,
  companyName,
  companySub,
  amount,
  badgeCompleted,
  badgeIncomplete,
} from "./TransactionsRow.styles";

type TransactionStatus = "completed" | "incomplete";

type TransactionRowProps = {
  icon: React.ReactNode;
  company: string;
  category: string;
  type: string;
  date: string; // ISO
  amount: number;
  status: TransactionStatus;
};

export function TransactionRow({
  icon,
  company: companyLabel,
  category,
  type,
  date,
  amount: value,
  status,
}: TransactionRowProps) {
  const formattedDate = new Date(date).toLocaleDateString();
  const formattedAmount = `$${value.toFixed(2)}`;

  return (
    <div className={row()}>
      <div className={cellLeft()}>
        <div className={company()}>
          <div className={iconWrapper()}>{icon}</div>

          <div>
            <div className={companyName()}>{companyLabel}</div>
            <div className={companySub()}>{category}</div>
          </div>
        </div>
      </div>

      <div className={cellCenter()}>{type}</div>
      <div className={cellCenter()}>{formattedDate}</div>

      <div className={cellCenter()}>
        <span className={amount()}>{formattedAmount}</span>
      </div>

      <div className={cellCenter()}>
        <span
          className={
            status === "completed"
              ? badgeCompleted()
              : badgeIncomplete()
          }
        >
          {status === "completed" ? "Completed" : "Incomplete"}
        </span>
      </div>
    </div>
  );
}
