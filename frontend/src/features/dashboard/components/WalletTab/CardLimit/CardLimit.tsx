import { Card,CardHeader,CardContent } from "../../../../../shared/ui";
import { styles } from "./CardLimit.styles";
import type { CardLimit as CardLimitType, LimitPeriod } from "../../../types/wallet.types";

const PROGRESS_COLORS = ["#3B82F6", "#F87171", "#22D3EE"];
// const PROGRESS_WIDTHS = [65, 20, 15]; 

type CardLimitProps={
    limit:CardLimitType;
    period:LimitPeriod,
    onPeriodChange:(period:LimitPeriod)=> void;
}

const PERIOD_OPTIONS: LimitPeriod[] = ["Monthly", "Weekly", "Yearly"];

export function CardLimit({limit,period,onPeriodChange}:CardLimitProps){
    const usedPercent=(limit.used/limit.total) * 100;
    const remainPercent=100-usedPercent;
    
    return(
        <Card>
            <CardHeader className={styles.header()}>
                <h3 className={styles.title()}>Card Limit</h3>
                {/* Period Selector */}
                <select value={period} onChange={(e)=> onPeriodChange(e.target.value as LimitPeriod)} className="text-[13px] font-medium text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5 outline-none cursor-pointer bg-white">
                    {PERIOD_OPTIONS.map((p)=>(
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </CardHeader>

            <CardContent>
              <div className={styles.contentBox()}>
        <div className={styles.amountRow()}>
          <span className={styles.usedAmount()}>
            ${limit.used.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className={styles.totalLabel()}>
            Used from ${limit.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>

        
        <div className={styles.progressWrapper()}>
          
          <div
            className={styles.progressBar()}
            style={{
              width:           `${usedPercent}%`,
              backgroundColor: PROGRESS_COLORS[0],
              maxWidth:      "65%",
            }}
          />
          
          <div
            className={styles.progressBar()}
            style={{
              width:           `${remainPercent * 0.55}%`,
              backgroundColor: PROGRESS_COLORS[1],
              maxWidth:"20%",
            }}
          />
         
          <div
            className={styles.progressBar()}
            style={{
              width:           `${remainPercent * 0.45}%`,
              backgroundColor: PROGRESS_COLORS[2],
              maxWidth:      "15%",
            }}
          />
        </div>
         </div>
      </CardContent>
        </Card>
    )
}

