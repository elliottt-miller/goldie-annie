import cx from "./cx"
import type { CSSProperties } from "react"
import tokens from "./tokens.module.css"
import styles from "./HoverLink.module.css"
import { Link } from "react-router-dom"

interface Props {
  variant?: "Desktop" | "Phone"
  primaryColour?: string
  hoverColour?: string
  label?: string
  link?: string
}

export default function HoverLink({
  variant: variantProp,
  primaryColour = "var(--brand-plum)",
  hoverColour = "var(--brand-accent-ink)",
  label = "About",
  link = "/about",
}: Props) {
  const variant = variantProp ?? "Desktop"
  const isExternal = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(link)
  const content = <div className={styles["texts"]}>
    <p className={cx(tokens["text-n-16-sb"], styles["label"])}>{label}</p>
    <p className={cx(tokens["text-n-16-sb"], styles["text-2"])} aria-hidden="true">{label}</p>
  </div>

  return (
    isExternal
      ? <a className={styles["desktop"]} data-variant={variant} href={link} target="_blank" rel="noreferrer" style={{ "--link-colour": primaryColour, "--hover-colour": hoverColour } as CSSProperties}>{content}</a>
      : <Link className={styles["desktop"]} data-variant={variant} to={link} style={{ "--link-colour": primaryColour, "--hover-colour": hoverColour } as CSSProperties}>{content}</Link>
  )
}
