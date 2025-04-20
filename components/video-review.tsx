"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoReviewProps {
  videoSrc: string;      // Path to video file (mp4 or webm)
  thumbnailSrc: string;  // Path to thumbnail image
  authorName: string;    // Name of the person giving the review
  authorTitle?: string;  // Role/title of the reviewer
  authorCompany?: string; // Company/organization of the reviewer
  reviewText?: string;   // The review text (optional if highlightedText and normalText are provided)
  highlightedText?: string; // Part of review text to highlight
  normalText?: string;   // Part of review text to display normally
  rating?: number;       // Rating from 1-5
  className?: string;    // Optional class for styling
}

export function VideoReview({
  videoSrc,
  thumbnailSrc,
  authorName,
  authorTitle,
  authorCompany,
  reviewText = "",
  highlightedText,
  normalText,
  rating = 5,
  className,
}: VideoReviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSound, setHasSound] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle play/pause toggle
  const togglePlayback = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // If user taps when video is paused, restart from beginning and add sound
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
      setHasSound(true);
    }
  };

  // Setup intersection observer to auto-play when video enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && videoRef.current && !isPlaying) {
          videoRef.current.muted = true; // Auto-play muted by default
          videoRef.current.play().catch(e => console.error("Auto-play failed:", e));
          setIsPlaying(true);
          setHasSound(false); // Auto-play starts without sound
        } else if (!entry.isIntersecting && videoRef.current && isPlaying) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isPlaying]);

  // Update muted state when hasSound changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !hasSound;
    }
  }, [hasSound]);

  // Split review text if not provided as highlighted and normal parts
  let displayHighlightedText = highlightedText;
  let displayNormalText = normalText;
  
  if (!highlightedText && !normalText && reviewText) {
    // Try to find a natural split point for the highlighted part
    const splitIndex = reviewText.indexOf('and');
    if (splitIndex > 0) {
      displayHighlightedText = reviewText.substring(0, splitIndex);
      displayNormalText = reviewText.substring(splitIndex);
    } else {
      // If no "and" is found, highlight first sentence
      const sentenceEnd = reviewText.indexOf('. ');
      if (sentenceEnd > 0) {
        displayHighlightedText = reviewText.substring(0, sentenceEnd + 1);
        displayNormalText = reviewText.substring(sentenceEnd + 1);
      } else {
        // Default: use first 30% of text as highlight
        const splitPoint = Math.floor(reviewText.length * 0.3);
        displayHighlightedText = reviewText.substring(0, splitPoint);
        displayNormalText = reviewText.substring(splitPoint);
      }
    }
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl bg-black max-w-sm mx-auto border border-gray-800 p-4 ",
        className
      )}
      style={{
        maxWidth: "360px",
        aspectRatio: "9/16",
      }}
    >
      {/* Video container with thumbnail as poster */}
      <div className="relative h-full w-full rounded-xl">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          poster={thumbnailSrc}
          playsInline
          loop
          muted
        >
          <source src={videoSrc} type={videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
          Your browser does not support the video tag.
        </video>
        
        {/* Play Button Overlay (centered) */}
        
          <button className="absolute right-4 top-4 z-50" onClick={togglePlayback}>
            <div className="w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </button>
        
        {/* Rating Stars (bottom portion) */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-16 pb-3 px-6">
          {/* Stars */}
          <div className="flex space-x-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>
          
          {/* Author Info */}
          <h3 className="text-2xl font-serif italic text-white mb-1">{authorName}</h3>
          {(authorTitle || authorCompany) && (
            <p className="text-sm text-gray-300 mb-3">
              {authorTitle}
              {authorTitle && authorCompany && ", "}
              {authorCompany}
            </p>
          )}
          
          {/* Review Text with Highlighted and Normal parts */}
          <div className="mt-2">
            {displayHighlightedText && (
              <p className="text-white font-medium">{displayHighlightedText}</p>
            )}
            {displayNormalText && (
              <p className="text-gray-400">{displayNormalText}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 