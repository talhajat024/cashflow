import { Search, Mail, Bell } from 'lucide-react'
import { Avatar } from '../../../../shared/ui'
import { CashflowLogo } from '../../../../shared/ui/logo'
import { Badge } from '../../../../shared/ui/badge/Badge'

const layout = {
  inner:
    'flex h-[72px] items-center justify-between',
}

const brand = {
  wrapper: 'flex items-center gap-2 text-white relative top-[1px]',
  text: 'text-[20px] font-semibold tracking-wide text-slate-50',
}

const navigation = {
  wrapper: 'flex items-center gap-8',
  link:
    'text-[14px] font-normal text-white/80 hover:text-white transition-colors',
}

const search = {
  wrapper:
    'flex items-center gap-3 rounded-[14px] bg-blue-500 px-4 h-[44px]',
  icon: 'h-4 w-4 text-white/80',
  input:
    'w-[160px] bg-transparent text-[14px] font-normal text-white placeholder-white/70 outline-none',
}

const actions = {
  wrapper: 'flex items-center',
  iconGroup: 'flex items-center gap-6 ml-10', 
  iconButton:
    'relative flex items-center justify-center text-white/90 hover:text-white transition',
  dot:
    'absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500',
}



export const TopBar = () => {
  return (
    <section >
      <div className={layout.inner}>
        {/* LEFT — Brand */}
        <div className={brand.wrapper}>
        <CashflowLogo />
        <span className={brand.text}>CashFlow</span>
        </div>

        {/* CENTER — Navigation */}
        <nav className={navigation.wrapper}>
          <a href="#" className={navigation.link}>
            Dashboard
          </a>
          <a href="#" className={navigation.link}>
            Analytics
          </a>
          <a href="#" className={navigation.link}>
            Transactions
          </a>
          <a href="#" className={navigation.link}>
            Walletes
          </a>
        </nav>

 <div className={actions.wrapper}>
  {/* GROUP 1 — Search */}
  <div className={search.wrapper}>
    <Search className={search.icon} />
    <input
      className={search.input}
      placeholder="Search anything..."
    />
    <Badge intent="searchShortcut">⌘ F</Badge>
  </div>

  {/* GROUP 2 — Actions */}
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


      </div>
    </section>
  )
}
