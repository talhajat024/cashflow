import { DashboardSkeleton } from "./skeletons/DashboardSkeleton";

export interface PageSkeletonProps{
  layout?:'dashboard' | 'list' | 'details' | 'table';
}

export const PageSkeleton = ({layout='dashboard'}:PageSkeletonProps) => {
  switch(layout)
  {
    case 'dashboard':
      return <DashboardSkeleton />;

    case 'list':
      return <div>List Skeleton</div>;

    case 'details':
      return <div>Details Skeleton</div>;

    case 'table':
      return <div>Table Skeleton</div>;

    default:
      return <DashboardSkeleton />;
  }
};



