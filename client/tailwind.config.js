/*@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xl: "80rem",
        // => @media (min-width: 992px) { ... }
      },
    },
    fontFamily: {
      Sans: ["Source Sans Pro", "sans-serif"],
      Lato: ["Lato", "sans-serif"],
      Aboreto: ["Aboreto", "cursive"],
      Raleway: ["Raleway", "sans-serif"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
