import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./PricingCard.module.css"
import Button from "./Button"
import { CheckCircle2, ExternalLink, Heart } from "lucide-react"
import { shopUrl } from "../content/brand"
import ResponsiveProductImage from "./ResponsiveProductImage"

interface Props {
  variant?: "Desktop" | "Desktop Gold" | "Tablet/Mobile" | "Tablet/Mobile Gold" | "Custom Variant" | "Tablet/Mobile Custom variant"
  image?: string
  title?: string
  pricing?: string
  priceSuffix?: string
  point1?: string
  point2?: string
  point3?: string
  point4?: string
  buttonText?: string
}

export default function PricingCard({
  variant = "Desktop",
  image = `${import.meta.env.BASE_URL}products/rice-krispy-treats-transparent.webp`,
  title = "Hand-decorated treats",
  pricing = "",
  priceSuffix = "",
  point1 = "Decorated by hand",
  point2 = "Made for celebrations",
  point3 = "A thoughtful gift",
  point4 = "Ask about custom details",
  buttonText = "Shop Goldie Ann’s",
}: Props) {
  return (
    <div className={styles["desktop"]} data-variant={variant}>
      <div className={styles["main-image"]}>
        {image && <ResponsiveProductImage className={styles["main-product-image"]} src={image} sizes="(max-width: 357px) 100vw, 357px" alt={title} loading="lazy" decoding="async" />}
      </div>
      <div className={styles["content"]}>
        <div className={styles["inner-content"]}>
          <div className={styles["title-description"]}>
            <h4 className={cx(tokens["text-n-24-r"], styles["title"])}>{title}</h4>
            <div className={styles["pattern"]}>
              <div className={styles["line"]} />
              <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
              <div className={styles["line2"]} />
            </div>
            <div className={styles["price"]}>
              {pricing ? <>
                <h4 className={cx(tokens["text-n-32-r"], styles["pricing"])}>{pricing}</h4>
                {priceSuffix && <p className={cx(tokens["text-n-18-r"], styles["pricesuffix"])}>{priceSuffix}</p>}
              </> : <a className={styles["price-link"]} href={shopUrl} target="_blank" rel="noreferrer">Current pricing <ExternalLink size={14} aria-hidden="true" /></a>}
            </div>
          </div>
          <div className={styles["divider"]} />
          <ul className={styles["points-wrapper"]}>
            {[point1, point2, point3, point4].map((point) => <li className={styles["point"]} key={point}>
              <CheckCircle2 className="decorative-icon" aria-hidden="true" />
              <span className={cx(tokens["text-n-18-r"], styles["point-copy"])}>{point}</span>
            </li>)}
          </ul>
        </div>
        <Button variant="Secondary Full Width" buttonText={buttonText} link={shopUrl} />
      </div>
      <div className={styles["image"]} aria-hidden="true" />
    </div>
  )
}
