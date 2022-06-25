module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-background": '#080820',
        "secondary-background": '#13132F',
        "primary-button": "#4FE4A0"
      }
    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}
