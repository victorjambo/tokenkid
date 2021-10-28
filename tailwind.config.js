const colors = require("tailwindcss/colors");

module.exports = {
  // mode: 'jit',
  purge: ["./src/pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-hover": "#14233D",
        blue: {
          ...colors.blue,
          lightblue: "#8D99FF",
          dark: "#0A1831",
        },
        pink: {
          ...colors.pink,
          primary: "#F14D5D",
        },
        gray: {
          ...colors.gray,
          steel: "#3F4147",
        },
        "white-back": "#F6F6F6",
      },
      borderWidth: {
        1: "1px",
      },
      padding: {
        17: "68px",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero.jpeg')",
      },
      height: {
        hero: "586px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
