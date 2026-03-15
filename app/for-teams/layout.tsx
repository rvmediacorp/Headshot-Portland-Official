import type { ReactNode } from "react"
import styles from "./for-teams.module.css"

export default function ForTeamsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <div className={styles.container}>{children}</div>
}
