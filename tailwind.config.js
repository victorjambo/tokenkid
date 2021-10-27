const colors = require("tailwindcss/colors");

module.exports = {
  // mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary-hover": "#14233D",
        blue: {
          ...colors.blue,
          lightblue: "#8D99FF"
        },
        pink: {
          ...colors.pink,
          primary: "#F14D5D",
        },
        gray: {
          ...colors.gray,
          steel: "#3F4147",
        }
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
