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
        // Marca: Turquesa predominante + acentos en verde limón
        primary: {
          DEFAULT: "#009D98", // R0 G157 B152
          600: "#009D98",
          700: "#007E7A",
          800: "#006865",
        },
        accent: {
          DEFAULT: "#AFCA0B", // Verde limón
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
