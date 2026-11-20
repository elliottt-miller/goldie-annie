import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./Footer.module.css"
import HoverLink from "./HoverLink"
import { Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className={styles["desktop"]} data-reveal="">
      <div className={styles["content"]}>
        <div className={styles["logo-subtitle"]}>
          <img className={styles.logo} src={`${import.meta.env.BASE_URL}logo-badge.svg`} alt="Goldie Ann’s Sweets & More" width={448} height={279} loading="lazy" />
          <p className={cx(tokens["text-n-18-r"], styles["text"])}>{"Hand-decorated desserts for life’s sweetest moments."}</p>
        </div>
        <div className={styles["pattern"]}>
          <div className={styles["line"]} />
          <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
          <div className={styles["line2"]} />
        </div>
        <nav className={styles["all-links-wrapper"]} aria-label="Footer navigation">
          <div className={styles["nav-links"]}>
            <p className={cx(tokens["text-n-16-r"], styles["quicks"])}>Explore</p>
            <div className={styles["links-wrapper"]}>
              <HoverLink variant="Phone" label="Home" link="/" />
              <HoverLink variant="Phone" label="Shop" link="/treats" />
              <HoverLink variant="Phone" label="About" link="/about" />
              <HoverLink variant="Phone" label="Contact" link="/contact" />
            </div>
          </div>
          <div className={styles["divider"]} />
          <div className={styles["legal-links"]}>
            <p className={cx(tokens["text-n-16-r"], styles["others"])}>Plan an order</p>
            <div className={styles["links-wrapper2"]}>
              <HoverLink variant="Phone" label="Order questions" link="/#ordering-questions" />
              <HoverLink variant="Phone" label="Plan a party" link="/contact" />
            </div>
          </div>
        </nav>
        <div className={styles["all-rights"]}>
          <p className={cx(tokens["text-n-16-r"], styles["copyright"])}>{"© Goldie Ann’s Sweets & More"}</p>
          <p className={cx(tokens["text-n-16-r"], styles["text2"])}>{"Hand-decorated with care"}</p>
        </div>
      </div>
      <div className={styles["bg"]} />
      <div className={styles["top-gradient"]} />
    </footer>
  )
}
