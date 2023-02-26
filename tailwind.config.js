/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        BigShouldersStencil: ["Big Shoulders Text", "cursive"],
      },
      height: {
        150: "36rem",
      },
      width: {
        90: "350px",
      },
      translate: {
        'p110':"110%",
      }
    },
  },
  plugins: [],
};
