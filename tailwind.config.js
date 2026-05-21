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
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          900: '#1A365D',
        },
        blue: {
          600: '#2B6CB0',
        },
        teal: {
          500: '#38B2AC',
        },
        slate: {
          600: '#4A5568',
        },
        background: '#F7FAFC',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
