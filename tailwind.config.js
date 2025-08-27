// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", md: "2rem" } },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#16a34a",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
        },
        foreground: "#1f2937",   // texto
        background: "#ffffff",   // fondo
        border: "#e5e7eb",       // bordes suaves
      },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,.06)" },
      transitionTimingFunction: { soft: "cubic-bezier(.22,.61,.36,1)" },
    },
  },
  plugins: [],
};
