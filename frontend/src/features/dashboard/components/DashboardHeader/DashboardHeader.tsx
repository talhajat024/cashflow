import { TopBar } from './TopBar';
import { WelcomeSection } from './WelcomeSection';
import { HeaderTabs } from './HeaderTabs';

type DashboardHeaderProps={
  scrolled:boolean;
}

export const DashboardHeader = ({scrolled}:DashboardHeaderProps) => {
  return (
    <header className={`
        sticky top-0 z-50 bg-primary
        transition-shadow duration-200
        ${scrolled ? "shadow-lg shadow-black/10" : ""}
      `}>
      <div className="mx-auto max-w-[1200px] px-8 pb-4">
        <TopBar />
        <div className="pt-3 flex items-center justify-between">
          <WelcomeSection />
          <HeaderTabs />
        </div>
      </div>
    </header>
  );
}