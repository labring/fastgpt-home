import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          foreground: "#FFFFFF",
          DEFAULT: "#3B82F6",
          dark: "#2563eb",
        },
        // Home theme tokens — pull from CSS vars scoped to .home so a single
        // source of truth (globals.css) drives both Tailwind classes and any
        // inline `var(--home-*)` references.
        ink: "var(--home-dark)",
        "ink-slate": "var(--home-slate)",
        "ink-meta": "var(--home-meta)",
        "ink-sub": "var(--home-secondary)",
        "ink-muted": "var(--home-muted)",
        "btn-dark": "var(--home-btn-dark)",
        "btn-border": "var(--home-btn-border)",
        "btn-light-border": "var(--home-btn-light-border)",
        "btn-light-bg": "var(--home-btn-light-bg)",
        "light-bg": "var(--home-light-bg)",
        "card-bg": "var(--home-card-bg)",
        "social-bg": "var(--home-social-bg)",
        hairline: "var(--home-hairline)",
        "hairline-soft": "var(--home-border)",
        // customers 案例中心专属 token（增量，与现有 token 无冲突）
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0052d9",
          700: "#0047b8",
          800: "#075985",
          900: "#091e42",
        },
        surface: {
          100: "#f5f6f7",
          200: "#eff0f1",
          300: "#dee0e3",
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
      boxShadow: {
        "elevation-1": "0 1px 2px rgba(31, 35, 41, 0.06), 0 0 0 1px rgba(31, 35, 41, 0.03)",
        "elevation-2": "0 6px 16px -8px rgba(31, 35, 41, 0.14), 0 2px 6px rgba(31, 35, 41, 0.04)",
        "elevation-3": "0 12px 28px -12px rgba(31, 35, 41, 0.18), 0 4px 10px rgba(31, 35, 41, 0.05)",
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
        "scrolling-banner": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-50% - var(--gap)/2))" },
        },
        "scrolling-banner-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-50% - var(--gap)/2))" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "home-fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "home-count-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scrolling-banner": "scrolling-banner var(--duration) linear infinite",
        "scrolling-banner-vertical": "scrolling-banner-vertical var(--duration) linear infinite",
        marquee: "marquee 30s linear infinite",
        "home-fade-in": "home-fade-in 0.3s ease-out",
        "home-count-up": "home-count-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography"), heroui()],
} satisfies Config

export default config
