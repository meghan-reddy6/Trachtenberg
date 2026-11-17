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
          950: '#0B0D0F', // Deepest canvas background in dark mode
          900: '#14171A', // Standard card and sidebar background in dark mode
          850: '#1B1F24', // Elevated surface in dark mode
          800: '#262B32', // Borders and input background in dark mode
          750: '#323842', // Hover states in dark mode
          700: '#424854',
          600: '#5A6270',
          500: '#757E8E',
          400: '#949EB0',
          300: '#C2C9D6',
          200: '#E2E6EE',
          100: '#F0F3F8',
        },
        academic: {
          50: '#F0F5FA',
          100: '#DCE7F2',
          200: '#B8D1E8',
          300: '#8FB4DB',
          400: '#6293CA',
          500: '#3B73B4',
          600: '#1E3A8A', // Deep Oxford Blue accent (light mode primary)
          700: '#172B68',
          800: '#11204D',
          900: '#0C1736',
          950: '#060D20',
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
          amber: '#B45309',
          crimson: '#991B1B',
          emerald: '#065F46',
          slate: '#334155',
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
