/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFCF7',
          100: '#FAF8F2',
          200: '#F3EFE6',
          300: '#E8E2D5',
          400: '#D5CCBC',
          500: '#B8AB94',
        },
        ink: {
          950: '#0B0F17', // Refined deep midnight slate canvas
          900: '#111827', // Standard card and sidebar surface
          850: '#162032', // Elevated surfaces
          800: '#1E293B', // Inputs & secondary containers
          750: '#27354A', // Hover states
          700: '#334155', // Crisp borders
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8', // High-contrast secondary text
          300: '#CBD5E1', // High-contrast body text
          200: '#E2E8F0', // Bright text
          100: '#F1F5F9', // Near-white
          50: '#F8FAFC',  // Crisp white
        },
        academic: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA', // Luminous academic blue (ideal for dark mode text/links)
          500: '#3B82F6', // Vivid blue
          600: '#2563EB', // Primary button in dark mode
          700: '#1D4ED8',
          800: '#1E3A8A', // Deep Oxford Blue (light mode primary)
          900: '#0F172A',
          950: '#080E1A',
        },
        chai: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
          950: '#451A03',
        },
        math: {
          amber: '#F59E0B',
          crimson: '#EF4444',
          emerald: '#10B981',
          slate: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'monospace'],
        serif: ['Lora', 'Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
