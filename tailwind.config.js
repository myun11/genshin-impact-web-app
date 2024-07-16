/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'paimon': "url('/transparent_paimon.png')",
      }
    }
  },
  plugins: [],
}