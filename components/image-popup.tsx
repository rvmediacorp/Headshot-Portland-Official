"use client"

import * as React from "react"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImagePopupProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: number
  width?: number
  height?: number
  name?: string
  title?: string
  quote?: string
  date?: string
  camera?: string
  priority?: boolean
}

export function ImagePopup({
  src,
  alt,
  className,
  aspectRatio = 1, 
  width = 500,
  height = 500,
  name,
  title,
  quote,
  date,
  camera,
  priority = false,
}: ImagePopupProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div 
        className={cn("cursor-pointer overflow-hidden rounded-xl", className)}
        onClick={() => setOpen(true)}
      >
        <AspectRatio ratio={aspectRatio}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-full w-full object-cover transition-all hover:scale-105"
            priority={priority}
          />
        </AspectRatio>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-black text-white p-0 md:max-w-[800px]">
          <DialogClose className="absolute right-4 top-4 z-10 rounded-sm text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
              <AspectRatio ratio={aspectRatio}>
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className="h-full w-full object-cover"
                  priority
                />
              </AspectRatio>
            </div>
            
            <div className="p-6 flex flex-col justify-center">
              {name && (
                <DialogTitle className="text-2xl italic font-medium mb-1">
                  {name}
                </DialogTitle>
              )}
              
              {title && (
                <DialogDescription className="text-gray-400 mb-4">
                  {title}
                </DialogDescription>
              )}
              
              {quote && (
                <div className="mb-6">
                  <div className="text-4xl font-serif leading-none mb-2">"</div>
                  <p className="text-sm text-gray-300">{quote}</p>
                </div>
              )}
              
              {(date || camera) && (
                <div className="mt-auto pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-medium mb-2">Details</h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {date && (
                      <li className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                        </span>
                        {date}
                      </li>
                    )}
                    {camera && (
                      <li className="flex items-center gap-2">
                        <span className="inline-block w-4 h-4">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                            <circle cx="12" cy="13" r="3" />
                          </svg>
                        </span>
                        {camera}
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 