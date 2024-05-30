import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["winter"],
  },
};
export default config;
