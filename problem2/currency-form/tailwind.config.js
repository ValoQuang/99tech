/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {},
  daisyui: {
    themes: ["sunset", "cupcake", "retro"],
  },
  plugins: [require("daisyui")],
};
