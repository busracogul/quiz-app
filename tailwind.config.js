/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: "#FBFAF3",
        primary1: "#0F1511",
        primary2: "#FFFFFF",
        secondary: "#E7FE55",

        text1: "#0F1511",
        text2: "#AEB0B8",
        text3: "#FFFFFF",

        correct: "#17EC92",
        incorrect: "#DE0F4D",
        warning: "#F3F827",
      },
    },
  },
  plugins: [],
};
