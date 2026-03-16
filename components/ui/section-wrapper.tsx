import { cn } from "@/lib/utils"

type SectionBackground = "ink" | "black" | "cream" | "white"

interface SectionWrapperProps {
  children: React.ReactNode
  background?: SectionBackground
  /** Override the default 116px top/bottom padding */
  padding?: string
  className?: string
  innerClassName?: string
}

const bgMap: Record<SectionBackground, string> = {
  ink:   "bg-ink",
  black: "bg-ink-black",
  cream: "bg-cream",
  white: "bg-white",
}

export function SectionWrapper({
  children,
  background = "ink",
  padding = "116px 10px",
  className,
  innerClassName,
}: SectionWrapperProps) {
  return (
    <div className={cn("w-full px-[10px] my-[10px]", className)}>
      <section
        className={cn("w-full rounded-[10px]", bgMap[background], innerClassName)}
        style={{ padding }}
      >
        {children}
      </section>
    </div>
  )
}
