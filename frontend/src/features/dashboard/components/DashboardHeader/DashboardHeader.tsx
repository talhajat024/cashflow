import { TopBar } from './TopBar/TopBar';
import { WelcomeSection } from './WelcomeSection/WelcomeSection';
import { HeaderTabs } from './HeaderTabs/HeaderTabs';
import { useLocation } from 'react-router-dom';

type DashboardHeaderProps={
  scrolled?:boolean;
}

export const DashboardHeader = ({scrolled}:DashboardHeaderProps) => {
  const location= useLocation();
  return (
    <header className={`
        sticky top-0 z-50 bg-primary
        transition-shadow duration-200
        ${scrolled ? "shadow-lg shadow-black/10" : ""}
      `}>
      <div className="mx-auto max-w-[1200px] px-8 pb-4 w-full">
        <TopBar />
        <div className="pt-3 flex items-center justify-between">
          <WelcomeSection />
          {location.pathname.startsWith('/dashboard') && <HeaderTabs />}
        </div>
      </div>
    </header>
  );
}