import { Search, Mail, Bell, WifiOff } from 'lucide-react'
import { CashflowLogo } from '../../../../../shared/ui/logo'
import { Badge } from '../../../../../shared/ui/badge/Badge'
import { NavLink, Link } from 'react-router-dom'
import { useSearch } from '../../../../search/hooks/useSearch'
import { SearchModal } from '../../../../search/components/SearchModal'
import { useEffect, useRef, useState } from 'react'
import { NotificationsPanel } from '../../../../notifications/components/NotificationsPanel';
import { useNotifications } from '../../../../notifications/hooks/useNotifications'
import InboxDropdown from '../InboxDropdown/InboxDropdown';
import { UserMenu } from '../../../../user/components/UserMenu/UserMenu'
import { styles } from './TopBar.styles'

const NAV_ITEMS = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Analytics', to: '/analytics' },
    { label: 'Transactions', to: '/transactions' },
    { label: 'Wallets', to: '/wallets' }
]

export const TopBar = () => {
    const { isOpen, open, close } = useSearch();
    const searchTriggerRef = useRef<HTMLInputElement>(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const { unreadCount, isConnected, loading } = useNotifications();  // Added isConnected and loading
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        }
        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications])

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                searchTriggerRef.current?.focus();
            }, 0);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleShortcut = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");
            if (
                (isMac && e.metaKey && e.key.toLowerCase() === "k") ||
                (!isMac && e.ctrlKey && e.key.toLowerCase() === "k")
            ) {
                e.preventDefault();
                open();
            }
        };

        window.addEventListener("keydown", handleShortcut);
        return () => window.removeEventListener("keydown", handleShortcut);
    }, [open])

    return (
        <>
            <section>
                <div className={styles.inner()}>
                    <Link to="/dashboard/overview" state={{ scroll: "reset" }} className={styles.brandWrapper()} aria-label='Go to dashboard'>
                        <CashflowLogo />
                        <span className={styles.brandText()}>CashFlow</span>
                    </Link>

                    <nav className={styles.navWrapper()} aria-label="Main navigation">
                        {NAV_ITEMS.map(({ label, to }) => (
                            <NavLink key={to} to={to} className={({ isActive }) =>
                                isActive ? 'text-white font-normal border-white'
                                    : styles.navLink()}>{label}</NavLink>
                        ))}
                    </nav>

                    <div className="ml-auto mr-4">
                        <div className={styles.searchWrapper()}>
                            <Search className={styles.searchIcon()} />
                            <input
                                ref={searchTriggerRef}
                                className={styles.searchInput()}
                                placeholder="Search anything..."
                                readOnly
                                onClick={open}
                            />
                            <Badge intent="searchShortcut">⌘ F</Badge>
                        </div>
                    </div>

                    <div className={styles.iconGroup()}>
                        <InboxDropdown
                            trigger={
                                <div className={styles.iconButton()}>
                                    <Mail className="h-5 w-5" />
                                    <span className={styles.dot()} />
                                </div>
                            }>
                        </InboxDropdown>

                        {/* Notifications Bell */}
                        <div className="relative" ref={notificationsRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={styles.iconButton()}
                                disabled={loading}
                            >
                                <Bell className="h-5 w-5" />
                                
                                {/* Unread badge */}
                                {unreadCount > 0 && (
                                    <span className={styles.badge()}>
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                                
                                {/* Connection status indicator - shows when disconnected */}
                                {!isConnected && !loading && (
                                    <span className="absolute -top-1 -right-1" title="Reconnecting...">
                                        <WifiOff className="w-3 h-3 text-yellow-500" />
                                    </span>
                                )}
                            </button>

                            {showNotifications && (
                                <NotificationsPanel onClose={() => setShowNotifications(false)} />
                            )}
                        </div>

                        <UserMenu />
                    </div>
                </div>
            </section>
            {isOpen && <SearchModal onClose={close} />}
        </>
    )
}