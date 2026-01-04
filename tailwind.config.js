/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A2A1F',
        paper: '#F8F4E8',
        acid: '#D2E823',
        orange: '#FF5C00',
      },
      fontFamily: {
        display: ['Dela Gothic One', 'cursive'],
        sans: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #0A2A1F',
        'hard-sm': '2px 2px 0px 0px #0A2A1F',
        'hard-xl': '8px 8px 0px 0px #0A2A1F',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(#0A2A1F 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}

