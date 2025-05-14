/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem',
        'tiny': '0.7rem',
        'base-md': '1.1rem', 
        'big': '2rem', 
        'hero': '3rem', 
      }
    },
  },
  plugins: [],
}

