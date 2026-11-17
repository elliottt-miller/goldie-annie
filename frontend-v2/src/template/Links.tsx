import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./Links.module.css"
import { Link, useLocation } from "react-router-dom"
import { Heart } from "lucide-react"

interface Props {
  variant?: "Active" | "Tablet/Mobile"
  text?: string
  link?: string
  hidePattern?: boolean
}

export default function Links({
  variant: variantProp,
  text = "Home",
  link = "/",
  hidePattern = false,
}: Props) {
  const variant = variantProp ?? "Active"
  const currentPath = useLocation().pathname.replace(/\/$/, "")
  const targetPath = link === "/" ? "" : link.replace(/\/$/, "")
  const isCurrentPage = currentPath === targetPath

  return (
    <Link className={styles["active"]} data-variant={variant} to={link} aria-current={isCurrentPage ? "page" : undefined}>
      <p className={cx(tokens["text-n-18-r"], styles["text"])}>{text}</p>
      {!hidePattern && <div className={styles["pattern"]}>
        <div className={styles["line"]} />
        <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
        <div className={styles["line2"]} />
      </div>}
    </Link>
  )
}
