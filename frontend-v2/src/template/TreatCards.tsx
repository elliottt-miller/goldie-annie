import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./TreatCards.module.css"
import Button from "./Button"
import { Heart, ShoppingBasket } from "lucide-react"
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
        <div className={styles["product-label"]}>
          <ShoppingBasket className="decorative-icon" aria-hidden="true" />
          <p className={cx(tokens["text-n-16-r"], styles["title"])}>{title}</p>
        </div>
      </div>
      <div className={styles["content"]}>
        <div className={styles["wrapper"]}>
          <div className={styles["title-description"]}>
            <h3 className={cx(tokens["text-n-48-r"], styles["subtext"])}>{subtext}</h3>
            <div className={styles["pattern"]}>
              <div className={styles["line"]} />
              <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
              <div className={styles["line2"]} />
            </div>
          </div>
          {productImage1 && <ResponsiveProductImage className={styles["productimage1"]} src={productImage1} sizes="80px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={160} height={160} />}
        </div>
        <Button variant="Primary Desktop" buttonText={buttonText} link={link} />
      </div>
    </div>
  )
}
