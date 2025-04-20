import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface CTAProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  imageBgColor?: string;
  backgroundImage?: string;
  backgroundOverlay?: boolean;
  backgroundOverlayColor?: string;
  textColor?: string;
  ctaUrl: string;
}

export function CTA({
  imageUrl = "",
  imageBgColor = "bg-green-300",
  backgroundImage,
  backgroundOverlay = false,
  backgroundOverlayColor = "rgba(0, 0, 0, 0.5)",
  textColor,
  ctaUrl,
  className,
  ...props
}: CTAProps) {
  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative' as const,
  } : {};

  return (
    <div 
      className={cn(
        "relative rounded-xl overflow-hidden border border-black", 
        backgroundImage && "rounded-xl",
        imageBgColor,
        className
      )}
      style={backgroundStyle}
      {...props}
    >
      {backgroundImage && backgroundOverlay && (
        <div 
          className="absolute inset-0 rounded-xl" 
          style={{ backgroundColor: backgroundOverlayColor }}
        />
      )}

      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="" 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className={`p-12 ${textColor}`}>
          <p className="italic text-2xl">Lorem Ipsum Dolor</p>
          <p className="mt-4">
            CLICK BOOK NOW FROM EITHER THE{" "}
            <span className="font-bold">HEADSHOT</span> OR{" "}
            <span className="font-bold">PORTRAIT</span> PAGE.
            <br />
            CUSTOMIZE YOUR SESSION
          </p>
        </div>
      )}

      <Link 
        href={ctaUrl}
        className="absolute bottom-4 right-4 bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all"
      >
        <ArrowUpRight className="w-5 h-5 text-white" />
      </Link>
    </div>
  );
} 