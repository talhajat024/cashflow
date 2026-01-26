/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A5CFF',      
        background: '#F8FAFC',
        card: '#FFFFFF',
        textPrimary: '#0F172A',
        textSecondary: '#64748B',
      },

      
      keyframes: {
        'tab-underline': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },

      animation: {
        'tab-underline': 'tab-underline 180ms ease-out forwards',
      },
    },
  },
  plugins: [],
}
