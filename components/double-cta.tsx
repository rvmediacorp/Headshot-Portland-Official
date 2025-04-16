import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    url: string;
  };
  secondaryCta?: {
    text: string;
    url: string;
  };
  className?: string;
  backgroundColor?: string;
  width?: string;
}

export default function CtaSection({
  title = "Lorem Ipsum",
  subtitle = "Dolor",
  description = "and we get it—being in front of the camera can be...uncomfortable. Our response: \"Leave it to the pros.\" We'll help make the experience comfortable and fun! We specialize in posing and smile coaching",
  primaryCta = {
    text: "GET QUOTE",
    url: "/quote"
  },
  secondaryCta = {
    text: "BOOK NOW",
    url: "/book"
  },
  className,
  backgroundColor = "bg-[#29a9e1]", // Default blue color from the image
  width = "w-full", // Allow for customizable width
}: CtaSectionProps) {
  return (
    <div className={cn(`${width} rounded-xl overflow-hidden shadow-sm`, className)}>
      {/* Main section with blue background */}
      <div className={cn("w-full p-10 md:p-12 relative", backgroundColor)}>
        {/* Headshot Portland logo */}
        <div className="absolute top-8 right-8 z-10">
          <div className="text-white font-bold">
            <div className="text-3xl leading-none">HEADSHOT</div>
            <div className="text-sm tracking-[0.3em] mt-1">PORTLAND</div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="max-w-2xl relative z-10">
          <div className="italic text-4xl md:text-5xl text-white font-light leading-tight">
            {title}
            <div>{subtitle}</div>
          </div>
          
          <div className="mt-6">
            <p className="text-white text-base md:text-lg">
              <strong>We hear this all the time,</strong> {description}
            </p>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-white text-[#0978a0] hover:bg-gray-100 hover:text-[#0978a0] font-semibold text-base rounded-lg px-10 py-5 h-auto">
              <Link href={primaryCta.url}>{primaryCta.text}</Link>
            </Button>
            <Button asChild className="bg-[#2696c2] text-white hover:bg-[#1e85ac] border border-white font-semibold text-base rounded-lg px-10 py-5 h-auto">
              <Link href={secondaryCta.url}>{secondaryCta.text}</Link>
            </Button>
          </div>
        </div>
        
        {/* Diagonal lines overlay */}
        <div 
          className="absolute bottom-0 right-0 w-80 h-40 z-0" 
          style={{
            backgroundImage: "url(/images/diagonal-lines.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom right",
            backgroundRepeat: "no-repeat",
            opacity: 0.7
          }}
        ></div>
        
        {/* Bottom gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-32 z-0"
          style={{
            background: "linear-gradient(to top, rgba(28, 140, 192, 0.3), transparent)"
          }}
        ></div>
      </div>
    </div>
  );
} 