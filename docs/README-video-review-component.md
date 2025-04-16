# Video Review Component

A responsive video review component that displays customer testimonials with videos, styled to match the reference design.

## Features

- Supports MP4 and WebM video formats
- Loads thumbnail image first (as poster) for better performance
- Automatically plays video when it enters the viewport
- Autoplays muted by default (browser policy compliance)
- User can tap to restart video with sound
- User can tap to pause video
- Shows a play button overlay
- Displays reviewer information, rating stars, and testimony
- Styled with a dark theme and gradient overlay
- Supports highlighting part of the review text
- Fully responsive design
- Customizable through props

## Usage

```tsx
import { VideoReview } from "@/components/video-review";

// Basic usage
export default function MyPage() {
  return (
    <VideoReview
      videoSrc="/path/to/your/video.mp4"
      thumbnailSrc="/path/to/thumbnail.jpg"
      authorName="Reviewer Name"
      authorTitle="Reviewer Title"
      authorCompany="Company Name"
      reviewText="The review text goes here..."
      rating={5}
    />
  );
}

// With highlighted and normal text portions
export function WithHighlightedText() {
  return (
    <VideoReview
      videoSrc="/path/to/your/video.mp4"
      thumbnailSrc="/path/to/thumbnail.jpg"
      authorName="Reviewer Name"
      authorTitle="Reviewer Title"
      authorCompany="Company Name"
      highlightedText="This part will be white and highlighted"
      normalText="This part will be gray text"
      rating={5}
    />
  );
}
```

## Props

| Prop            | Type   | Required | Default | Description                                                                              |
| --------------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------- |
| videoSrc        | string | Yes      | -       | Path to video file (mp4 or webm)                                                         |
| thumbnailSrc    | string | Yes      | -       | Path to thumbnail image shown before video plays                                         |
| authorName      | string | Yes      | -       | Name of the person giving the review                                                     |
| authorTitle     | string | No       | -       | Role/title of the reviewer                                                               |
| authorCompany   | string | No       | -       | Company/organization of the reviewer                                                     |
| reviewText      | string | No\*     | -       | The complete review text (\*required if highlightedText and normalText are not provided) |
| highlightedText | string | No       | -       | Part of review text to highlight in white color                                          |
| normalText      | string | No       | -       | Part of review text to display in gray color                                             |
| rating          | number | No       | 5       | Rating from 1-5 stars                                                                    |
| className       | string | No       | -       | Optional CSS class for custom styling                                                    |

## Text Display

You can control how the review text is displayed in two ways:

1. **Single reviewText prop**: Provide just the `reviewText` prop, and the component will automatically split it into highlighted and normal parts.

2. **Split text props**: Use `highlightedText` and `normalText` props to explicitly control which parts are highlighted and which are shown in a normal style.

When using the `reviewText` prop alone, the component will attempt to intelligently split the text:

- First it looks for the word "and" as a natural split point
- If not found, it uses the first sentence
- As a fallback, it highlights the first 30% of the text

## Behavior

1. When the component enters the viewport, the video starts playing automatically but muted (to comply with browser autoplay policies)
2. A thumbnail image is shown before the video loads
3. User can tap/click the video to:
   - If playing: Pause the video
   - If paused: Restart the video from the beginning with sound
4. Play button appears in the top-right when paused
5. Review information appears in a gradient overlay at the bottom

## Styling

The component matches the reference design with:

- Default width of 360px with 9:16 aspect ratio
- Dark theme with gradient overlay
- Five yellow stars
- Author name in italic serif font
- Highlighted and normal text portions
- Thin border

## Example

See a working example at `/app/examples/video-review`

## Browser Support

This component uses modern browser features:

- IntersectionObserver API for viewport detection
- HTML5 Video element
- CSS Grid for responsive layout

Compatible with all modern browsers (Chrome, Firefox, Safari, Edge).
