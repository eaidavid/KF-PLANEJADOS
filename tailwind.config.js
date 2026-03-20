/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C5A059', // Gold
        secondary: '#0a0a0a', // Deep Black
        luxury: {
          charcoal: '#1a1a1a',
          ivory: '#f9f9f9',
          gold: '#C5A059',
          'gold-light': '#D4BC9A',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'slow-zoom': 'zoom 20s infinite alternate',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
