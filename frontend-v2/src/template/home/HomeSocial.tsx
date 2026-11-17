import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import Button from "../Button"
import SectionTags from "../SectionTags"
import TreatStory from "../TreatStory"
import { Heart } from "lucide-react"
import { shopUrl } from "../../content/brand"

const treatStories = [
  {
    title: "Cake pops",
    className: "instagram-stories",
    slides: [
      { image: "funfetti-pops-transparent.webp", title: "Colorful funfetti", alt: "Hand-decorated funfetti cake pops" },
      { image: "lemon-blueberry-pops-transparent.webp", title: "Lemon blueberry", alt: "Lemon blueberry cake pop with blueberries" },
      { image: "apple-pie-on-a-stick-transparent.webp", title: "Apple pie on a stick", alt: "Apple pie cake pop on a stick" },
    ],
  },
  {
    title: "Dipped treats",
    className: "instagram-stories2",
    slides: [
      { image: "dipped-oreos-transparent.webp", title: "Chocolate dipped Oreos", alt: "Chocolate-dipped Oreo cookies" },
      { image: "chocolate-dipped-pretzel-rods-transparent.webp", title: "Chocolate pretzel rods", alt: "Chocolate-dipped pretzel rods" },
      { image: "cakesicles.webp", title: "Cakesicles", alt: "Chocolate-dipped cakesicles with drizzle" },
    ],
  },
  {
    title: "Sweet boxes",
    className: "instagram-stories3",
    slides: [
      { image: "rice-krispy-treats-transparent.webp", title: "Rice Krispy treats", alt: "Chocolate-drizzled Rice Krispy treats" },
      { image: "mean-ones-sweet-box-transparent.webp", title: "Mean Ones sweet box", alt: "A festive assortment of decorated treats" },
      { image: "blue-christmas-confection-box-transparent.webp", title: "Holiday confection box", alt: "A holiday box of decorated confections" },
    ],
  },
];

export default function HomeSocial() {
  return (
    <section className={styles["socials-container"]} data-reveal="" aria-labelledby="home-social-heading">
        <div className={styles["content7"]}>
          <div className={styles["tag-title-description6"]}>
            <SectionTags variant="Mid" tag={"Sweet moments"} />
            <div className={styles["title7"]}>
              <h2 id="home-social-heading" className={cx(tokens["text-n-36-r"], styles["social-heading-primary"])}>{"A little sweetness"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["social-heading-accent"])}>{"for every occasion"}</h2>
            </div>
          </div>
          <div className={styles["reels-story-cta"]}>
            <div className={styles["ticker"]}>
              {treatStories.map((story) => <TreatStory key={story.title} className={styles[story.className]} title={story.title} slides={story.slides} />)}
            </div>
            <div className={styles["cta"]}>
              <div className={styles["logo-title-subtitle"]}>
                <img className={styles["image"]} src={`${import.meta.env.BASE_URL}logo-badge.svg`} alt="" aria-hidden="true" />
                <div className={styles["title-subtitle6"]}>
                  <h4 className={cx(tokens["text-n-32-r"], styles["h4"])}>{"A little sweetness goes a long way"}</h4>
                  <div className={styles["pattern6"]}>
                    <div className={styles["line10"]} />
                    <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
                    <div className={styles["line11"]} />
                  </div>
                  <p className={cx(tokens["text-n-18-r"], styles["text7"])}>{"Explore hand-decorated cake pops, dipped cookies, pretzel rods and more, made for sharing and celebrating."}</p>
                </div>
              </div>
              <div className={styles["cta-insta-handle"]}>
                <Button variant="Desktop Full Width" buttonText={"Shop Goldie Ann’s"} link={shopUrl} />
                <div className={styles["insta-handle"]}>
                  <p className={cx(tokens["text-n-18-r"], styles["brand-name"])}>{"Goldie Ann’s Sweets & More"}</p>
                </div>
              </div>
              <img className={styles["social-featured-treat-art"]} src={`${import.meta.env.BASE_URL}products/funfetti-pops-transparent.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
            </div>
            <img className={styles["social-assortment-art"]} src={`${import.meta.env.BASE_URL}products/homepage-assortment.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          </div>
        </div>
        <div className={styles["bg2"]} />
        <div className={styles["top-gradient2"]} />
        <div className={styles["bottom-gradient3"]} />
        <div className={styles["baby-flowers-illustration3"]} />
    </section>
  )
}
