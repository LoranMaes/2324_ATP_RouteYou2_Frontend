/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#2a2a2a",
      background: "#fafafa",
      "primary-green": "#226E59",
      "accent-green": "#277E66",
      "accent-red": "#B30000",
      "accent-gray": "rgba(115, 115, 115, 1)",
      "accent-light-gray": "#B8B8B8",
      "accent-yellow": "#FFA300",
      "accent-blue": "#3B8EDA",
    },
    fontSize: {
      sm: "1.2rem",
      md: "1.4rem",
      base: "1.6rem",
      h4: "1.8rem",
      h3: "2rem",
      h2: "2.2rem",
      h1: "2.8rem",
    },
    extend: {
      padding: {
        "1.2rem": "1.2rem",
        "2.4rem": "2.4rem",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "10px" },
      });
    }),
  ],
};
