import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./PageHeader.module.css"
import { Heart } from "lucide-react"
import ResponsiveProductImage from "./ResponsiveProductImage"
import { Link } from "react-router-dom"

interface Props {
  title?: string
  subtitle?: string
  actionLabel?: string
  actionHref?: string
  artworkSrc?: string
  variant?: "default" | "about"
}

export default function PageHeader({
  title = "About us",
  subtitle = "Hand-decorated sweets made for celebrations, gifts and everyday joy.",
  actionLabel,
  actionHref,
  artworkSrc = `${import.meta.env.BASE_URL}products/homepage-assortment.webp`,
  variant = "default",
}: Props) {
  return (
    <section className={cx(styles["desktop"], variant === "about" && styles.about)} data-reveal="" aria-labelledby="page-header-title">
      <div className={styles["content"]}>
        <div className={styles["title-description"]}>
          <h1 id="page-header-title" className={cx(tokens["text-n-72-r"], styles["title"])}>{title}</h1>
          <div className={styles["pattern"]}>
            <div className={styles["line"]} />
            <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
            <div className={styles["line2"]} />
          </div>
          <p className={cx(tokens["text-n-18-r"], styles["subtitle"])}>{subtitle}</p>
          {actionLabel && actionHref && (
            <Link className={styles.action} to={actionHref}>
              {actionLabel}<span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
        <ResponsiveProductImage
          className={styles["page-artwork"]}
          src={artworkSrc}
          sizes="(max-width: 809px) 90vw, (max-width: 1199px) 75vw, 920px"
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          width={1773}
          height={1000}
        />
      </div>
      <div className={styles["bg"]} />
    </section>
  )
}
