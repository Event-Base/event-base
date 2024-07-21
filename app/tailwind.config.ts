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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }:any) {
      addUtilities(
          {
              ".custom-scrollbar": {
                  overflow: "auto",
              },
              ".custom-scrollbar::-webkit-scrollbar": {
                  width: "8px",
              },
              ".custom-scrollbar::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
              },
              ".custom-scrollbar::-webkit-scrollbar-thumb": {
                  background: "#888",
                  "border-radius": "3px",
              },
              ".custom-scrollbar::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
              },
              ".custom-scrollbar::-webkit-scrollbar-thumb:active": {
                  background: "#333",
              },
              ".custom-scrollbar::-webkit-scrollbar-corner": {
                  background: "transparent",
              },
              // ".custom-scrollbar": {
              //     "-ms-overflow-style": "auto" /* IE and Edge */,
              //     "scrollbar-width": "auto" /* Firefox */,
              // },
              // ".custom-scrollbar::-webkit-scrollbar": {
              //     width: "12px" /* Chrome, Safari, and Opera */,
              // },
          },
          ["responsive", "hover"]
      );
  },
  ],
} satisfies Config

export default config