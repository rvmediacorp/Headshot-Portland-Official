import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { inter, bodoni, playfair, bodoniModa } from "./fonts"
import Script from "next/script"

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
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/LTCBodoni175Pro-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-847156852" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-847156852');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
