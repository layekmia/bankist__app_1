/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors:{
        bodyColor: "#f3f3f3",
        primaryTextClr: "#444444",
        greenBg: "#5dc17b",
        redBg: "#e6315b"
      },
      fontFamily:{
        'poppins': ["poppins", "serif"]
      }
    },
  },
  plugins: [],
}

