import { cn } from "@/lib/utils"

type HeadingSize = "sm" | "md" | "lg"

interface SectionHeadingProps {
  children: React.ReactNode
  /** "teal" colours the whole heading; pass JSX children to mix teal + white/black inline */
  color?: "teal" | "white" | "black"
  size?: HeadingSize
  italic?: boolean
  className?: string
}

const sizeMap: Record<HeadingSize, string> = {
  sm: "text-3xl md:text-4xl",
  md: "text-4xl md:text-5xl",
  lg: "text-4xl md:text-5xl lg:text-6xl",
}

const colorMap = {
  teal:  "text-brand-teal",
  white: "text-white",
  black: "text-black",
}

export function SectionHeading({
  children,
  color = "white",
  size = "lg",
  italic = false,
  className,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-bodoniModa",
        sizeMap[size],
        colorMap[color],
        italic && "italic",
        className
      )}
    >
      {children}
    </h2>
  )
}

/** Convenience span for the teal-coloured word inside a mixed heading */
export function HeadingAccent({ children }: { children: React.ReactNode }) {
  return <span className="text-brand-teal">{children}</span>
}
