/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: { // tailwind'de gridler sabittir biz farklı ekleyebiliyoruz!
        "card": "repeat(auto-fill,minmax(150px,1fr))",
      },
    },
  },
  plugins: [],
};
