/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {colors: {
        // Define your custom colors here
        lightCream: '#FCF9EA',
        paleTeal: '#BADFDB',
        salmonPink: '#FFA4A4',
        lightPink: '#FFBDBD',
      },},
  },
  plugins: [],
}

