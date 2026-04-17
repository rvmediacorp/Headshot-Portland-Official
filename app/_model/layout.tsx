import type { ReactNode } from "react"
import styles from "./model.module.css"

export default function ModelLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className={styles.container}>{children}</div>
}
