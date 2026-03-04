import { tabs, tabItem, tabUnderline, tabsContainer,baseUnderline } from "./HeaderTabs.styles";
import { NavLink,useLocation } from "react-router-dom";
import { useLayoutEffect,useRef,useState } from "react";

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

  const tabsRef= useRef<Record<string,HTMLAnchorElement | null>>({});
  const {pathname} = useLocation();

  const [underline,setUnderline]=useState({
    width:0,
    left:0,
  })

  useLayoutEffect(()=>{
    const activeItem = ITEMS.find(item => 
      pathname.endsWith(item.toLowerCase())
    );
    if(!activeItem) return;
    const el = tabsRef.current[activeItem];
    if(!el) return;
    setUnderline({
      width:el.offsetWidth,
      left:el.offsetLeft
    });
  },[pathname])

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
              ref={(el) => {
                tabsRef.current[item] = el;
              }}
              className={({ isActive }) =>
                tabItem({ active: isActive })
              }
            >
              {item}
            </NavLink>
          );
        })}
      <span
          className={tabUnderline()}
          style={{
            width: underline.width,
            transform: `translateX(${underline.left}px)`,
          }}
        />
      </nav>
      <div className={baseUnderline()} />
    </div>
  );
};