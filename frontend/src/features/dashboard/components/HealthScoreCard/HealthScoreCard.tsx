import { HeartPulse,Sparkles } from "lucide-react";
import type { HealthScore } from "../../types/report.types";
import { styles,gradeColors,progressColors } from "./HealthScoreCard.styles";

type HealthScoreCardProps={
    data:HealthScore;
}

const BREAKDOWN_LABELS :Record<string,string>={
    savingsRate :"Savings Rate",
    incomeStability:"Income Stability",
    spendingControl:"Spending Control",
    balanceGrowth:"Balance Growth",
}

const GRADE_LABELS:Record<string,string>={
    A:'Excellent',
    B:"Good",
    C:"Fair",
    D:"Poor",
    F:"Critical"
};

export function HealthScoreCard({data}:HealthScoreCardProps){

    const breakdownItems= [
        {key:"savingsRate",value:data.breakdown.savingsRate},
        {key:"incomeStability",value:data.breakdown.incomeStability},
        {key:"spendingControl",value:data.breakdown.spendingControl},
        {key:"balanceGrwoth",value:data.breakdown.balanceGrowth},
    ];

    return(
        <div className={styles.card()}>
            {/* Header */}
            <div className={styles.header()}>
                <div className={styles.titleWrapper()}>
                    <div className={styles.titleIcon()}>
                        <HeartPulse size={18}/>
                    </div>
                    <h4 className={styles.titleText()}>Financial Health Score</h4>
                </div>

                <span className={`${styles.gradeBadge()} ${gradeColors[data.grade] ?? gradeColors.B}`}>
                  {GRADE_LABELS[data.grade] ?? "Good"}
                </span>
            </div>

            {/* Score */}
            <div className={styles.scoreRow()}>
                <span className={styles.scoreValue()}>{data.score}</span>
                <span className={styles.scoreMax()}>/100</span>
            </div>

            {/* Progress Bar */}
            <div className={styles.progressTrack()}>
                <div
                className={`${styles.progressFill()} ${progressColors[data.grade] ?? progressColors.B}`}
                style={{ width: `${data.score}%` }}/>
            </div>

            <div className={styles.progressLabels()}>
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>

            {/* AI Analysis */}
            <div className={styles.aiAnalysis()}>
                <Sparkles size={12} className="text-blue-400"/>
                <span>AI Analysis:{data.summary}</span>
            </div>

            <div className={styles.breakdownGrid()}>
                {breakdownItems.map((item)=>(
                    <div key={item.key} className={styles.breakdownItem()}>
                        <span className={styles.breakdownLabel()}>
                            {BREAKDOWN_LABELS[item.key]}
                        </span>
                        <span className={styles.breakdownValue()}>{item.value}/100</span>
                    </div>
                ))}
            </div>

            {/* Strengths */}
            <div className={styles.listSection()}>
                {data.strengths.map((s,i)=>(
                    <div key={i} className={styles.listItem()}>
                        <span className={styles.strengthDot()}/>
                        {s}
                    </div>
                ))}

                {/* Improvements */}
                {data.improvements.map((s,i)=>(
                    <div key={i} className={styles.listItem()}>
                        <span className={styles.improvementDot()}/>
                        {s}
                    </div>
                ))}
            </div>
        </div>
    );
}