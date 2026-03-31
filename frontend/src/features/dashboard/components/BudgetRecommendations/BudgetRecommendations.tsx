// features/dashboard/components/BudgetRecommendations/BudgetRecommendations.tsx
import { Sparkles, TrendingDown, TrendingUp, AlertCircle, Target, PiggyBank } from "lucide-react";
import type { BudgetRecommendations as BudgetRecommendationsType } from "../../types/report.types";
import {
  styles,
  cardIconBgColors,
} from "./BudgetRecommendations.styles";

type BudgetRecommendationsProps = {
  data: BudgetRecommendationsType;
};

const ICONS = [
  <PiggyBank size={18} />,
  <TrendingDown size={18} />,
  <AlertCircle size={18} />,
  <Target size={18} />,
  <TrendingUp size={18} />,
];

export function BudgetRecommendations({ data }: BudgetRecommendationsProps) {
  return (
    <div className={styles.card()}>

      {/* Header */}
      <div className={styles.header()}>
        <div className={styles.titleWrapper()}>
          <Sparkles size={16} className="text-blue-500" />
          <h4 className={styles.titleText()}>Budget Recommendations</h4>
        </div>
        <span className={styles.smartBadge()}>Smart Insights</span>
      </div>

      {/* Summary Row */}
      <div className={styles.summaryRow()}>
        <span>Potential monthly savings:</span>
        <span className={styles.savingsAmount()}>
          +${data.potentialSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
        <span>•</span>
        <span>{data.overallInsight}</span>
      </div>

      {/* Recommendations Cards Grid */}
      <div className={styles.cardsGrid()}>
        {data.recommendations.slice(0, 3).map((rec, index) => (
          <div key={index} className={styles.recCard()}>

            {/* Icon */}
            <div className={`${styles.recIcon()} ${cardIconBgColors[index % cardIconBgColors.length]}`}>
              {ICONS[index % ICONS.length]}
            </div>

            {/* Title */}
            <div className={styles.recTitle()}>
              {rec.category} Budget
            </div>

            {/* Description */}
            <p className={styles.recDescription()}>
              Current avg ${rec.currentAvg.toLocaleString("en-US", { minimumFractionDigits: 0 })}/month
              {" → "}Suggested ${rec.suggestedBudget.toLocaleString("en-US", { minimumFractionDigits: 0 })}/month.
              {" "}{rec.reasoning}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}