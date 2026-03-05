// features/auth/pages/SignupPage.styles.ts
import { tv } from 'tailwind-variants';

export const signupPageStyles = tv({
  slots: {
    // Main container
    container: 'flex min-h-screen bg-white',

    // Left section — Form
    leftSection: [
      'flex flex-1 flex-col justify-center',
      'px-12 py-12 bg-white',
    ].join(' '),

    formWrapper: 'w-full max-w-[380px]',

    // Heading
    headingRow: 'flex items-center gap-2 mb-1',
    sparkle: 'text-gray-900',
    title: 'text-2xl font-bold text-gray-900',
    subtitle: 'text-gray-400 text-sm mb-6',

    // Divider
    divider: 'flex items-center gap-3 my-5',
    dividerLine: 'flex-1 h-px bg-gray-200',
    dividerText: 'text-xs text-gray-400 uppercase tracking-wider',

    // Form groups
    formGroup: 'mb-4',
    label: 'block text-sm font-medium text-gray-700 mb-1.5',
    input: [
      'w-full px-3.5 py-2.5',
      'border border-gray-200 rounded-lg',
      'text-sm text-gray-800 placeholder:text-gray-400',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'transition-all duration-200 bg-white',
      '[&::-ms-reveal]:hidden [&::-ms-clear]:hidden',
    ].join(' '),

    // Password wrapper
    passwordWrapper: 'relative',
    passwordToggle: [
      'absolute right-3 top-1/2 -translate-y-1/2',
      'text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none',
    ].join(' '),

    // Terms checkbox
    termsRow: 'flex items-start gap-2.5 mb-5',
    checkbox: [
      'mt-0.5 w-4 h-4 rounded border-gray-300',
      'text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer',
    ].join(' '),
    termsText: 'text-sm text-gray-500 select-none leading-snug',
    termsLink: 'text-blue-600 hover:text-blue-700 transition-colors',

    // Submit button
    submitButton: [
      'w-full flex items-center justify-center gap-2',
      'bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm',
      'hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'disabled:opacity-60 disabled:cursor-not-allowed',
    ].join(' '),
    submitArrow: 'text-white/80',

    // Error
    fieldError: 'text-red-500 text-xs mt-1 ml-0.5',
    globalError: 'text-red-500 text-xs text-center mb-4 bg-red-50 py-2 px-3 rounded-lg',

    // Login link
    loginText: 'text-center text-sm text-gray-500 mt-5',
    loginLink: 'text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors',

    // Right section — Chart
    rightSection: [
      'hidden lg:flex flex-1 flex-col items-center justify-center',
      'px-10 py-12 bg-white',
    ].join(' '),

    // Chart card
    chartCardWrapper: 'relative w-full max-w-[460px]',

    // Back card (rotated)
    backCard: [
      'absolute inset-0 bg-white rounded-2xl shadow-md',
      'transform rotate-2 translate-x-3 translate-y-3',
    ].join(' '),

    // Front card
    frontCard: [
      'relative bg-white rounded-2xl shadow-lg',
      'border border-gray-100 p-6',
    ].join(' '),

    chartTitle: 'text-sm font-semibold text-gray-700 mb-1',
    chartLegend: 'flex items-center gap-4 mb-4',
    legendItem: 'flex items-center gap-1.5 text-xs text-gray-500',
    legendDotBlue: 'w-2.5 h-2.5 rounded-full bg-blue-600',
    legendDotPurple: 'w-2.5 h-2.5 rounded-full bg-indigo-400',

    // Bottom text
    bottomText: 'text-center mt-8',
    bottomTitle: 'text-xl font-bold text-gray-900 mb-2',
    bottomDescription: 'text-gray-400 text-sm leading-relaxed max-w-xs mx-auto',
  },
});

export const styles = signupPageStyles();