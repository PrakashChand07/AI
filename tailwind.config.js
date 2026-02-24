import colors from 'tailwindcss/colors';
import prelinePlugin from 'preline/plugin';
import formPlugin from '@tailwindcss/forms';
const config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}", "node_modules/preline/dist/*.js"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "10rem"
      }
    },
    fontFamily: {
      jost: ["Jost", "sans-serif"]
    },
    extend: {
      colors: {
        primary: "#7080FF",
        "primary-hover": "#5e6ce6",
        default: colors.slate
      }
    }
  },
  plugins: [prelinePlugin, formPlugin]
};
export default config;