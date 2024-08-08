/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#16E1F5',
        secondary: '#03A9F4',
        footer: '#4905F6',
        accent: '#8BC34A',
        gray: '#D1D5DB',
        black: '#111827',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
