module.exports = {
  future: {},
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/img/hero.jpg')"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
