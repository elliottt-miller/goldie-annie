import { Link } from "react-router-dom"
import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./ProductCard.module.css"
import ResponsiveProductImage from "./ResponsiveProductImage"
import { useCart } from "../commerce/useCart"
import { useState } from "react"
import type { ProductId } from "../content/products"

interface Props {
  id: string
  text?: string
  category?: string
  description?: string
  image?: string
  priceCents?: number | null
}

export default function ProductCard({
  id,
  text = "",
  category = "Hand-decorated treat",
  description = "Made by Goldie Ann for your sweetest moments.",
  image,
  priceCents,
}: Props) {
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <article className={styles["desktop-open"]}>
      <Link className={styles["card-link"]} to={`/treats/${encodeURIComponent(id)}`} aria-label={`View ${text} details`}>
        <div className={styles["product-image"]}>
          {image && <ResponsiveProductImage className={styles["product-photo"]} src={image} sizes="(max-width: 809px) 90vw, (max-width: 1199px) 44vw, 30vw" alt="" loading="lazy" decoding="async" width={480} height={480} />}
          <span className={styles["image-category"]}>{category.split(' · ')[0]}</span>
        </div>
        <div className={styles["information"]}>
          <h3 className={cx(tokens["text-n-24-r"], styles["text"])}>{text}</h3>
          <p className={styles.price}>{priceCents ? `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(priceCents / 100)} per dozen` : 'Ask about current pricing'}</p>
          <p className={cx(tokens["text-n-18-r"], styles["text2"])}>{description}</p>
        </div>
      </Link>
      {priceCents != null
        ? <button className={styles.addButton} type="button" onClick={() => { addProduct(id as ProductId); setAdded(true); window.setTimeout(() => setAdded(false), 1800); }}>{added ? 'Added to your bag' : 'Add to bag'}</button>
        : <Link className={styles.addButton} to={`/contact?product=${encodeURIComponent(id)}`}>Ask about this treat</Link>}
    </article>
  )
}
