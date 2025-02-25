/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "borderLine": "#B5B5B5",
        "navBG": "#F7F8F9",
        "buttonBG": "#EDEDED",
        "primary": "#EB5E28",
        "secondary": "#F97333",
        "tertiary": "#F9C87C",
        "quarternary": "#F9C87C",
        "off-white": "#F7F8F9",
        "off-black": "#282828"
      },
    },
  },
  plugins: [],
};
