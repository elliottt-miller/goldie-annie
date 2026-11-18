import { Heart } from "lucide-react"
import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./CTAContainer.module.css"
import Button from "./Button"
import ResponsiveProductImage from "./ResponsiveProductImage"

export default function CTAContainer() {
  return (
    <section className={styles.desktop} data-reveal aria-labelledby="site-cta-heading">
      <div className={styles.content}>
        <div className={styles.titleButton}>
          <div className={styles.pattern} aria-hidden="true">
            <span />
            <Heart />
            <span />
          </div>
          <div className={styles.title}>
            <h2 id="site-cta-heading" className={cx(tokens["text-n-36-r"], styles.heading)}>
              Let’s create
              <span className={styles.accentHeading}>something sweet</span>
            </h2>
          </div>
          <div className={styles.pattern2} aria-hidden="true">
            <span />
            <Heart />
            <span />
          </div>
        </div>

        <div className={styles.mainImage}>
          <ResponsiveProductImage
            src={`${import.meta.env.BASE_URL}products/homepage-scroll-assortment.webp`}
            sizes="(max-width: 809px) 88vw, (max-width: 1199px) 70vw, 720px"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={1280}
            height={1280}
          />
        </div>

        <div className={styles.bg} aria-hidden="true" />

        <div className={styles.subtitleCta}>
          <p>Planning a celebration or a thoughtful gift? Tell us what you have in mind.</p>
          <Button variant="Primary Desktop" buttonText="Create your moment" link="/contact" />
        </div>
      </div>
    </section>
  )
}
