/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EEE3FF",
          600: "#8054C7",
          700: "#5A3696",
          DEFAULT: "#8054C7",
          dark: "#5A3696",
          light: "#EEE3FF",
        },
        secondary: {
          600: "#63D838",
          DEFAULT: "#63D838",
          dark: "#4FB82C",
          light: "#7FE556",
        },
        background: {
          DEFAULT: "#F5F5F5",
          card: "#FFFFFF",
        },
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.15)",
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
