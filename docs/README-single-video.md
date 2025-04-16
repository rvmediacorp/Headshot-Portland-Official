# SingleVideo Component

A responsive video component that supports mp4 and WebM formats with the following features:

- Preloads and displays a thumbnail image until the video is ready to play
- Automatically plays when the component enters the viewport (optional)
- Initially plays muted
- First tap unmutes the video and restarts it from the beginning
- Second tap toggles pause/play
- Responsive design that works across different screen sizes
- Supports portrait, landscape, and square videos
- Plays inline on the page
- Handles errors gracefully if the video file isn't available

## Props

| Prop         | Type                              | Description                                    | Required | Default |
| ------------ | --------------------------------- | ---------------------------------------------- | -------- | ------- |
| videoSrc     | string                            | URL to the video file (mp4 or webm)            | Yes      | -       |
| thumbnailSrc | string                            | URL to the thumbnail image                     | Yes      | -       |
| alt          | string                            | Alt text for the thumbnail image               | Yes      | -       |
| className    | string                            | Optional custom classes to style the container | No       | -       |
| autoPlay     | boolean                           | Whether video should autoplay when in viewport | No       | true    |
| aspectRatio  | "video" \| "portrait" \| "square" | Aspect ratio of the video                      | No       | "video" |
| objectFit    | "cover" \| "contain"              | How the video should fit within its container  | No       | "cover" |

## Usage Example

```tsx
import { SingleVideo } from "@/components/ui/single-video";

export default function VideoSection() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Standard landscape video (16:9) */}
      <SingleVideo
        videoSrc="/videos/landscape-video.mp4"
        thumbnailSrc="/images/landscape-thumbnail.jpg"
        alt="Landscape format video"
        className="rounded-lg shadow-md"
      />

      {/* Portrait video (9:16) for mobile content */}
      <div className="max-w-xs mx-auto mt-8">
        <SingleVideo
          videoSrc="/videos/portrait-video.mp4"
          thumbnailSrc="/images/portrait-thumbnail.jpg"
          alt="Portrait format video"
          className="rounded-lg shadow-md"
          aspectRatio="portrait"
        />
      </div>

      {/* Square video (1:1) for Instagram-style content */}
      <div className="max-w-md mx-auto mt-8">
        <SingleVideo
          videoSrc="/videos/square-video.mp4"
          thumbnailSrc="/images/square-thumbnail.jpg"
          alt="Square format video"
          className="rounded-lg shadow-md"
          aspectRatio="square"
          autoPlay={false}
          objectFit="contain"
        />
      </div>
    </div>
  );
}
```

## Aspect Ratio Options

The component supports three different aspect ratios:

1. **video** (default): Standard 16:9 widescreen format
2. **portrait**: Vertical 9:16 format for mobile/portrait videos
3. **square**: 1:1 square format for social media content

## Object Fit Options

You can control how the video fills its container:

1. **cover** (default): Video fills the entire container, potentially cropping parts of the video
2. **contain**: Video is scaled to fit within the container without cropping

## Troubleshooting

If your video is not playing:

1. **Check file paths**: Make sure your video files are correctly placed in the public directory (e.g., `/public/videos/`)
2. **File format**: Ensure the video is in mp4 or webm format
3. **Browser support**: Some older browsers may not support certain video codecs
4. **Video file access**: The component checks if the video file is accessible and displays an error state if not
5. **Console logs**: Check browser console for detailed error messages

## Responsive Behavior

The component is designed to be fully responsive:

- Uses the specified aspect ratio to maintain proper proportions
- Adapts to the width of its container
- Optimizes the image loading with Next.js Image component

## Accessibility

- Includes proper aria-labels for play/pause buttons
- Provides fallback text for browsers that don't support the video tag
- Uses semantic HTML elements

## Browser Support

The component supports all modern browsers. For older browsers that don't support the video formats, a fallback message is displayed.
