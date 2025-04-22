import { Inter, Bodoni_Moda, Playfair_Display } from "next/font/google"
import localFont from "next/font/local"

// Load Inter font from Google Fonts
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

// Load Bodoni Moda from Google Fonts
export const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bodoni-moda",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["Georgia", "serif"],
})

// Load LTC Bodoni 175 Pro from local files
export const bodoni = localFont({
  src: [
    {
      path: "./fonts/LTCBodoni175Pro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    // Uncomment and add additional weights when available
    // {
    //   path: './fonts/LTCBodoni175Pro-Bold.woff2',
    //   weight: '700',
    //   style: 'normal',
    // },
  ],
  display: "swap",
  variable: "--font-bodoni",
  preload: true,
  fallback: ["Georgia", "serif"],
})

// Load Playfair Display from Google Fonts instead of local files
export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["Georgia", "serif"],
})
