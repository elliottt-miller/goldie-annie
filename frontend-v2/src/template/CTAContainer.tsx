import { ChefHat } from "lucide-react"
import styles from "./CTAContainer.module.css"
import ResponsiveProductImage from "./ResponsiveProductImage"
import { Link } from "react-router-dom"

export default function CTAContainer() {
  return (
    <section className={styles.desktop} data-reveal aria-labelledby="site-cta-heading">
      <div className={styles.content}>
        <div className={styles.titleButton}>
          <div className={styles.brandMark}>
            <span className={styles.brandRule} aria-hidden="true" />
            <ChefHat aria-hidden="true" />
            <span className={styles.brandRule} aria-hidden="true" />
            <span className={styles.brandName}>Goldie Ann’s</span>
            <span className={styles.brandSubline}>Sweets &amp; More</span>
          </div>
          <div className={styles.title}>
            <h2 id="site-cta-heading" className={styles.heading}>Let’s create</h2>
            <p className={styles.accentHeading}>something sweet</p>
          </div>
          <span className={styles.goldSwoosh} aria-hidden="true" />
        </div>

        <div className={styles.mainImage}>
          <ResponsiveProductImage
            src={`${import.meta.env.BASE_URL}products/homepage-hero-assortment.webp`}
            sizes="(max-width: 700px) 100vw, (max-width: 1080px) 90vw, (max-width: 1500px) 46vw, 48vw"
            alt="Goldie Ann’s assortment of decorated cake pops, dipped treats, crispy rice bars and pretzel rods on a marble platter"
            loading="lazy"
            decoding="async"
            width={1536}
            height={1024}
          />
        </div>

        <div className={styles.bg} aria-hidden="true" />

        <div className={styles.subtitleCta}>
          <p>Handcrafted treats for life’s sweetest moments</p>
          <Link className={styles.shopLink} to="/treats"><span aria-hidden="true">✦</span>Shop sweet treats<span aria-hidden="true">✦</span></Link>
        </div>
      </div>
    </section>
  )
}
