import { tabs, tabItem, tabUnderline, tabsContainer,baseUnderline } from "./HeaderTabs.styles";

const ITEMS = [
  'Overview',
  'Wallet',
  'Invoice',
  'Profile',
  'Settings',
  'Help',
  'Report',
];

export const HeaderTabs = () => {
  const activeTab = 'Overview';

  return (
    <div className={tabsContainer()}>
      <nav className={tabs()} role="tablist">
        {ITEMS.map((item) => {
          const isActive = item === activeTab;

          return (
            <span
              key={item}
              role="tab"
              aria-selected={isActive}
              className={tabItem({ active: isActive })}
            >
              {item}
              {isActive && <span className={tabUnderline()} />}
            </span>
          );
        })}
      </nav>
      <div className={baseUnderline()} />
    </div>
  );
};