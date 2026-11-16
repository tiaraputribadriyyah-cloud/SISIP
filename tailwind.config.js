/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F3',
          100: '#F5F1E8', // Warm cream primary
          200: '#ECE5D6',
          300: '#DDD3BF',
          400: '#C7B99D',
        },
        forest: {
          900: '#14231E',
          800: '#1B3029',
          700: '#243D35', // Deep forest green
          600: '#2F4F45',
          500: '#3D6559',
          100: '#E2EBE7',
        },
        terracotta: {
          DEFAULT: '#D98555', // Muted orange
          hover: '#C77443',
          light: '#F8EDE5',
        },
        butter: {
          DEFAULT: '#E9DCA7', // Soft yellow
          light: '#F5F0D5',
          dark: '#D8C782',
        },
        charcoal: {
          DEFAULT: '#252525', // Charcoal
          muted: '#4A4A4A',
          subtle: '#737373',
          light: '#9E9E9E',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px #252525',
        'brutal-sm': '2px 2px 0px #252525',
        'brutal-lg': '6px 6px 0px #252525',
        'brutal-forest': '4px 4px 0px #243D35',
        'brutal-orange': '4px 4px 0px #D98555',
      },
      borderRadius: {
        'editorial': '6px',
      }
    },
  },
  plugins: [],
}
