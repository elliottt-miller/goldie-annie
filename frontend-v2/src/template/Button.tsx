import styles from "./Button.module.css"
import { Link } from "react-router-dom"

interface Props {
  variant?: "Primary Desktop" | "Secondary" | "Desktop Full Width" | "Secondary Full Width" | "Tablet Primary" | "Tablet Secondary" | "Tablet Full Width" | "Tablet Secondary Full Width" | "Mobile Primary" | "Mobile Secondary"
  buttonText?: string
  link?: string
}

export default function Button({
  variant = "Primary Desktop",
  buttonText = "Explore treats",
  link = "/treats",
}: Props) {
  const isExternal = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(link)
  const content = <>
    <div className={styles["sparkle-star"]} />
    <span className={styles["button-label"]}>{buttonText}</span>
    <div className={styles["sparkle-star2"]} />
  </>

  return (
    <div className={styles["primary-desktop"]} data-variant={variant}>
      {isExternal
        ? <a className={styles["button"]} href={link} target="_blank" rel="noreferrer">{content}</a>
        : <Link className={styles["button"]} to={link}>{content}</Link>}
    </div>
  )
}
