/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "3rem", 
        xl: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        slate: {
          950: "rgb(var(--color-slate-950) / <alpha-value>)",
          900: "rgb(var(--color-slate-900) / <alpha-value>)",
          850: "rgb(var(--color-slate-850) / <alpha-value>)",
          800: "rgb(var(--color-slate-800) / <alpha-value>)",
          750: "rgb(var(--color-slate-750) / <alpha-value>)",
          700: "rgb(var(--color-slate-700) / <alpha-value>)",
          600: "rgb(var(--color-slate-600) / <alpha-value>)",
          500: "rgb(var(--color-slate-500) / <alpha-value>)",
          400: "rgb(var(--color-slate-400) / <alpha-value>)",
          300: "rgb(var(--color-slate-300) / <alpha-value>)",
          200: "rgb(var(--color-slate-200) / <alpha-value>)",
          100: "rgb(var(--color-slate-100) / <alpha-value>)",
        },
        sidebar: {
          bg: "rgb(var(--color-sidebar-bg) / <alpha-value>)",
          active: "rgb(var(--color-sidebar-active) / <alpha-value>)",
          border: "rgb(var(--color-sidebar-border) / <alpha-value>)",
          text: "rgb(var(--color-sidebar-text) / <alpha-value>)",
          subtext: "rgb(var(--color-sidebar-subtext) / <alpha-value>)",
        },
        bottomnav: {
          bg: "rgb(var(--color-bottomnav-bg) / <alpha-value>)",
          border: "rgb(var(--color-bottomnav-border) / <alpha-value>)",
        },
        layout: {
          bg: "rgb(var(--color-layout-bg) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
