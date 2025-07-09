/** @type {import('tailwindcss').Config} */
const { heroui } = require('@heroui/react')
module.exports = {
  content: [
    './src/renderer/*.{html,js}',
    './src/renderer/src/**/*.{ts,js,tsx,jsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1E1E1E',
        primary: '#1DB954', // Spotify green
        secondary: '#535353',
        accent: '#BB86FC',
        text: '#FFFFFF',
        muted: '#B3B3B3'
      }
    }
  },
  darkMode: 'class',
  plugins: [heroui()]
}
