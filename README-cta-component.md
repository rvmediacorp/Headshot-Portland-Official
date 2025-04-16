# CTA Component

A responsive, customizable Call-to-Action component for Headshot Portland website.

![CTA Component Preview](https://i.imgur.com/example-image.jpg)

## Features

- Clean, modern design with blue gradient background
- Visual diagonal lines overlay for depth
- Two customizable CTA buttons
- Responsive layout for all screen sizes
- Customizable title, subtitle, and description
- Headshot Portland branding in top-right corner

## Usage

```jsx
import CtaSection from "@/components/double-cta";

// Basic usage with defaults
<CtaSection />

// With custom content
<CtaSection
  title="Professional"
  subtitle="Headshots"
  description="and we get it—being in front of the camera can be intimidating. Our team of expert photographers will guide you through a comfortable and enjoyable session."
  primaryCta={{ text: "GET QUOTE", url: "/pricing" }}
  secondaryCta={{ text: "BOOK NOW", url: "/schedule" }}
  backgroundColor="bg-blue-600"
/>
```

## Props

| Prop              | Type     | Default                                | Description                              |
| ----------------- | -------- | -------------------------------------- | ---------------------------------------- |
| `title`           | `string` | "Lorem Ipsum"                          | Main heading (first line)                |
| `subtitle`        | `string` | "Dolor"                                | Secondary heading (second line)          |
| `description`     | `string` | "and we get it—being..."               | Main descriptive text                    |
| `primaryCta`      | `object` | `{ text: "GET QUOTE", url: "/quote" }` | Primary button configuration             |
| `secondaryCta`    | `object` | `{ text: "BOOK NOW", url: "/book" }`   | Secondary button configuration           |
| `backgroundColor` | `string` | "bg-[#29a9e1]"                         | Background color (Tailwind class or hex) |
| `className`       | `string` | `undefined`                            | Additional CSS classes                   |

## Customization

The component uses Tailwind CSS for styling. You can customize it by:

1. Passing a custom `className` prop for container styles
2. Modifying the `backgroundColor` prop for different background colors
3. Customizing text content via props
4. Adjusting button text and URLs via props

## Responsive Behavior

- **Mobile:** Stacks elements vertically and adjusts spacing
- **Tablet/Desktop:** Maintains proper spacing with larger text

## Background Effects

The component uses multiple layers to create depth:

1. Base solid color (customizable via `backgroundColor`)
2. SVG diagonal line pattern overlay
3. Bottom gradient for additional visual interest

## Dependencies

- Next.js
- Tailwind CSS
- @/lib/utils
- @/components/ui/button

## Example

```jsx
<CtaSection
  title="Stand Out"
  subtitle="With Confidence"
  description="and we understand the importance of making a great first impression. Our professional headshots help you project confidence and approachability."
  primaryCta={{ text: "VIEW GALLERY", url: "/gallery" }}
  secondaryCta={{ text: "CONTACT US", url: "/contact" }}
  backgroundColor="bg-indigo-600"
/>
```
