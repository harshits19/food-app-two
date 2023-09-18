/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        defColor: "#fc8019",
        primary: "#02060cbf",
        defBlack: "#282c3f",
        defGray: "#686b78",
      },
      dropShadow: {
        dataCardFilter: "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
