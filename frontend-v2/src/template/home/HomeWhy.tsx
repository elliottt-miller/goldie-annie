import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import SectionTags from "../SectionTags"
import { ChefHat, CookingPot, Heart, Smile } from "lucide-react"
import ResponsiveProductImage from "../ResponsiveProductImage"

export default function HomeWhy() {
  return (
    <section className={styles["why-us-container"]} data-reveal="" aria-labelledby="home-why-heading">
        <div className={styles["content4"]}>
          <div className={styles["tag-title-description3"]}>
            <SectionTags variant="Mid" tag={"Why us"} />
            <div className={styles["title4"]}>
                <h2 id="home-why-heading" className={cx(tokens["text-n-36-r"], styles["more-than-just"])}>{"Thoughtful little"}</h2>
                <h2 className={cx(tokens["text-n-44-r"], styles["baked-good"])}>{"details, made by hand"}</h2>
            </div>
          </div>
          <div className={styles["wrapper"]}>
            <div className={styles["point-1"]}>
              <div className={styles["frame-icon"]}>
                <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
              </div>
              <div className={styles["title-subtitle2"]}>
                <h4 className={cx(tokens["text-n-24-r"], styles["feature-hand-decorated"])}>{"Hand-decorated"}</h4>
                <div className={styles["pattern2"]}>
                  <div className={styles["line3"]} />
                  <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                  <div className={styles["line4"]} />
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text3"])}>{"Each treat is decorated by hand for a personal finish."}</p>
              </div>
            </div>
            <div className={styles["point-2"]}>
              <div className={styles["frame-icon2"]}>
                <ChefHat className="decorative-icon" aria-hidden="true" />
              </div>
              <div className={styles["title-subtitle3"]}>
                <h4 className={cx(tokens["text-n-24-r"], styles["feature-made-for-moments"])}>{"Made for your moment"}</h4>
                <div className={styles["pattern3"]}>
                  <div className={styles["kine"]} />
                  <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                  <div className={styles["line5"]} />
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text4"])}>{"Choose a sweet detail for gifting, gatherings or celebrations."}</p>
              </div>
            </div>
            <div className={styles["point-3"]}>
              <div className={styles["frame-icon3"]}>
                <CookingPot className="decorative-icon" aria-hidden="true" />
              </div>
              <div className={styles["title-subtitle4"]}>
                <h4 className={cx(tokens["text-n-24-r"], styles["feature-custom-details"])}>{"Custom details"}</h4>
                <div className={styles["pattern4"]}>
                  <div className={styles["line6"]} />
                  <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                  <div className={styles["line7"]} />
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text5"])}>{"Packaging and customizations are available upon request."}</p>
              </div>
            </div>
            <div className={styles["point-4"]}>
              <div className={styles["frame-icon4"]}>
                <Smile className="decorative-icon" aria-hidden="true" />
              </div>
              <div className={styles["title-subtitle5"]}>
                <h4 className={cx(tokens["text-n-24-r"], styles["feature-made-to-share"])}>{"Made to share"}</h4>
                <div className={styles["pattern5"]}>
                  <div className={styles["line8"]} />
                  <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                  <div className={styles["line9"]} />
                </div>
                <p className={cx(tokens["text-n-18-r"], styles["text6"])}>{"Bring a little sweetness to parties, gifts and everyday moments."}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["bg"]} />
        <div className={styles["top-gradient"]} />
        <div className={styles["bottom-gradient2"]} />
        <ResponsiveProductImage className={styles["why-featured-treat-art"]} src={`${import.meta.env.BASE_URL}products/apple-pie-on-a-stick-transparent.webp`} sizes="(max-width: 809px) 34vw, 260px" alt="" aria-hidden="true" loading="lazy" decoding="async" />
    </section>
  )
}
