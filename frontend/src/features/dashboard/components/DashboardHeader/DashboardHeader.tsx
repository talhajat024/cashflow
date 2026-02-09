import {TopBar} from './TopBar';
import {WelcomeSection} from './WelcomeSection';
import {HeaderTabs} from './HeaderTabs';

export const DashboardHeader = ()=>{

    return(
      <header className="sticky top-0 z-50 bg-primary">
      <div className="mx-auto max-w-[1200px] px-8 pb-12">
        <TopBar />
        <div className="pt-3 flex items-center justify-between">
          <WelcomeSection />
          <HeaderTabs />
        </div>
      </div>
    </header>
    )
}