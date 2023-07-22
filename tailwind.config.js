/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      body: ["League Spartan", "roboto"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    // themes: [
    //   {
    //     mytheme: {
    //       primary: "#113ab2",

    //       secondary: "#ed90a7",

    //       accent: "#a0ea7e",

    //       neutral: "#201d25",

    //       "base-100": "#313046",

    //       info: "#1c4bf2",

    //       success: "#60e2d0",

    //       warning: "#a28006",

    //       error: "#ee8072",
    //     },
    //   },
    //   "forest",
    //   "lemonade",
    // ],
    themes: ["cupcake", "cmyk", "forest", "lemonade"],
  },
});
