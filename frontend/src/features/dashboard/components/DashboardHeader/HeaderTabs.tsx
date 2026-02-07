import { tabs, tabItem, tabUnderline, tabsContainer,baseUnderline } from "./HeaderTabs.styles";
import { NavLink } from "react-router-dom";

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

  return (
    <div className={tabsContainer()}>
      <nav className={tabs()}>
        {ITEMS.map((item) => {
          const tabPath = item.toLowerCase();

          return (
            <NavLink
              key={item}
              to={tabPath}
              end={tabPath === "overview"}
              className={({isActive})=> 
                tabItem({active:isActive})}>
                 {({ isActive }) => (
                <>
                  {item}
                  {isActive && <span className={tabUnderline()} />}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className={baseUnderline()} />
    </div>
  );
};