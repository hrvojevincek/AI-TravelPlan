/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        yellow: {
          50: "#FFFAEB",
          100: "#FFF4D2",
          200: "#FEE9A4",
          300: "#FEDF7C",
          400: "#FDD44E",
          500: "#FDC921",
          600: "#E3AF02",
          700: "#AC8402",
          800: "#6F5501",
          900: "#382B01",
          950: "#1E1700",
        },
      },
    },
  },
  plugins: [],
};
