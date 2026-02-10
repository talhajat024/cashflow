import { Search, Mail, Bell } from 'lucide-react'
import { Avatar } from '../../../../shared/ui'
import { CashflowLogo } from '../../../../shared/ui/logo'
import { Badge } from '../../../../shared/ui/badge/Badge'
import { NavLink,Link } from 'react-router-dom'

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
  iconButton:
    'relative flex items-center justify-center text-white/90 hover:text-white transition',
  dot:
    'absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500',
}

const NAV_ITEMS=[
  {label:'Dashboard',to:'/dashboard'},
  {label:'Analytics',to:'/analytics'},
  {label:'Transactions',to:'/transactions'},
  {label:'Wallets',to:'/wallets'}
]



export const TopBar = () => {
  return (
    <section >
      <div className={layout.inner}>
        {/* LEFT — Brand */}
        <Link to="/dashboard" className={brand.wrapper} aria-label='Go to dashboard'>
        <CashflowLogo />
        <span className={brand.text}>CashFlow</span>
        </Link>

        {/* CENTER — Navigation */}
        <nav className={navigation.wrapper} aria-label="Main navigation">
          {NAV_ITEMS.map(({label,to})=>(
            <NavLink key={to} to={to} className={({isActive})=>
            isActive ? 'text-white font-medium border-b-2 border-white pb-1'
          : navigation.link}>{label}</NavLink>
          ))}
        </nav>

    <div className="ml-auto mr-4">
      <div className={search.wrapper}>
        <Search className={search.icon} />
        <input
          className={search.input}
          placeholder="Search anything..."
        />
        <Badge intent="searchShortcut">⌘ F</Badge>
      </div>
    </div>

    {/* ACTIONS — independent */}
    <div className={actions.iconGroup}>
      <div className={actions.iconButton}>
        <Mail className="h-5 w-5" />
        <span className={actions.dot} />
      </div>

      <div className={actions.iconButton}>
        <Bell className="h-5 w-5" />
        <span className={actions.dot} />
      </div>

   <Avatar src="/avatar.jpg" />
    </div>

      </div>
    </section>
  )
}
