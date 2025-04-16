"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface HorizontalCTAProps {
  videoSrc: string;
  thumbnailSrc: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText: string;
  ctaUrl: string;
  className?: string;
  textColor?: string;
  btnColor?: string;
  btnTextColor?: string;
}

export function HorizontalCTA({
  videoSrc,
  thumbnailSrc,
  title,
  subtitle,
  description,
  ctaText,
  ctaUrl,
  className,
  textColor = "text-white",
  btnColor = "bg-black",
  btnTextColor = "text-white"
}: HorizontalCTAProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle intersection observer to auto-play when in viewport
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideoMuted();
        } else {
          pauseVideo();
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, options);
    
    if (containerRef.current) {
      observerRef.current.observe(containerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Check video source when component mounts
  useEffect(() => {
    // Function to check if video exists
    const checkVideoSource = async () => {
      try {
        const response = await fetch(videoSrc, { method: 'HEAD' });
        if (!response.ok) {
          console.error(`Video file not accessible: ${videoSrc} (Status ${response.status})`);
          setHasError(true);
        }
      } catch (error) {
        console.error(`Error checking video file: ${videoSrc}`, error);
        // Don't set error here as it might just be a CORS issue with HEAD request
      }
    };

    checkVideoSource();
  }, [videoSrc]);

  // Play video function (muted - for autoplay)
  const playVideoMuted = () => {
    if (videoRef.current) {
      // Ensure it's muted for autoplay policies
      videoRef.current.muted = true;
      setIsMuted(true);
      
      // Try to play
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Error during autoplay:", error);
            // Keep thumbnail visible if autoplay fails
            setShowThumbnail(true);
          });
      }
    }
  };

  // Play video function (with user interaction - can be unmuted)
  const playVideo = () => {
    if (videoRef.current) {
      // Play the video
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            // Hide thumbnail after successful play
            setShowThumbnail(false);
          })
          .catch((error) => {
            console.error("Error playing video with user interaction:", error);
          });
      }
    }
  };

  // Pause video function
  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle play/pause with sound control
    const togglePlayPause = () => {
      console.log("togglePlayPause");
    if (isPlaying && !isMuted) {
      // If playing and unmuted, pause the video
      pauseVideo();
    } else if (isPlaying && isMuted) {
      // If playing but muted, unmute and restart from beginning
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        playVideo();
      }
    } else {
      // If not playing, start playing unmuted from beginning
      setIsMuted(false);
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.currentTime = 0;
        playVideo();
      }
    }
  };

  // Handle video loaded data
  const handleVideoLoaded = () => {
    // Only hide thumbnail automatically if video is already playing
    if (isPlaying && !showThumbnail) {
      setShowThumbnail(false);
    }
  };

  // Handle video error
  const handleVideoError = () => {
    setHasError(true);
    setShowThumbnail(true);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl border border-black bg-black aspect-[16/7]",
        className
      )}
    >
      {/* Video/Thumbnail Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        {/* Thumbnail Image */}
        {(showThumbnail || hasError) && (
          <div className="absolute inset-0 z-10">
            <Image
              src={thumbnailSrc}
              alt={title}
              fill
              sizes="100vw"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}

        {/* Video Element */}
        {!hasError && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            muted={isMuted}
            loop={false}
            preload="metadata"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
          >
            <source src={videoSrc} type={videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Gradient Overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-20"></div>
      </div>

      {/* Play/Pause Button */}
      {!hasError && (
        <button
          className="absolute bottom-4 right-4 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
          onClick={togglePlayPause}
          aria-label={isPlaying && !isMuted ? "Pause video" : "Play video with sound"}
        >
          {isPlaying && !isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {/* Content Overlay (Text and CTA) */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-full z-20 p-8 md:p-12 lg:p-16 flex flex-col justify-center",
        textColor
      )}>
        <div className="max-w-[60%]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold italic mb-2">{title}</h2>
          {subtitle && <h3 className="text-lg md:text-xl mt-2 font-medium">{subtitle}</h3>}
          {description && (
            <div className="mt-4">
              {description.split('.').map((line, i) => (
                line.trim() && <p key={i} className="mt-1">{line.trim().toUpperCase()}</p>
              ))}
            </div>
          )}
          
          <Link 
            href={ctaUrl}
            className={cn(
              "mt-6 inline-flex items-center px-6 py-3 border border-white rounded-lg uppercase font-bold transition-all tracking-wide",
              btnColor, 
              btnTextColor,
              "hover:bg-white hover:text-black"
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{ctaText}</span>
          </Link>
        </div>
      </div>

      {/* Overlay for click to play/pause */}
      <div 
        className="absolute inset-0 z-25 cursor-pointer"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      ></div>

      {/* Promoted Label */}
      <div className="absolute top-4 right-4 z-40 bg-gray-800 bg-opacity-50 border border-white rounded-full text-white text-xs px-3 py-1">
        PROMOTED ↗
      </div>
    </div>
  );
} 