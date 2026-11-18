import styles from "./TreatCards.module.css"
import Button from "./Button"
import { Heart } from "lucide-react"
import { shopUrl } from "../content/brand"
import ResponsiveProductImage from "./ResponsiveProductImage"

interface Props {
  productImage1?: string
  title?: string
  subtext?: string
  link?: string
  buttonText?: string
}

export default function TreatCards({
  productImage1 = `${import.meta.env.BASE_URL}products/funfetti-pops-transparent.webp`,
  title = "Cake pops",
  subtext = "Hand-decorated cake pops for gifting, parties and everyday joy.",
  link = shopUrl,
  buttonText = "Shop cake pops",
}: Props) {
  return (
    <div className={styles["desktop-1"]}>
      <div className={styles["product-image"]}>
        {productImage1 && <ResponsiveProductImage className={styles["featured-product"]} src={productImage1} sizes="(max-width: 809px) 88vw, (max-width: 1199px) 42vw, 520px" alt={`${title} featured treat`} loading="lazy" decoding="async" />}
      </div>
      <div className={styles["content"]}>
        <div className={styles["title-description"]}>
          <h3 className={styles.collectionTitle}>{title}</h3>
          <div className={styles["pattern"]} aria-hidden="true">
            <div className={styles["line"]} />
            <Heart className="decorative-icon decorative-icon--small" />
            <div className={styles["line2"]} />
          </div>
          <p className={styles.collectionDescription}>{subtext}</p>
        </div>
        <Button variant="Primary Desktop" buttonText={buttonText} link={link} />
      </div>
    </div>
  )
}
