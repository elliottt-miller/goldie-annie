import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import ProductShowcase from "../ProductShowcase"
import SectionTags from "../SectionTags"

export default function HomeShowcase() {
  return (
    <section className={styles["featured-container"]} data-reveal="" aria-labelledby="featured-heading">
        <div className={styles["content6"]}>
          <div className={styles["tag-title-description5"]}>
            <SectionTags variant="Mid" tag={"Featured treats"} />
            <div className={styles["title6"]}>
              <h2 id="featured-heading" className={cx(tokens["text-n-36-r"], styles["favorites-heading-primary"])}>{"Sweet favorites"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["favorites-heading-accent"])}>{"made to share"}</h2>
            </div>
          </div>
          <div className={styles["featured-stage"]}>
            <ProductShowcase />
            <div className={styles["dessert-decorations"]} aria-hidden="true">
              <img className={styles["showcase-accent-treat-primary"]} src={`${import.meta.env.BASE_URL}products/lemon-blueberry-pops-transparent.webp`} alt="" loading="lazy" decoding="async" />
              <img className={styles["showcase-accent-treat-secondary"]} src={`${import.meta.env.BASE_URL}products/rice-krispy-treats-transparent.webp`} alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
    </section>
  )
}
