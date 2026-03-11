
import { MoreHorizontal } from "lucide-react";
import { Card,CardContent,CardHeader } from "../../../../../shared/ui";
import { BalanceChart } from "./BalanceChart";
import { styles } from "./BalanceStatistics.styles";
import type { BalanceStatistics as BalanceStatisticsType  } from "../../../types/wallet.types";

type BalanceStatisticsProps={
    statistics:BalanceStatisticsType;
}

export function BalanceStatistics({statistics}:BalanceStatisticsProps){
    return(
        <Card>
            <CardHeader className={styles.header()}>
                <h3 className={styles.title()}>Balance Statistics</h3>
                <button className={styles.menuButton()}>
                    <MoreHorizontal size={18}/>
                </button>
            </CardHeader>

            <CardContent>
        <div className={styles.chartWrapper()}>
          <BalanceChart
            data={statistics.data}
            activeMonth={statistics.activeMonth}
            activeAmount={statistics.activeAmount}
            changePercent={statistics.changePercent}
            isPositive={statistics.isPositive}
          />
        </div>
      </CardContent>
        </Card>
    )
}