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

/**
 * GTM container. Set NEXT_PUBLIC_GTM_CONTAINER_ID in Vercel (Production +
 * Preview) to switch tagging on — the loader is a no-op until it is set.
 */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ?? ""

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
        {/*
          Consent Mode v2 — MUST run before GTM and gtag.js, hence
          beforeInteractive. Granted by default: this site advertises to US
          traffic only, where CCPA/CPRA is an opt-out regime. If you ever run
          ads into the EEA/UK, this must become denied-by-default plus a banner
          that calls gtag('consent','update', ...) on accept.
        */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted',
              analytics_storage: 'granted',
              functionality_storage: 'granted',
              security_storage: 'granted'
            });
            gtag('set', 'ads_data_redaction', false);
            gtag('set', 'url_passthrough', true);
          `}
        </Script>
        {/* Google Tag Manager — owns conversion tags. Skipped if the ID is unset. */}
        {GTM_ID ? (
          <Script id="gtm-loader" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        ) : null}
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
        {/* LeadPipe — B2B visitor identification / fingerprint-based lead feed. */}
        <Script
          id="leadpipe"
          src="https://leadpipe.aws53.cloud/p/0185ff98-20cd-4e9b-99e4-4c59098a8ec1.js"
          strategy="lazyOnload"
        />
      </head>
      <body suppressHydrationWarning>
        {/* GTM noscript — must be the first thing inside <body>. */}
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm-noscript"
            />
          </noscript>
        ) : null}
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
