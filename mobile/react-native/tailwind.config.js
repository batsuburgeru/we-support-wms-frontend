/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins-Regular', 'sans-serif'],
        "poppins-bold": ['Poppins-Bold', 'sans-serif'],
        "poppins-extrabold": ['Poppins-ExtraBold', 'sans-serif'],
        "poppins-extralight": ['Poppins-ExtraLight', 'sans-serif'],
        "poppins-light": ['Poppins-Light', 'sans-serif'],
        "poppins-medium": ['Poppins-Medium', 'sans-serif'],
        "poppins-semibold": ['Poppins-SemiBold', 'sans-serif'],
        "poppins-thin": ['Poppins-Thin', 'sans-serif'],
      },
      colors: {
        "primary": "#EB5E28",
        "secondary": "#F97333",
        "tertiary": "#F9C87C",
        "quarternary": "#FFE9C8",
        "white": "#FFFFFF",
        "light": "#F7F8F9",
        "gray": "#282828",
        "black": "#000000",
        "input": "#A9A9A9",
        "bgin": "#EDEDED"

      }
    },
  },
  plugins: [],
}