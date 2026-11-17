import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./ContactCards.module.css"
import { CakeSlice, Gift, ShoppingBasket } from "lucide-react"

interface Props {
  variant?: "Desktop With Short text" | "Desktop Without Short Text" | "Tablet/Mobile With Short text" | "Tablet/Mobile Without Short text"
  icon?: string
  symbol?: "cake" | "gift" | "shop"
  title?: string
  note?: string
  link?: string
}

export default function ContactCards({
  variant = "Desktop With Short text",
  icon = "",
  symbol = "shop",
  title = "Visit the online shop",
  note = "Browse current treats and ordering details",
  link,
}: Props) {
  const contents = <>
      <div className={styles["icon"]} style={icon ? { backgroundImage: `url(${icon})` } : undefined} aria-hidden="true">
        {!icon && (symbol === "cake"
          ? <CakeSlice className="decorative-icon" size={28} aria-hidden="true" />
          : symbol === "gift"
            ? <Gift className="decorative-icon" size={28} aria-hidden="true" />
            : <ShoppingBasket className="decorative-icon" size={28} aria-hidden="true" />)}
      </div>
      <div className={styles["content"]}>
        <h5 className={cx(tokens["text-n-20-r"], styles["title"])}>{title}</h5>
        <p className={cx(tokens["text-n-16-r"], styles["note"])}>{note}</p>
      </div>
    </>

  return link
    ? <a href={link} target={/^https?:/i.test(link) ? "_blank" : undefined} rel={/^https?:/i.test(link) ? "noreferrer" : undefined} className={styles["desktop-with-short-text"]} data-interactive="true" data-variant={variant}>{contents}</a>
    : <article className={styles["desktop-with-short-text"]} data-interactive="false" data-variant={variant}>{contents}</article>
}
