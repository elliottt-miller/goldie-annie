import styles from "./Button.module.css"
import { Link } from "react-router-dom"

interface Props {
  variant?: "Primary Desktop" | "Secondary" | "Desktop Full Width" | "Secondary Full Width" | "Tablet Primary" | "Tablet Secondary" | "Tablet Full Width" | "Tablet Secondary Full Width" | "Mobile Primary" | "Mobile Secondary"
  buttonText?: string
  link?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

export default function Button({
  variant = "Primary Desktop",
  buttonText = "Explore treats",
  link = "/treats",
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  className,
}: Props) {
  const isExternal = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(link)
  const wrapperClass = [styles["primary-desktop"], fullWidth && styles.fullWidth].filter(Boolean).join(" ")
  const controlClass = [styles.button, className].filter(Boolean).join(" ")
  const content = <>
    <span className={styles["sparkle-star"]} aria-hidden="true" />
    <span className={styles["button-label"]}>{buttonText}</span>
    <span className={styles["sparkle-star2"]} aria-hidden="true" />
  </>

  return (
    <div className={wrapperClass} data-variant={variant}>
      {onClick || disabled || type !== "button"
        ? <button className={controlClass} type={type} onClick={onClick} disabled={disabled}>{content}</button>
        : isExternal
          ? <a className={controlClass} href={link} target="_blank" rel="noreferrer" aria-disabled={disabled || undefined}>{content}</a>
          : <Link className={controlClass} to={link} aria-disabled={disabled || undefined}>{content}</Link>}
    </div>
  )
}
