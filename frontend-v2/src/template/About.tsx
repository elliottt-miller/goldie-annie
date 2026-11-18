import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./About.module.css"
import PageHeader from "./PageHeader"
import SectionTags from "./SectionTags"
import FeaturedTreatCard from "./FeaturedTreatCard"
import { Eye, Heart, Target } from "lucide-react"
import { getProduct } from "../content/products"
import ResponsiveProductImage from "./ResponsiveProductImage"

const featuredProducts = [
  getProduct("apple-pie-on-a-stick"),
  getProduct("chocolate-dipped-oreos"),
  getProduct("rice-krispy-treats"),
]

export default function Page() {
  const productImage = (name: string) => `${import.meta.env.BASE_URL}products/${name}.webp`;
  return (
    <div className={styles["desktop"]}>
      <PageHeader title={"About us"} subtitle={"A little story behind Goldie Ann’s hand-decorated sweets."} />
      <section className={styles["story-container"]} data-reveal="" aria-label="Goldie Ann’s story">
        <ResponsiveProductImage className={styles["bg"]} src={productImage("homepage-scroll-assortment")} sizes="(max-width: 809px) 100vw, 1200px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={1400} height={900} />
        <div className={styles["content"]}>
          <div className={styles["tag-information"]}>
            <SectionTags variant="Mid" tag={"Our story"} />
            <p className={cx(tokens["text-n-18-r"], styles["text"])}>{"Goldie Ann’s makes hand-decorated cake pops, cakesicles, dipped Oreos, pretzels and Rice Krispy treats. Packaging and customizations are available upon request."}</p>
          </div>
        </div>
        <div className={styles["top-gradient"]} />
        <div className={styles["bottom-gradient"]} />
      </section>
      <section className={styles["mission-vision-container"]} data-reveal="" aria-labelledby="about-purpose-heading">
        <div className={styles["baby-flowers-illustration"]} />
        <div className={styles["bg2"]} />
        <div className={styles["top-gradient2"]} />
        <div className={styles["bottom-gradient2"]} />
        <div className={styles["content2"]}>
          <div className={styles["tag-title"]}>
            <SectionTags variant="Mid" tag={"Our purpose"} />
            <div className={styles["title"]}>
              <h2 id="about-purpose-heading" className={cx(tokens["text-n-36-r"], styles["our-purpose-for"])}>{"Good treats for"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["sweeter-tomorrow"])}>{"the moments we share"}</h2>
            </div>
          </div>
          <div className={styles["wrapper"]}>
            <ResponsiveProductImage className={styles["cake-image"]} src={productImage("apple-pie-on-a-stick-transparent")} sizes="(max-width: 809px) 40vw, 240px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={480} height={480} />
            <ResponsiveProductImage className={styles["cake-image2"]} src={productImage("lemon-blueberry-pops-transparent")} sizes="(max-width: 809px) 40vw, 240px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={480} height={480} />
            <div className={styles["mission-card"]}>
              <h4 className={cx(tokens["text-n-32-r"], styles["our-mission"])}>{"The treats"}</h4>
              <div className={styles["pattern"]}>
                <div className={styles["line"]} />
                <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                <div className={styles["line2"]} />
              </div>
              <p className={cx(tokens["text-n-18-r"], styles["text2"])}>{"Hand-decorated sweets for celebrations, thoughtful gifts and everyday joy."}</p>
              <div className={styles["icon-wrapper"]}>
                <Target className="decorative-icon" aria-hidden="true" />
              </div>
            </div>
            <div className={styles["vision-card"]}>
              <h4 className={cx(tokens["text-n-32-r"], styles["our-vision"])}>{"The details"}</h4>
              <div className={styles["pattern2"]}>
                <div className={styles["line3"]} />
                  <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                <div className={styles["line4"]} />
              </div>
              <p className={cx(tokens["text-n-18-r"], styles["text3"])}>{"A considered selection of treats, with packaging and customizations available upon request."}</p>
              <div className={styles["icon-wrapper2"]}>
                <Eye className="decorative-icon" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles["process-container"]} data-reveal="" aria-labelledby="about-process-heading">
        <div className={styles["content3"]}>
          <div className={styles["tag-title2"]}>
            <SectionTags variant="Mid" tag={"Our process"} />
            <div className={styles["title2"]}>
              <h2 id="about-process-heading" className={cx(tokens["text-n-36-r"], styles["how-sweet"])}>{"How ordering"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["magic-happens"])}>{"stays sweet"}</h2>
            </div>
          </div>
          <div className={styles["wrapper2"]}>
            <div className={styles["process-card"]}>
              <ResponsiveProductImage className={styles["image"]} src={productImage("apple-pie-on-a-stick-transparent")} sizes="(max-width: 809px) 38vw, 240px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={480} height={480} />
              <div className={styles["inner-content"]}>
                <div className={styles["number-title"]}>
                  <h3 className={cx(tokens["text-n-48-r"], styles["n-01"])}>{"01"}</h3>
                  <h4 className={cx(tokens["text-n-24-r"], styles["dream-it"])}>{"Choose your treats"}</h4>
                </div>
                <div className={styles["pattern3"]}>
                  <div className={styles["line5"]} />
                <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                  <div className={styles["line6"]} />
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text4"])}>{"Explore cake pops, cakesicles, dipped Oreos, pretzels and Rice Krispy treats."}</p>
              </div>
            </div>
            <div className={styles["process-card2"]}>
              <div className={styles["inner-content2"]}>
                <div className={styles["number-title2"]}>
                  <h3 className={cx(tokens["text-n-48-r"], styles["n-02"])}>{"02"}</h3>
                  <h4 className={cx(tokens["text-n-24-r"], styles["customize-it"])}>{"Make it yours"}</h4>
                </div>
                <div className={styles["pattern4"]}>
                  <div className={styles["line7"]} />
                  <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                  <div className={styles["line8"]} />
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text5"])}>{"Packaging and customizations are available upon request."}</p>
              </div>
              <ResponsiveProductImage className={styles["image2"]} src={productImage("homemade-caramel-pretzel-rods-transparent")} sizes="(max-width: 809px) 35vw, 240px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={480} height={480} />
            </div>
            <div className={styles["process-card3"]}>
              <ResponsiveProductImage className={styles["image3"]} src={productImage("dipped-oreos-transparent")} sizes="(max-width: 809px) 35vw, 240px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={480} height={480} />
              <div className={styles["inner-content3"]}>
                <div className={styles["number-title3"]}>
                  <h3 className={cx(tokens["text-n-48-r"], styles["n-03"])}>{"03"}</h3>
                  <h4 className={cx(tokens["text-n-24-r"], styles["bake-fresh"])}>{"Place your order"}</h4>
                </div>
                <div className={styles["pattern5"]}>
                  <div className={styles["line9"]} />
                  <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                  <div className={styles["line10"]} />
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text6"])}>{"Visit the online shop for current offerings and ordering details."}</p>
              </div>
            </div>
            <div className={styles["process-card4"]}>
              <div className={styles["inner-content4"]}>
                <div className={styles["number-title4"]}>
                  <h3 className={cx(tokens["text-n-48-r"], styles["n-04"])}>{"04"}</h3>
                  <h4 className={cx(tokens["text-n-24-r"], styles["celebrate-it"])}>{"Share the sweetness"}</h4>
                </div>
                <div className={styles["pattern6"]}>
                  <div className={styles["line11"]} />
                  <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                  <div className={styles["line12"]} />
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text7"])}>{"Choose something special for a celebration, a gift or just because."}</p>
              </div>
              <ResponsiveProductImage className={styles["image4"]} src={productImage("rice-krispy-treats-transparent")} sizes="(max-width: 809px) 35vw, 240px" alt="" aria-hidden="true" loading="lazy" decoding="async" width={480} height={480} />
            </div>
          </div>
        </div>
      </section>
      <section className={styles["team-container"]} data-reveal="" aria-labelledby="about-treats-heading">
        <div className={styles["baby-flowers-illustration2"]} />
        <div className={styles["content4"]}>
          <div className={styles["tag-title3"]}>
            <SectionTags variant="Mid" tag={"Explore the treats"} />
            <div className={styles["title3"]}>
              <h2 id="about-treats-heading" className={cx(tokens["text-n-36-r"], styles["the-passion-behind"])}>{"A little something"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["every-creation"])}>{"for every sweet tooth"}</h2>
            </div>
          </div>
          <div className={styles["team-card-wrappers"]}>
            {featuredProducts.map((product) => <FeaturedTreatCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
