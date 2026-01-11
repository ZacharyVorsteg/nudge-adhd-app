import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Calm, shame-free palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7cfc7',
          300: '#a3b0a3',
          400: '#7e8f7e',
          500: '#637463',
          600: '#4e5c4e',
          700: '#414b41',
          800: '#373f37',
          900: '#2f352f',
        },
        warm: {
          50: '#fdfcfb',
          100: '#faf7f5',
          200: '#f5eeea',
          300: '#ede2db',
          400: '#e2d0c5',
          500: '#d4baab',
          600: '#c19f8c',
          700: '#a98370',
          800: '#8c6b5b',
          900: '#74584b',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
        'shrink': 'shrink linear forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        shrink: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: 'var(--circumference)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
