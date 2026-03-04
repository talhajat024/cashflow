import { tv } from 'tailwind-variants';

export const loginFormStyles = tv({
  slots: {
    container: 'w-full max-w-[360px]',

    title: 'text-2xl font-bold text-gray-900 mb-1',
    subtitle: 'text-gray-400 text-sm mb-7',

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


    passwordWrapper: 'relative',
    passwordToggle: [
      'absolute right-3 top-1/2 -translate-y-1/2',
      'text-gray-400 hover:text-gray-600 cursor-pointer',
      'focus:outline-none',
    ].join(' '),


    checkboxRow: 'flex items-center justify-between mb-5',
    checkboxLabel: 'flex items-center gap-2 cursor-pointer',
    checkbox: [
      'w-4 h-4 rounded border-gray-300',
      'text-blue-600 focus:ring-blue-500 focus:ring-offset-0',
      'cursor-pointer',
    ].join(' '),
    checkboxText: 'text-sm text-gray-600 select-none',

    forgotLink: 'text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors',

    errorMessage: 'text-red-500 text-xs text-center mb-4 bg-red-50 py-2 px-3 rounded-lg',

    loginButton: [
      'w-full bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm',
      'hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      'disabled:opacity-60 disabled:cursor-not-allowed',
    ].join(' '),

    signupText: 'text-center text-sm text-gray-500 mt-5',
    signupLink: 'text-blue-600 hover:text-blue-700 font-medium ml-1 transition-colors',
    fieldError: 'text-red-500 text-xs mt-1 ml-0.5',
  },
});

export const styles = loginFormStyles();