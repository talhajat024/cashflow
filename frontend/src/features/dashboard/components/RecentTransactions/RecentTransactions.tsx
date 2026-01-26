import { Card,CardContent } from "../../../../shared/ui";
import { table,headerRow,body,headerCellCenter,headerCellLeft } from "./RecentTransactions.styles";
import { TransactionRow } from "./TransactionsRow";

// Import Transaction row

export function RecentTransactions(){
    return(
        <Card>
            <CardContent className="p-0">
                <div className={table()}>
                    {/* Table Header */}
                    <div className={headerRow()}>
                        <div className={headerCellLeft}>Company Name</div>
                        <div className={headerCellCenter}>Type</div>
                        <div className={headerCellCenter}>Date</div>
                        <div className={headerCellCenter}>Amount</div>
                        <div className={headerCellCenter}>Employee Status</div>
                    </div>

                    <div className={body()}>
                        <TransactionRow
                        icon={<img src="/icons/figma.svg" alt="Figma"/>}
                        company="Figma"
                        category="Application"
                        type="Subscription"
                        date="July 11.07.2023"
                        amount="$624.00.90"
                        status="completed"/>

                        <TransactionRow
                        icon={<img src="/icons/spotify.svg" alt="Spotify"/>}
                        company="Spotify"
                        category="Entertainment"
                        type="Receive"
                        date="July 12.07.2023"
                        amount="$624.00.90"
                        status="incomplete"/>
                    </div>
                    </div>    
            </CardContent>
        </Card>
    )
}