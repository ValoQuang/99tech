/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {},
  daisyui: {
    themes: [
      "light",
      "dark",
      "bumblebee",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
    ],
  },
  plugins: [require("daisyui")],
};
