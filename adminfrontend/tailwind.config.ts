/** @format */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "back-color": "rgba(0, 0, 0, 0.2)",
        "gradient-gray":
          "background: linear-gradient(10deg, rgba(245,168,18,1) 0%, rgba(227,227,227,1) 48%);",
      },
      backgroundImage: {
        "admin-cover": "url('/assets/LoginCover.webp')",
      },
    },
  },
  plugins: [],
};
export default config;
