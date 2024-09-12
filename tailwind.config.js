/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': {'max': '425px'}, // Custom breakpoint for 320px or less
      },
    },
  },
  plugins: [],
}

