/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,tsx,jsx,mdx}",
    "./components/**/*.{js,ts,tsx,jsx,mdx}",
    "./app/**/*.{js,ts,tsx,jsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Libre Baskerville', 'serif'],
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        burgundy: '#6B2D3E',
        cream: '#F4ECD8',
        navy: '#2C3E50',
      },
    },
  },
  plugins: [],
};