import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./FeaturedTreatCard.module.css"
import { ArrowUpRight, Heart } from "lucide-react"
import { shopUrl } from "../content/brand"
import type { Product } from "../content/products"

interface Props {
  product: Product
}

export default function FeaturedTreatCard({ product }: Props) {
  return (
    <article className={styles.card}>
      <a className={styles.imageLink} href={shopUrl} target="_blank" rel="noreferrer" aria-label={`See ${product.name} in the online shop`}>
        <img
          className={styles.image}
          src={`${import.meta.env.BASE_URL}products/${product.image}`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className={styles.imageLabel}>{product.kind.split(" · ")[0]}</span>
      </a>
      <div className={styles.content}>
        <p className={cx(tokens["text-n-16-r"], styles.category)}>{product.kind}</p>
        <h3 className={cx(tokens["text-n-32-r"], styles.name)}>{product.name}</h3>
        <div className={styles.divider} aria-hidden="true"><span /><Heart className="decorative-icon decorative-icon--small" /><span /></div>
        <p className={cx(tokens["text-n-16-r"], styles.description)}>{product.description}</p>
        <a className={styles.shopLink} href={shopUrl} target="_blank" rel="noreferrer">
          See in the shop <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}
