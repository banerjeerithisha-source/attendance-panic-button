/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#FF4B4B',
        'secondary-orange': '#FF9F43',
        'tertiary-green': '#27AE60',
        'neon-cyan': '#00E5FF',
        'neon-yellow': '#FFEA00',
        'background-dark': '#0F141E',
        'surface-dark': '#18202F',
        'on-background': '#E5E2E1',
        'on-surface-variant': '#B0B3B8',
        'outline-color': '#333E50',
      }
    },
  },
  plugins: [],
}
