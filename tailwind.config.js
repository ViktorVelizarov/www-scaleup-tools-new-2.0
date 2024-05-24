const {nextui} = require('@nextui-org/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [nextui()],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
   
  ],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundColor: {
        "whitesmoke": "#f5f5f5",
      },
      backgroundImage: {
        hero: "url('/static/su-tools-bg.png')",
        header: "url('/static/headerMobile.jpg')",
        privacy: "url('/static/privacy.jpg')",
        bgLux: "url('/static/cities/luxembourg_dark.png')",
        bgPra: "url('/static/cities/prague_dark.png')",
        bgKe: "url('/static/cities/kosice_dark.png')",
        bgWar: "url('/static/cities/warsaw_dark.png')",
        bgBer: "url('/static/cities/berlin_dark.png')",
        bgDub: "url('/static/cities/dubai_dark.png')",
        contactUsHero: "url('/static/contactHero.jpg')",
        "gradient-main":
          "linear-gradient(225deg, #FFB300 0%, #FD6F0F 100%)",
        "reverse-gradient-main":
          "linear-gradient(135deg, #FFB300 0%, #FD6F0F 100%)",
      },
      boxShadow: {
        yellow: "inset 6000px 0 0 0 rgba(202, 138, 4, 0.6)",
      },
      colors: {
        primary: "#ffb300",
        "primary-dark": "#eba50f",
        "accent-orange": "#fd6f0f",
        "accent-redish": "#ee474c",
        "accent-pink": "#c0368b",
        "accent-purplish": "#c0368b",
        "accent-purple": "#8c4ea0",
        threeD: "rgb(248, 113, 113)",
        "tag-color-1": "#B222B4",
        "tag-color-2": "#19B8FA",
        "tag-color-3": "#FF9002",
        "tag-color-4": "#F7374A",
        "tag-color-6": "#FF6B07",
        "tag-color-5": "#E0395D",
        "tag-color-6": "#6355BB",
        "tag-color-7": "#CA3572",
        "tag-color-8": "#D65263",
        "tag-color-9": "#696DD6",
        "color-primary": "#ffb300",
        "secondary-section": "#F5F5F5",
        valid: "#60d394",
        attention: "#ee6055",
      },
      boxShadow: {
        orange: "inset 6000px 0 0 0 rgba(253, 111, 15, 0.7)",
      },
      keyframes: {
        moveUpDown: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        moveUpAndDown: "moveUpDown 3.5s ease-in-out infinite",
      },
    },
  },
};
