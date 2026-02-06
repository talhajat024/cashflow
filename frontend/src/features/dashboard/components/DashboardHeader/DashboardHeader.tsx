import {TopBar} from './TopBar';
import {WelcomeSection} from './WelcomeSection';
import {HeaderTabs} from './HeaderTabs';

export const DashboardHeader = ()=>{

    return(
      <header className="w-full bg-primary pb-20">
      <div className="mx-auto max-w-[1200px] px-8">
        <TopBar />
        <div className="pt-3 flex items-center justify-between">
          <WelcomeSection />
          <HeaderTabs />
        </div>
      </div>
    </header>
    )
}