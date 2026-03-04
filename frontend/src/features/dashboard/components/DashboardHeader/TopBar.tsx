import { Search, Mail, Bell } from 'lucide-react'
import { Avatar } from '../../../../shared/ui'
import { CashflowLogo } from '../../../../shared/ui/logo'
import { Badge } from '../../../../shared/ui/badge/Badge'
import { NavLink,Link } from 'react-router-dom'
import { useSearch } from '../../../search/hooks/useSearch'
import { SearchModal } from '../../../search/components/SearchModal'
import { useEffect, useRef ,useState} from 'react'
import { NotificationsPanel } from '../../../notifications/components/NotificationsPanel';
import { useNotifications } from '../../../notifications/hooks/useNotifications'
import InboxDropdown from './InboxDropdown';
import { UserMenu } from '../../../user/components/UserMenu/UserMenu'

const layout = {
  inner:
    'flex h-[72px] items-center gap-10',
}

const brand = {
  wrapper: 'flex items-center gap-2 text-white relative',
  text: 'text-[20px] font-semibold tracking-wide text-slate-50',
}

const navigation = {
  wrapper: 'flex h-full items-center gap-8 relative top-[1px]',
  link:
    'text-[14px] font-normal text-white/80 hover:text-white transition-colors',
}

const search = {
  wrapper:
    'flex items-center gap-2 rounded-[14px] bg-blue-500 px-4 h-[44px] mr-6',
  icon: 'h-4 w-4 text-white/80',
  input:
    'w-[160px] bg-transparent text-[14px] font-normal text-white placeholder-white/70 outline-none',
}

const actions = {
  iconGroup: 'flex items-center gap-6',
  iconButton: 'relative flex items-center justify-center text-white/90 hover:text-white transition p-1', 
  dot: 'absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500',
  badge: `
    absolute -top-1 -right-1 
    min-w-[18px] h-[18px] 
    flex items-center justify-center
    px-1 text-xs font-bold text-white 
    bg-red-500 rounded-full
    shadow-lg border-2 border-white
  `,
}

const NAV_ITEMS=[
  {label:'Dashboard',to:'/dashboard'},
  {label:'Analytics',to:'/analytics'},
  {label:'Transactions',to:'/transactions'},
  {label:'Wallets',to:'/wallets'}
]



export const TopBar = () => {

  const {isOpen,open,close}= useSearch();
  const searchTriggerRef= useRef<HTMLInputElement>(null);

  const [showNotifications,setShowNotifications]=useState(false);
  const { unreadCount } = useNotifications();
    
  const notificationsRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const handleClickOutside=(event:MouseEvent)=>{
      if(notificationsRef.current && !notificationsRef.current.contains(event.target as Node))
      {
        setShowNotifications(false);
      }
    }
      if(showNotifications)
      {
        document.addEventListener('mousedown',handleClickOutside);
      }
      return ()=>{
        document.removeEventListener('mousedown',handleClickOutside);
    };
  },[showNotifications])

 useEffect(() => {
  if (!isOpen) {
    setTimeout(() => {
      searchTriggerRef.current?.focus();
    }, 0);
  }
}, [isOpen]);

  useEffect(()=>{
    const handleShortcut= (e:KeyboardEvent)=>{
      const isMac= navigator.platform.toUpperCase().includes("MAC");
      if(
        (isMac && e.metaKey && e.key.toLowerCase() === "k") || 
        (!isMac && e.ctrlKey && e.key.toLowerCase() === "k"))
        {
          e.preventDefault();
          open();
        }
    };

    window.addEventListener("keydown",handleShortcut);
    return ()=> window.removeEventListener("keydown",handleShortcut);
  },[open])

  return (
    <>
    <section >
      <div className={layout.inner}>
        {/* LEFT — Brand */}
        <Link to="/dashboard/overview" state={{scroll:"reset"}} className={brand.wrapper} aria-label='Go to dashboard'>
        <CashflowLogo />
        <span className={brand.text}>CashFlow</span>
        </Link>

        {/* CENTER — Navigation */}
        <nav className={navigation.wrapper} aria-label="Main navigation">
          {NAV_ITEMS.map(({label,to})=>(
            <NavLink key={to} to={to} className={({isActive})=>
            isActive ? 'text-white font-normal border-white'
          : navigation.link}>{label}</NavLink>
          ))}
        </nav>

    <div className="ml-auto mr-4">
      <div className={search.wrapper}>
        <Search className={search.icon} />
        <input
        ref={searchTriggerRef}
          className={search.input}
          placeholder="Search anything..."
          readOnly
          onClick={open}
        />
        <Badge intent="searchShortcut">⌘ F</Badge>
      </div>
    </div>

    <div className={actions.iconGroup}>
      <InboxDropdown
      trigger={
         <div className={actions.iconButton}>
      <Mail className="h-5 w-5" />
      <span className={actions.dot} />
    </div>
      }>
    </InboxDropdown>


       <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={actions.iconButton}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <>
                    {unreadCount > 0 ? (
                      <span className={actions.badge}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    ) : (
                      <span className={actions.dot} />
                    )}
                  </>
                )}
              </button>

              {showNotifications && (
                <NotificationsPanel onClose={() => setShowNotifications(false)} />
              )}
            </div>

   <UserMenu/>
    </div>

      </div>
    </section>
    {isOpen && <SearchModal onClose={close}  />}
    </>
  )
}
