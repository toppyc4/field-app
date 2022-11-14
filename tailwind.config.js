/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.jsx", "./components/**/*.jsx"],
  theme: {
    extend: {
      backgroundImage: {
        "intro-field": "url('/img/Field 2.png')",
      },
    },
  },
  plugins: [],
}
