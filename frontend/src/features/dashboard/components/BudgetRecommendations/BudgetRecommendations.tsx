// features/dashboard/components/BudgetRecommendations/BudgetRecommendations.tsx
import { Sparkles, TrendingDown, TrendingUp, AlertCircle, Target, PiggyBank } from "lucide-react";
import type { BudgetRecommendations as BudgetRecommendationsType } from "../../types/report.types";
import {
  styles,
  priorityColors,
  priorityLabels,
  iconBgColors,
} from "./BudgetRecommendations.styles";

type BudgetRecommendationsProps = {
  data: BudgetRecommendationsType;
};

//  Icon per index 
const ICONS = [
  <PiggyBank size={16} />,
  <TrendingDown size={16} />,
  <AlertCircle size={16} />,
  <Target size={16} />,
  <TrendingUp size={16} />,
];

export function BudgetRecommendations({ data }: BudgetRecommendationsProps) {
  return (
    <div className={styles.card()}>

      {/*  Header  */}
      <div className={styles.header()}>
        <div className={styles.titleWrapper()}>
          <Sparkles size={18} className="text-blue-500" />
          <h4 className={styles.titleText()}>AI Budget Recommendations</h4>
        </div>
        <span className={styles.smartBadge()}>Smart Insights</span>
      </div>

      {/*  Potential Savings Summary  */}
      <div className={styles.summaryRow()}>
        <span>Potential monthly savings:</span>
        <span className={styles.savingsAmount()}>
          +${data.potentialSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
        <span>•</span>
        <span>{data.overallInsight}</span>
      </div>

      {/*  Recommendations List  */}
      <div className={styles.list()}>
        {data.recommendations.map((rec, index) => (
          <div key={index} className={styles.item()}>

            {/* Icon */}
            <div className={`${styles.itemIcon()} ${iconBgColors[index % iconBgColors.length]}`}>
              {ICONS[index % ICONS.length]}
            </div>

            {/* Content */}
            <div className={styles.itemContent()}>
              <div className={styles.itemHeader()}>
                <span className={styles.itemTitle()}>
                  {rec.category} Budget
                </span>
                <span className={`${styles.priorityBadge()} ${priorityColors[rec.priority] ?? priorityColors.Medium}`}>
                  {priorityLabels[rec.priority] ?? rec.priority}
                </span>
              </div>
              <p className={styles.itemDescription()}>
                Current avg ${rec.currentAvg.toLocaleString("en-US", { minimumFractionDigits: 0 })}/month
                → Suggested ${rec.suggestedBudget.toLocaleString("en-US", { minimumFractionDigits: 0 })}/month.
                {" "}{rec.reasoning}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}