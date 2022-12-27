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
        sp_hero: "url('/img/sp-hero.jpg')",
        pc_hero: "url('/img/pc-hero.jpg')"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
