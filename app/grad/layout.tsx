import type { ReactNode } from "react"
import styles from "./grad.module.css"

export default function GradLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className={styles.container}>{children}</div>
}
