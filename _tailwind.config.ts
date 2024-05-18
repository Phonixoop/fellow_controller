import { type Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: any }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Tremor module
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      fontFamily: {
        iransans: "Iransans",
      },
      textColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      backgroundColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      borderColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      boxShadowColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      fill: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      stroke: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      ringColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      ringOffsetColor: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      gradientColorStops: {
        primary: withOpacity("--primary"),
        secondary: withOpacity("--secondary"),
        primbuttn: withOpacity("--primbuttn"),
        secbuttn: withOpacity("--secbuttn"),
        accent: withOpacity("--accent"),
        ...colors,
      },
      patterns: {
        colors: {
          primary: withOpacity("--primary"),
          secondary: withOpacity("--secondary"),
          primbuttn: withOpacity("--primbuttn"),
          secbuttn: withOpacity("--secbuttn"),
          accent: withOpacity("--accent"),
          ...colors,
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },

          to: { height: "0" },
        },
        move: {
          to: {
            strokeDashoffset: "1000",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      screens: {
        mobileMax: { max: "500px" },
        // => @media (min-width: 640px) { ... }

        laptopMax: { max: "1279px" },
        // => @media (min-width: 1024px) { ... }

        desktopMax: { max: "1280px" },
        // => @media (min-width: 1280px) { ... }

        // --------------------Min--------------------------

        mobileMin: { min: "500px" },
        // => @media (min-width: 640px) { ... }

        laptopMin: { min: "1279px" },
        // => @media (min-width: 1024px) { ... }

        desktopMin: { min: "1280px" },
        // => @media (min-width: 1280px) { ... }

        max2xl: { max: "1536px" },
      },
    },
  },
} satisfies Config;
