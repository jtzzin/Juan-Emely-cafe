/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6F4E37", // Marrom
        secondary: "#D7CCC8", // Bege
      },
    },
  },
  plugins: [],
};
