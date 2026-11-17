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
          900: '#1A1C1E',
          800: '#2C3036',
          700: '#424750',
          600: '#5A616D',
          500: '#757D8A',
          400: '#959DAA',
          300: '#C2C8D2',
          200: '#E4E7EC',
          100: '#F2F4F7',
        },
        academic: {
          50: '#EEF2F6',
          100: '#DCE4ED',
          200: '#B9C9DB',
          600: '#1E3A8A', // Deep Oxford Blue accent
          700: '#172B68',
          800: '#11204D',
          900: '#0C1736',
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
