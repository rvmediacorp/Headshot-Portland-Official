import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CTAButtonProps {
  href: string
  variant?: "primary" | "secondary"
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
}

export function CTAButton({
  href,
  variant = "primary",
  children,
  className,
  fullWidth = false,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "cta-button button-text text-sm md:text-base py-1 md:py-4",
        variant === "primary" ? "cta-primary" : "cta-secondary",
        fullWidth ? "w-full" : "w-full md:w-auto",
        className
      )}
    >
      <span>{children}</span>
      <span className="arrow-icon w-8 h-8 md:w-10 md:h-10">
        <ArrowUpRight size={16} className="md:size-20" />
      </span>
    </Link>
  )
}
