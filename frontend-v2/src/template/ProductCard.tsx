import { Link } from "react-router-dom"
import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./ProductCard.module.css"
import Button from "./Button"
import { shopUrl } from "../content/brand"
import ResponsiveProductImage from "./ResponsiveProductImage"

interface Props {
  id: string
  text?: string
  category?: string
  description?: string
  image?: string
}

export default function ProductCard({
  id,
  text = "",
  category = "Hand-decorated treat",
  description = "Made by Goldie Ann for your sweetest moments.",
  image,
}: Props) {
  return (
    <article className={styles["desktop-open"]}>
      <Link className={styles["card-link"]} to={`/treats/${encodeURIComponent(id)}`} aria-label={`View ${text} details`}>
        <div className={styles["product-image"]}>
          {image && <ResponsiveProductImage className={styles["product-photo"]} src={image} sizes="(max-width: 809px) 90vw, (max-width: 1199px) 44vw, 30vw" alt="" loading="lazy" decoding="async" width={480} height={480} />}
          <span className={styles["image-category"]}>{category.split(' · ')[0]}</span>
        </div>
        <div className={styles["information"]}>
          <h3 className={cx(tokens["text-n-24-r"], styles["text"])}>{text}</h3>
          <p className={cx(tokens["text-n-18-r"], styles["text2"])}>{description}</p>
        </div>
      </Link>
      <Button variant="Desktop Full Width" buttonText={"Order online"} link={shopUrl} />
    </article>
  )
}
