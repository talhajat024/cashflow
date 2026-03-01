// features/auth/pages/LoginPage.styles.ts
import { tv } from 'tailwind-variants';

export const loginPageStyles = tv({
  slots: {
    // Main container
    container: 'flex min-h-screen bg-white',

    // Left section - Blue Hero
    leftSection: [
      'relative hidden lg:flex flex-col justify-between',
      'w-[48%] min-h-screen',
      'bg-[#2563EB] overflow-hidden p-10',
    ].join(' '),

    // Logo
    logo: 'flex items-center gap-2 text-white font-semibold text-lg z-10 relative',
    logoIcon: 'w-5 h-5 rounded-full border-2 border-white',

    // Hero bottom text
    heroBottom: 'relative z-10',
    heroTitle: 'text-3xl font-bold text-white leading-tight mb-3',
    heroDescription: 'text-blue-100 text-sm leading-relaxed max-w-xs',

    // Dot indicators
    dotRow: 'flex items-center gap-2 mt-6',
    dot: 'w-2 h-2 rounded-full bg-white/40',
    dotActive: 'w-6 h-2 rounded-full bg-white',

    // Overlays
    stripeOverlay: 'absolute inset-0 pointer-events-none z-0',
    cardsContainer: 'absolute inset-0 flex items-center justify-center z-10 pointer-events-none',

    // Right section - Form side
    rightSection: [
      'flex flex-1 flex-col items-center justify-center',
      'px-8 py-12 bg-white',
    ].join(' '),
  },
});

export const styles = loginPageStyles();