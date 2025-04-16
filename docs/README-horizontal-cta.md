# Horizontal CTA Component

A responsive promotional component with full-width video background and text overlay. This component is designed to create engaging call-to-action sections similar to modern advertising banners.

## Features

- **Full-Width Video Background**: Video plays as the background with text overlay
- **Video Autoplay**: Automatically plays video (muted) when the component enters the viewport
- **Interactive Controls**:
  - Tap once to restart video from beginning with sound
  - Tap again to pause video
  - Tap again to resume playback
- **Format Support**: Works with both MP4 and WebM video formats
- **Thumbnail First**: Loads and displays a thumbnail image before video playback begins
- **Gradient Overlay**: Includes a dark gradient on the left side to improve text readability
- **CTA Button**: Includes a stylish call-to-action button that links to an external URL
- **PROMOTED Label**: Includes a promotional tag for advertising use cases
- **Responsive Design**: Maintains proper aspect ratio (16:7) across all screen sizes

## Usage

```jsx
import { HorizontalCTA } from '@/components/horizontal-cta';

// Basic usage
<HorizontalCTA
  videoSrc="/videos/promo.mp4"
  thumbnailSrc="/images/thumbnail.jpg"
  title="Make yourself look good"
  description="CLICK BOOK NOW FROM EITHER THE HEADSHOT OR PORTRAIT PAGE."
  ctaText="GET QUOTE"
  ctaUrl="https://example.com"
  btnColor="bg-transparent"
/>

// With custom styling
<HorizontalCTA
  videoSrc="/videos/promo.mp4"
  thumbnailSrc="/images/thumbnail.jpg"
  title="Professional Headshots"
  description="BOOK YOUR SESSION TODAY. LOOK YOUR BEST FOR YOUR CAREER."
  ctaText="BOOK NOW"
  ctaUrl="https://example.com/book"
  btnColor="bg-blue-500"
  btnTextColor="text-white"
/>
```

## Props

| Prop           | Type   | Required | Default      | Description                                 |
| -------------- | ------ | -------- | ------------ | ------------------------------------------- |
| `videoSrc`     | string | Yes      | -            | URL to the video file (MP4 or WebM)         |
| `thumbnailSrc` | string | Yes      | -            | URL to the thumbnail image                  |
| `title`        | string | Yes      | -            | Main title text                             |
| `subtitle`     | string | No       | -            | Optional subtitle text                      |
| `description`  | string | No       | -            | Description text (periods create new lines) |
| `ctaText`      | string | Yes      | -            | Text for the call-to-action button          |
| `ctaUrl`       | string | Yes      | -            | URL for the call-to-action button           |
| `className`    | string | No       | -            | Additional CSS classes for the component    |
| `textColor`    | string | No       | 'text-white' | Tailwind class for text color               |
| `btnColor`     | string | No       | 'bg-black'   | Tailwind class for button background        |
| `btnTextColor` | string | No       | 'text-white' | Tailwind class for button text color        |

## Design Notes

- The component is designed with a 16:7 aspect ratio which works well for promotional banners
- Text is positioned on the left side of the component with a maximum width of 60%
- A gradient overlay is applied to ensure text readability regardless of the background video/image
- Description text is automatically capitalized and split by periods into separate lines
- The CTA button has a border and transparent background by default with hover effects
- The component includes a "PROMOTED" label in the top right corner

## Technical Notes

- Uses the Intersection Observer API to detect when the component enters the viewport
- Video autoplay is initially muted to comply with browser autoplay policies
- Video playback control is handled through click/tap interactions
- For best performance, videos should be properly compressed and optimized for web delivery
