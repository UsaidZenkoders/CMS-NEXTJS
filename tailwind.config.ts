import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      colors: {
        'custom-white': '#f8f9fa', // Whitish color
        'custom-gray-light': '#e0e0e0', // Light gray color
        'custom-gray': '#b0b0b0', // Gray color
      },
    },
  },
  plugins: [require("tailwindcss-animate"),require("daisyui")],
} satisfies Config

export default config