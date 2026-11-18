import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import Button from "../Button"
import SectionTags from "../SectionTags"
import AnimatedCounter from "../AnimatedCounter"
import ResponsiveProductImage from "../ResponsiveProductImage"
import { products, productCollections } from "../../content/products"

const treatVarieties = new Set(products.map((product) => product.kind)).size
const seasonalAssortments = products.filter((product) => 'tag' in product && product.tag === 'Seasonal').length

export default function HomeAbout() {
  return (
    <section className={styles["about-container"]} id="about" data-reveal="" aria-labelledby="home-about-heading">
        <div className={styles["content2"]}>
          <div className={styles["image-about"]}>
            <div className={styles["n-1"]}>
              <div className={styles["tag-title-description"]}>
                <div className={styles["tag-title"]}>
                  <SectionTags variant="Left" tag={"About us"} />
                  <div className={styles["title2"]}>
                    <h2 id="home-about-heading" className={cx(tokens["text-n-36-r"], styles["h2"])}>{"Hand-decorated treats,"}</h2>
                    <h2 className={cx(tokens["text-n-44-r"], styles["served-with-love"])}>{"made for your moments"}</h2>
                  </div>
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text2"])}>{"Goldie Ann creates custom cake pops, cakesicles, dipped Oreos, pretzel rods and Rice Krispy treats for celebrations, gifting and everyday joy."}</p>
              </div>
              <Button variant="Primary Desktop" buttonText={"Discover our story"} link={"/about"} />
            </div>
            <div className={styles["n-2"]}>
              <div className={styles["image-frame"]}>
                <ResponsiveProductImage className={styles["cake-image"]} src={`${import.meta.env.BASE_URL}products/apple-pie-on-a-stick-transparent.webp`} sizes="(max-width: 809px) 300px, 353px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={480} height={480} />
              </div>
            </div>
          </div>
          <div className={styles["metrics"]}>
            <div className={styles["metric"]} role="group" aria-label={`${products.length} treat listings`}>
              <span className={styles["metric-value"]}><AnimatedCounter value={products.length} /></span>
              <p className={cx(tokens["text-n-18-r"], styles["metric-copy"])}>{"treat listings"}</p>
            </div>
            <div className={styles["divider"]} />
            <div className={styles["metric"]} role="group" aria-label={`${treatVarieties} treat varieties`}>
              <span className={styles["metric-value"]}><AnimatedCounter value={treatVarieties} /></span>
              <p className={cx(tokens["text-n-18-r"], styles["metric-copy"])}>{"treat varieties"}</p>
            </div>
            <div className={styles["divider"]} />
            <div className={styles["metric"]} role="group" aria-label={`${productCollections.length} curated collections`}>
              <span className={styles["metric-value"]}><AnimatedCounter value={productCollections.length} /></span>
              <p className={cx(tokens["text-n-18-r"], styles["metric-copy"])}>{"curated collections"}</p>
            </div>
            <div className={styles["divider"]} />
            <div className={styles["metric"]} role="group" aria-label={`${seasonalAssortments} seasonal assortments`}>
              <span className={styles["metric-value"]}><AnimatedCounter value={seasonalAssortments} /></span>
              <p className={cx(tokens["text-n-18-r"], styles["metric-copy"])}>{"seasonal assortments"}</p>
            </div>
          </div>
        </div>
    </section>
  )
}
