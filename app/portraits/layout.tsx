import type { ReactNode } from "react"
import styles from "./portraits.module.css"

export default function PortraitsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className={styles.container}>{children}</div>
}
