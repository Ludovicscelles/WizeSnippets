/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        primary: "#000000",
        bluewize: "#2A7FFF",
        pinkwize: "#FE4B9F",
        
      }

    },
  },
  plugins: [],
};
