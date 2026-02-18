// shared/ui/page-skeleton/PageSkeleton.tsx
import { styles } from "./PageSkeleton.styles";

interface PageSkeletonProps {
  layout?: 'dashboard' | 'list' | 'details' | 'table';
}

const Shimmer = () => <div className={styles.shimmer()} />;

export const PageSkeleton = ({ layout = 'dashboard' }: PageSkeletonProps) => {
  if (layout === 'dashboard') {
    return (
      <div className={styles.wrapper()}>
        {/* Stats Cards - Each looks like a real card */}
        <div className={styles.statsSection()}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.statCard()}>
              <div className="space-y-2">
                {/* Label */}
                <div className="relative">
                  <div className={styles.box({ size: "xs", width: "half" })} />
                  <Shimmer />
                </div>
                {/* Value */}
                <div className="relative">
                  <div className={styles.box({ size: "lg", width: "full" })} />
                  <Shimmer />
                </div>
                {/* Change indicator */}
                <div className="relative">
                  <div className={styles.box({ size: "xs", width: "third" })} />
                  <Shimmer />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section - Card style */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          {/* Chart Title */}
          <div className="relative mb-4">
            <div className={styles.box({ size: "lg", width: "quarter" })} />
            <Shimmer />
          </div>
          {/* Chart Area */}
          <div className="relative">
            <div className={styles.box({ size: "chart" })} />
            <Shimmer />
          </div>
        </div>

        {/* Two Column Section */}
        <div className={styles.twoColSection()}>
          {/* All Spending */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="relative mb-4">
              <div className={styles.box({ size: "lg", width: "quarter" })} />
              <Shimmer />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="relative w-1/2">
                      <div className={styles.box({ size: "sm", width: "half" })} />
                      <Shimmer />
                    </div>
                    <div className="relative w-1/4">
                      <div className={styles.box({ size: "sm", width: "full" })} />
                      <Shimmer />
                    </div>
                  </div>
                  <div className="relative">
                    <div className={styles.box({ size: "xs", width: "full" })} />
                    <Shimmer />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <div className="relative mb-4">
              <div className={styles.box({ size: "lg", width: "quarter" })} />
              <Shimmer />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1 w-1/2">
                    <div className="relative">
                      <div className={styles.box({ size: "sm", width: "half" })} />
                      <Shimmer />
                    </div>
                    <div className="relative">
                      <div className={styles.box({ size: "xs", width: "third" })} />
                      <Shimmer />
                    </div>
                  </div>
                  <div className="relative w-1/4">
                    <div className={styles.box({ size: "md", width: "full" })} />
                    <Shimmer />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className={styles.wrapper()}>
        {/* Header */}
        <div className="relative mb-4">
          <div className={styles.box({ size: "xl", width: "quarter" })} />
          <Shimmer />
        </div>
        
        {/* List items */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-100 rounded-full" />
                  <Shimmer />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="relative w-1/3">
                    <div className={styles.box({ size: "md" })} />
                    <Shimmer />
                  </div>
                  <div className="relative w-1/2">
                    <div className={styles.box({ size: "xs" })} />
                    <Shimmer />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};