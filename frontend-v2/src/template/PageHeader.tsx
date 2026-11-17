import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./PageHeader.module.css"
import { Heart } from "lucide-react"

interface Props {
  title?: string
  subtitle?: string
}

export default function PageHeader({
  title = "About us",
  subtitle = "Hand-decorated sweets made for celebrations, gifts and everyday joy.",
}: Props) {
  return (
    <section className={styles["desktop"]} data-reveal="" aria-labelledby="page-header-title">
      <div className={styles["content"]}>
        <div className={styles["title-description"]}>
          <h1 id="page-header-title" className={cx(tokens["text-n-72-r"], styles["title"])}>{title}</h1>
          <div className={styles["pattern"]}>
            <div className={styles["line"]} />
            <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
            <div className={styles["line2"]} />
          </div>
          <p className={cx(tokens["text-n-18-r"], styles["subtitle"])}>{subtitle}</p>
        </div>
        <img
          className={styles["page-artwork"]}
          src={`${import.meta.env.BASE_URL}products/homepage-assortment.webp`}
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
