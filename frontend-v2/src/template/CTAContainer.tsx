import { Heart } from "lucide-react"
import styles from "./CTAContainer.module.css"
import ResponsiveProductImage from "./ResponsiveProductImage"
import { Link } from "react-router-dom"

export default function CTAContainer() {
  return (
    <section className={styles.desktop} data-reveal aria-labelledby="site-cta-heading">
      <div className={styles.content}>
        <div className={styles.titleButton}>
          <p className={styles.brandName}>Goldie Ann’s <span>Sweets &amp; More</span></p>
          <div className={styles.title}>
            <h2 id="site-cta-heading" className={styles.heading}>Let’s create</h2>
            <span className={styles.accentHeading}>something sweet</span>
          </div>
          <div className={styles.pattern} aria-hidden="true">
            <span /><Heart /><span />
          </div>
        </div>

        <div className={styles.mainImage}>
          <ResponsiveProductImage
            src={`${import.meta.env.BASE_URL}products/homepage-assortment.webp`}
            sizes="(max-width: 809px) 94vw, (max-width: 1199px) 52vw, 680px"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={1670}
            height={942}
          />
        </div>

        <div className={styles.bg} aria-hidden="true" />

        <div className={styles.subtitleCta}>
          <p>Hand-decorated cake pops and dipped treats for life’s sweetest moments.</p>
          <Link className={styles.shopLink} to="/treats"><span aria-hidden="true">✦</span>Shop sweet treats<span aria-hidden="true">✦</span></Link>
        </div>
      </div>
    </section>
  )
}
