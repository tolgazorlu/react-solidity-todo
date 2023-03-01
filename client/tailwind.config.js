/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '3xl': '1.953rem',
      },
      fontFamily: {
        sans: "Inter"
      },
      colors: {
        "dark": "#0f172a",
        "light": "#f8f8f9",
        "blue": "#38bdf8",
        "darkBlue": "#13273e",
        "gray": "#94a3b8",
        "pink": "#bc5f96",
        "bgdark": "#1e293b"
      }, 
      animation: {
        'moebius': 'moebius 2s infinite',
        'colorChange': 'colorChange 4s linear infinite'
      },
      keyframes: {
        moebius: {
          '0%': {transform: 'rotate(0.0deg)'},
          '100%': {transform: 'rotate(360.0deg)'},
        },
        colorChange: {
          '0%': {color: '#13273e'},
          '50%': {color: '#94a3b8'},
          '100%': {color: '#13273e'},
        }
      }
    },
  },
  plugins: [],
}