import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { inter, bodoni, playfair, bodoniModa } from "./fonts"
import Script from "next/script"
import Navbar from "@/components/navbar"
import StickyCTA from "@/components/sticky-cta"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Agentation } from "agentation"

export const metadata: Metadata = {
  title: "Headshot Portland - Professional Photography Studio",
  description: "Portland's top-rated headshot and portrait photography studio",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bodoni.variable} ${playfair.variable} ${bodoniModa.variable}`}>
      <head>
        {/* Preload LCP image (video poster) */}
        <link
          rel="preload"
          href="/modern-photography-studio.webp"
          as="image"
          type="image/webp"
        />
        {/* Google tag (gtag.js) — lazyOnload to avoid competing with LCP */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-847156852" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-847156852');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <StickyCTA />
        <SpeedInsights />
        <Analytics />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  )
}
