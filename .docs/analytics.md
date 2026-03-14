# Analytics

## Google Ads

- **Account ID**: `AW-847156852`
- **Thank-you conversion label**: `DiA7CM_nqYEDEPSs-pMD`

The conversion fires in `app/thank-you/page.tsx`:

```tsx
window.gtag('event', 'conversion', {
  send_to: 'AW-847156852/DiA7CM_nqYEDEPSs-pMD',
})
```

## Google Tag Manager (gtag.js)

Injected in `app/layout.tsx` via two `<Script>` tags:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-847156852" />
```

Followed by the inline init script that calls `gtag('config', 'AW-847156852')`.

## Page view tracking

`components/google-analytics.tsx` wraps a `useEffect` that fires `gtag('event', 'page_view')` on pathname change. It is included in `app/layout.tsx` so it runs on all pages.

## Conversion flow

```
User fills quote form → submits → redirected to /thank-you
  → app/thank-you/page.tsx mounts
  → window.gtag('event', 'conversion', ...) fires
  → Google Ads records conversion
```

## Notes

- Do not remove the `<Script strategy="afterInteractive">` tags from `app/layout.tsx` — removing them breaks conversion tracking.
- The thank-you page conversion fires client-side. If `window.gtag` is undefined (e.g. ad blocker), it fails silently — this is expected behavior.
