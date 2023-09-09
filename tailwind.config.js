/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      'lightblue' : '#60cecc',
      'darkblue' : '#000552',
      'hashpass' : '#e3ffff',
      'black' : '#000',
      'white' : '#fff'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

