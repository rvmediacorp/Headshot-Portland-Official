import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        /* ── Brand ── */
        "brand-teal":       "var(--color-brand-teal)",
        "brand-teal-hover": "var(--color-brand-teal-hover)",
        "brand-teal-deep":  "var(--color-brand-teal-deep)",

        /* ── Dark backgrounds ── */
        "ink":        "var(--color-ink)",
        "ink-black":  "var(--color-ink-black)",
        "ink-footer": "var(--color-ink-footer)",
        "ink-card":   "var(--color-ink-card)",
        "ink-border": "var(--color-ink-border)",

        /* ── Light surfaces ── */
        "off-white":    "var(--color-off-white)",
        "surface-teal": "var(--color-surface-teal)",
        "surface-gray": "var(--color-surface-gray)",
        "cream":        "var(--color-cream)",

        /* ── Text ── */
        "muted-text":  "var(--color-muted-text)",
        "subtle-text": "var(--color-subtle-text)",
        "faint-text":  "var(--color-faint-text)",

        /* ── Accents ── */
        "star":      "var(--color-star)",
        "star-gold": "var(--color-star-gold)",

        /* ── Legacy aliases — existing code keeps working ── */
        "teal-blue": "var(--color-brand-teal)",
        "dark-bg":   "var(--color-ink-black)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        bodoni: ["var(--font-bodoni)"],
        libreBodoni: ["var(--font-libre-bodoni)"],
        bodoniModa: ["var(--font-bodoni-moda)"],
        inter: ["var(--font-inter)"],
        playfair: ["var(--font-playfair)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
export default config
