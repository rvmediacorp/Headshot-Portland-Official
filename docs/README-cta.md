# CTA Component

A responsive call-to-action component with the following features:

- Supports custom background images or solid color backgrounds
- Optional background overlay with customizable opacity
- Includes a visually appealing arrow icon for better user engagement
- Accepts custom text content or uses default placeholder
- Fully responsive design that works across different screen sizes
- Direct link to any URL for driving traffic
- Customizable border styling

## Props

| Prop                   | Type    | Description                                    | Required | Default           |
| ---------------------- | ------- | ---------------------------------------------- | -------- | ----------------- |
| ctaUrl                 | string  | URL that the CTA links to                      | Yes      | -                 |
| imageUrl               | string  | URL to an image to display                     | No       | ""                |
| backgroundImage        | string  | URL to a background image                      | No       | -                 |
| imageBgColor           | string  | Background color class (Tailwind)              | No       | "bg-green-300"    |
| backgroundOverlay      | boolean | Whether to show a background overlay           | No       | false             |
| backgroundOverlayColor | string  | Color of the background overlay                | No       | "rgba(0,0,0,0.5)" |
| className              | string  | Optional custom classes to style the container | No       | -                 |

## Usage Example

```tsx
import { CTA } from "@/components/ui/cta";

export default function CTASection() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Basic CTA with default styling */}
      <div className="w-80 h-64">
        <CTA ctaUrl="/contact" />
      </div>

      {/* CTA with background image */}
      <div className="w-80 h-64">
        <CTA ctaUrl="/schedule" backgroundImage="/images/background.jpg" />
      </div>

      {/* CTA with background image and overlay */}
      <div className="w-80 h-64">
        <CTA
          ctaUrl="/pricing"
          backgroundImage="/images/background.jpg"
          backgroundOverlay={true}
          backgroundOverlayColor="rgba(0, 0, 0, 0.6)"
        />
      </div>

      {/* CTA with custom image */}
      <div className="w-80 h-64">
        <CTA ctaUrl="/portfolio" imageUrl="/images/custom-image.jpg" />
      </div>

      {/* CTA with custom background color */}
      <div className="w-80 h-64">
        <CTA ctaUrl="/about" imageBgColor="bg-blue-300" className="shadow-lg" />
      </div>
    </div>
  );
}
```

## Background Options

The component supports different background options:

1. **Default content**: Shows default Lorem Ipsum text with booking instructions
2. **Custom image**: Displays the provided image using the `imageUrl` prop
3. **Background image**: Sets a background image for the entire component using the `backgroundImage` prop
4. **Background color**: Customizes the background color using the `imageBgColor` prop with Tailwind classes

## Overlay Options

You can add a semi-transparent overlay on top of background images:

1. **Enable overlay**: Set `backgroundOverlay` to `true` to add an overlay
2. **Customize color**: Change the overlay color and opacity with `backgroundOverlayColor` (e.g., "rgba(0, 0, 0, 0.6)")

## Troubleshooting

If your CTA is not displaying correctly:

1. **Check image paths**: Make sure your image files are correctly placed in the public directory (e.g., `/public/images/`)
2. **Size container**: The CTA component adapts to its container's size - wrap it in a div with specific dimensions
3. **Tailwind classes**: Ensure you're using valid Tailwind classes for `imageBgColor`
4. **Border styling**: The component includes a border by default - use `className` to override if needed

## Responsive Behavior

The component is designed to be fully responsive:

- Adapts to the width and height of its container
- Maintains proper proportions for images
- Displays correctly on mobile and desktop devices

## Accessibility

- Uses semantic HTML elements
- Provides proper link functionality
- Arrow icon enhances visual indication of clickability

## Browser Support

The component supports all modern browsers with proper display of images and background elements.
