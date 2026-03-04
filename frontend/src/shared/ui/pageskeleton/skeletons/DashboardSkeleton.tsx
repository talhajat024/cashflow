// shared/ui/page-skeleton/skeletons/DashboardSkeleton.tsx
import { styles } from "../PageSkeleton.styles";

// Stat Card Skeleton Component
const StatCardSkeleton = () => {
  return (
    <div className={styles.card()}>
      <div className="space-y-2">
        <div className={`${styles.h3()} w-1/2`} />
        <div className={`${styles.small()} w-2/3`} />
        <div className={`${styles.valueLarge()} w-3/4 mt-2`} />
        <div className={`${styles.small()} w-1/3`} />
      </div>
    </div>
  );
};

// Chart Skeleton Component
const ChartSkeleton = () => {
  return (
    <div className={styles.card()}>
      <div className={`${styles.h2()} w-1/3 mb-4`} />
      <div className={styles.chartLarge()} />
      
      {/* X-Axis Labels */}
      <div className="flex justify-between px-2 mt-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${styles.small()} w-8`} />
        ))}
      </div>
      
      {/* Legend */}
      <div className={`${styles.flex()} mt-4`}>
        {['Workspace', 'Salary', 'Shopping'].map((item, i) => (
          <div key={item} className={styles.flex()}>
            <div className={`w-3 h-3 rounded-full animate-pulse ${
              i === 0 ? 'bg-blue-200' : i === 1 ? 'bg-green-200' : 'bg-yellow-200'
            }`} />
            <div className={`${styles.small()} w-16`} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Spending Stats Skeleton Component
const SpendingStatsSkeleton = () => {
  return (
    <div className={styles.card()}>
      <div className={`${styles.h2()} w-1/3 mb-4`} />
      <div className="space-y-4">
        {['Weekly', 'Monthly', 'Yearly'].map((period) => (
          <div key={period}>
            <div className={`${styles.small()} w-16 mb-1`} />
            <div className={`${styles.value()} w-32`} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Transaction Card Skeleton Component
const TransactionCardSkeleton = ({ type }: { type: 'completed' | 'pending' }) => {
  const isCompleted = type === 'completed';
  
  return (
    <div className={styles.card()}>
      <div className="space-y-3">
        <div className={`${styles.h3()} ${isCompleted ? 'w-32' : 'w-36'}`} />
        <div className={`${styles.body()} ${isCompleted ? 'w-20' : 'w-24'}`} />
        <div className={`${styles.body()} w-28`} />
        <div className={`${styles.value()} w-24`} />
        <div className={isCompleted ? styles.badgeSuccess() : styles.badgeWarning() + " w-24"} />
      </div>
    </div>
  );
};

// Main Dashboard Skeleton
export const DashboardSkeleton = () => {
  return (
    <div className={styles.page()}>
      {/* Welcome Section */}
      <div className="space-y-2">
        <div className={`${styles.h1()} w-48`} />
        <div className={`${styles.h2()} w-64`} />
      </div>

      {/* Stats Cards Row */}
      <div className={styles.gridCols3()}>
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Balance Overview + All Spending Row */}
      <div className={styles.gridCols2()}>
        <ChartSkeleton />
        <SpendingStatsSkeleton />
      </div>

      {/* Figma + Spotify Row */}
      <div className={styles.gridCols2()}>
        <TransactionCardSkeleton type="completed" />
        <TransactionCardSkeleton type="pending" />
      </div>
    </div>
  );
};