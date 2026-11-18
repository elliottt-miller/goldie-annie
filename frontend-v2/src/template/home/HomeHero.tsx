import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import Button from "../Button"
import { Heart } from "lucide-react"
import ResponsiveProductImage from "../ResponsiveProductImage"

const heroTreats = [
  { image: "apple-pie-on-a-stick-transparent.webp", alt: "Apple pie cake pop with cinnamon coating" },
  { image: "lemon-blueberry-pops-transparent.webp", alt: "Lemon blueberry cake pop" },
  { image: "espresso-caramel-pops-transparent.webp", alt: "Espresso caramel cake pop with caramel drizzle" },
  { image: "butterfinger-bliss-transparent.webp", alt: "Chocolate Butterfinger cake pop" },
  { image: "rice-krispy-treats-transparent.webp", alt: "Chocolate-drizzled Rice Krispy treats" },
]

export default function HomeHero() {
  return (
    <section className={styles["hero-container"]} data-reveal="" aria-labelledby="home-hero-heading">
        <div className={styles["hero-image"]} aria-hidden="true">
          {heroTreats.map((treat, index) => <ResponsiveProductImage
            key={treat.image}
            src={`${import.meta.env.BASE_URL}products/${treat.image}`}
            sizes="(max-width: 1039px) 30vw, 20vw"
            alt=""
            fetchPriority={index < 2 ? "high" : undefined}
            decoding="async"
            width={640}
            height={640}
            data-hero-treat={index + 1}
          />)}
        </div>
        <div className={styles["bottom-gradient"]} />
        <div className={styles["content"]}>
          <div className={styles["title-subtitle"]}>
            <div className={styles["title"]}>
              <h1 id="home-hero-heading" className={styles["hero-heading"]}>
                <span className={cx(tokens["text-n-72-r"], styles["h1"])}>Sweet moments,</span>
                <span className={styles["made-special"]}>made special</span>
              </h1>
            </div>
            <div className={styles["pattern"]}>
              <div className={styles["line"]} />
              <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
              <div className={styles["line2"]} />
            </div>
            <p className={cx(tokens["text-n-18-r"], styles["text"])}>{"Hand-decorated treats, made with care for celebrations, thoughtful gifts and everyday joy."}</p>
          </div>
          <div className={styles["buttons"]}>
            <Button variant="Secondary" buttonText={"Explore treats"} link={"/treats"} />
            <Button variant="Primary Desktop" buttonText={"Plan a party"} link={"/contact"} />
          </div>
        </div>
    </section>
  )
}
