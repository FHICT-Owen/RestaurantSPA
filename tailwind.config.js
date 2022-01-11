module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      screens: {
        xs: "340px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
