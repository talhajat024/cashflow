import { tv } from "tailwind-variants"


export const TopBar = tv({
  slots:{
     // Layout
    inner: 'flex h-[72px] items-center gap-10',

    // Brand
    brandWrapper: 'flex items-center gap-2 text-white relative',
    brandText:    'text-[20px] font-semibold tracking-wide text-slate-50',

    // Navigation
    navWrapper: 'flex h-full items-center gap-8 relative top-[1px]',
    navLink:    'text-[14px] font-normal text-white/80 hover:text-white transition-colors',

    // Search
    searchWrapper: 'flex items-center gap-2 rounded-[14px] bg-blue-500 px-4 h-[44px] mr-6',
    searchIcon:    'h-4 w-4 text-white/80',
    searchInput:   'w-[160px] bg-transparent text-[14px] font-normal text-white placeholder-white/70 outline-none',

    // Actions
    iconGroup:  'flex items-center gap-6',
    iconButton: 'relative flex items-center justify-center text-white/90 hover:text-white transition p-1 outline-none focus:outline-none',
    dot:        'absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500',
    badge:      'absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-xs font-medium text-white bg-red-500 rounded-full shadow-lg',
  }
});

export const styles = TopBar();