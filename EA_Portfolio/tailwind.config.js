/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSmoothing: {
        antialiased: 'antialiased',
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      roboto : ['Roboto', 'sans-serif'],
      sourcecode : ['Source Code Pro', 'monospace'],
    },    
  },
  plugins: [],
}

