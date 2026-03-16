"use client"

import Image from "next/image"

interface ExactMasonryGridProps {
  useOriginalHeight?: boolean
}

export default function ExactMasonryGrid({ useOriginalHeight = false }: ExactMasonryGridProps) {
  if (useOriginalHeight) {
    return (
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="grid-masonry">
          {/* Column 1 */}
          <div className="masonry-col">
            <div className="masonry-item rounded-[12px] overflow-hidden mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-1.webp"
                alt="Professional headshot of man in dark clothing"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
            <div className="masonry-item rounded-[12px] overflow-hidden mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-2.webp"
                alt="Professional headshot of man with beard in suit"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
            <div className="masonry-item rounded-[12px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-9.webp"
                alt="Professional headshot of woman with brown hair in blazer"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="masonry-col pt-12">
            <div className="masonry-item rounded-[12px] overflow-hidden mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-5.webp"
                alt="Professional headshot of woman with curly hair"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
            <div className="masonry-item rounded-[12px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-3.webp"
                alt="Professional headshot of Asian man in denim shirt"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="masonry-col">
            <div className="masonry-item rounded-[12px] overflow-hidden mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-4.webp"
                alt="Professional headshot of woman with blonde hair"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
            <div className="masonry-item rounded-[12px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-8.webp"
                alt="Professional headshot of man with longer hair"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Column 4 */}
          <div className="masonry-col pt-16">
            <div className="masonry-item rounded-[12px] overflow-hidden mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-7.webp"
                alt="Professional headshot of bald man with mustache in suit"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
            <div className="masonry-item rounded-[12px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/headshot-6.webp"
                alt="Professional closeup headshot of young man with beard"
                className="w-full rounded-[12px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Original implementation with fixed heights
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="grid-masonry">
        {/* Column 1 */}
        <div className="masonry-col">
          <div className="masonry-item h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-1.webp"
              alt="Professional headshot of man in dark clothing"
              fill
              className="object-cover object-center rounded-[12px]"
            />
          </div>
          <div className="masonry-item h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-2.webp"
              alt="Professional headshot of man with beard in suit"
              fill
              className="object-cover object-center rounded-[12px]"
            />
          </div>
          <div className="masonry-item h-[240px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-9.webp"
              alt="Professional headshot of woman with brown hair in blazer"
              fill
              className="object-cover object-top rounded-[12px]"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="masonry-col">
          <div className="masonry-item h-[400px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-5.webp"
              alt="Professional headshot of woman with curly hair"
              fill
              className="object-cover object-top rounded-[12px]"
            />
          </div>
          <div className="masonry-item h-[200px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-3.webp"
              alt="Professional headshot of Asian man in denim shirt"
              fill
              className="object-cover rounded-[12px]"
              style={{ objectPosition: "center 30%" }}
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="masonry-col">
          <div className="masonry-item h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-4.webp"
              alt="Professional headshot of woman with blonde hair"
              fill
              className="object-cover object-center rounded-[12px]"
            />
          </div>
          <div className="masonry-item h-[320px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-8.webp"
              alt="Professional headshot of man with longer hair"
              fill
              className="object-cover object-top rounded-[12px]"
            />
          </div>
        </div>

        {/* Column 4 */}
        <div className="masonry-col">
          <div className="masonry-item h-[320px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-7.webp"
              alt="Professional headshot of bald man with mustache in suit"
              fill
              className="object-cover object-center rounded-[12px]"
            />
          </div>
          <div className="masonry-item h-[180px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/headshot-6.webp"
              alt="Professional closeup headshot of young man with beard"
              fill
              className="object-cover object-center rounded-[12px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
