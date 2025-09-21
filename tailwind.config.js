/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: "#6F4E37",
        creme: "#f5f5dc",
        "primary-dark": "#1e1e1e",
        "primary-light": "#ffffff",
      },
    },
  },
  plugins: [],
};
