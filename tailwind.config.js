/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fb641b', // Orange (New Primary)
        'primary-dark': '#d45316', // Darker Orange
        secondary: '#f1f3f6', // Light Gray Background
        'header-bg': '#2c3e50', // Dark Header Background (Updated from Logo)
        text: '#212121', // Dark Text
        'text-light': '#878787', // Light Text
        danger: '#ff6161',
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
