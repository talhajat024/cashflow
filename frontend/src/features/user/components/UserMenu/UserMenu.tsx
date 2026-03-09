import React, { useEffect, useRef, useState } from "react";
import {  Settings, Bell, CreditCard, 
  Landmark, BarChart3, HelpCircle, LogOut 
} from 'lucide-react';
import {styles} from './UserMenu.styles';
import { Avatar } from "../../../../shared/ui";
import { useUser } from "../../hooks/useUser";

interface MenuItemProps{
    icon:React.ReactNode;
    label:string;
    onClick?:()=> void;
    variant?:'default' | 'signout';
}

const MenuItem=({icon,label,onClick,variant='default'}:MenuItemProps)=>{

    const className = variant=== 'signout' ? styles.signOutItem(): styles.menuItem();
    return (
        <div className={className} onClick={onClick} role="menuitem">
            <span className={styles.menuItemIcon()}> {icon}</span>
            <span className={styles.menuItemText()}>{label}</span>
        </div>
    );
};


export const UserMenu=()=>{
    const [isOpen,setIsOpen]=useState(false);
    const menuRef=useRef<HTMLDivElement>(null);

    const {user,loading,signOut}=useUser();
    
    // click outside handler
    useEffect(()=>{
        const handleClickOutside =(event:MouseEvent)=>{
            if(menuRef.current && !menuRef.current.contains(event.target as Node))
            {
                setIsOpen(false);
            }
        };

        if(isOpen)
        {
            document.addEventListener('mousedown',handleClickOutside);
        }

        return()=> {
            document.removeEventListener("mousedown",handleClickOutside);
        }
    },[isOpen])

    useEffect(()=>{
        const handleEscKey=(event:KeyboardEvent)=>{
            if(event.key=== 'Escape' && isOpen)
            {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown',handleEscKey);
        return ()=>{
            document.removeEventListener('keydown',handleEscKey);
        }
    },[isOpen])

    const handleNavigation=(path:string)=>{
        setIsOpen(false);
        window.location.href= path;
    };

    const handleSignOut=async()=>{
        await signOut();
        setIsOpen(false);
    }

    if(loading)
    {
        return(
            <div className={styles.container()}>
                <button className={styles.avatarButton()} disabled>
                    <Avatar
                    size={28}/>
                <div className={styles.loadingContainer()}>
                    <div className={styles.loadingSpinner()}/>
                </div>
                </button>
            </div>
        );
    }

    if(!user)
    {
        return null;
    }

    return(
        <div className={styles.container()} ref={menuRef}>
            <button onClick={()=> setIsOpen(!isOpen)}
                className={styles.avatarButton()}
                aria-label="User menu"
                aria-expanded={isOpen}
                aria-haspopup="true">
                        <Avatar src={user.avatar}
                       alt={user.name}
                        size={28}/>
            </button>

            {isOpen && (
                <div className={styles.dropdown()} role="menu" aria-label="User menu">
                    <div className={styles.userInfo()}>
                        <p className={styles.userName()}>{user.name}</p>
                        <p className={styles.userEmail()}>{user.email}</p>  
                    </div>

                    
                    <div className={styles.menuSection()}>
                        <MenuItem
                        icon={<Settings size={16}/>}
                        label="Account Settings"
                        onClick={()=> handleNavigation('/dashboard/settings')}/>
                        <MenuItem 
                          icon={<Bell size={16} />}
                          label="Notification Preferences"
                          onClick={() => handleNavigation('/dashboard/settings?tab=notifications')}
                        />
                        <MenuItem 
                          icon={<CreditCard size={16} />}
                          label="Subscription & Billing"
                          onClick={() => handleNavigation('/billing')}
                        />
                    </div>

                    <div className={styles.divider()} />

                <div className={styles.menuSection()}>
                  <MenuItem 
                    icon={<Landmark size={16} />}
                    label="Connected Banks"
                    onClick={() => handleNavigation('/dashboard/wallet?tab=connected')}
                  />
                  <MenuItem 
                    icon={<BarChart3 size={16} />}
                    label="Usage Reports"
                    onClick={() => handleNavigation('/dashboard/report')}
                  />
                </div>
                <div className={styles.divider()} />

          <div className={styles.menuSection()}>
            <MenuItem 
              icon={<HelpCircle size={16} />}
              label="Help & Support"
              onClick={() => handleNavigation('/dashboard/help')}
            />
          </div>

          <div className={styles.divider()} />

          <div className={styles.menuSection()}>
            <MenuItem 
              icon={<LogOut size={16} />}
              label="Sign Out"
              onClick={handleSignOut}
              variant="signout"
            />
            </div>
                </div>
            )}
        </div>
    )
}


