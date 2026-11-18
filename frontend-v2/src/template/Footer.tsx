import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./Footer.module.css"
import HoverLink from "./HoverLink"
import { Heart } from "lucide-react"
import { shopUrl } from "../content/brand"
import ResponsiveProductImage from "./ResponsiveProductImage"

export default function Footer() {
  return (
    <footer className={styles["desktop"]} data-reveal="">
      <div className={styles["content"]}>
        <div className={styles["logo-subtitle"]}>
          <div className={styles["logo"]} role="img" aria-label="Goldie Ann’s Sweets & More" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}logo-badge.svg)` }} />
          <p className={cx(tokens["text-n-18-r"], styles["text"])}>{"Hand-decorated desserts for life’s sweetest moments."}</p>
        </div>
        <div className={styles["pattern"]}>
          <div className={styles["line"]} />
          <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
          <div className={styles["line2"]} />
        </div>
        <nav className={styles["all-links-wrapper"]} aria-label="Footer navigation">
          <div className={styles["nav-links"]}>
            <p className={cx(tokens["text-n-16-r"], styles["quicks"])}>{"Explore"}</p>
            <div className={styles["links-wrapper"]}>
              <HoverLink variant="Desktop" label={"Home"} link={"/"} />
              <HoverLink variant="Desktop" label={"About"} link={"/about"} />
              <HoverLink variant="Desktop" label={"Treats"} link={"/treats"} />
              <HoverLink variant="Desktop" label={"Contact"} link={"/contact"} />
            </div>
          </div>
          <div className={styles["divider"]} />
          <div className={styles["legal-links"]}>
            <p className={cx(tokens["text-n-16-r"], styles["others"])}>{"Discover"}</p>
            <div className={styles["links-wrapper2"]}>
              <HoverLink variant="Desktop" label={"Our story"} link={"/about"} />
              <HoverLink variant="Desktop" label={"Explore treats"} link={"/treats"} />
              <HoverLink variant="Desktop" label={"Order questions"} link={"/#ordering-questions"} />
            </div>
          </div>
          <div className={styles["divider2"]} />
          <div className={styles["social-links"]}>
            <p className={cx(tokens["text-n-16-r"], styles["socials"])}>{"Shop online"}</p>
            <div className={styles["links-wrapper3"]}>
              <HoverLink variant="Desktop" label={"Browse the current menu"} link={shopUrl} />
              <HoverLink variant="Desktop" label={"Order questions"} link={"/#ordering-questions"} />
            </div>
          </div>
          <div className={styles["divider3"]} />
          <div className={styles["contact-info"]}>
            <p className={cx(tokens["text-n-16-r"], styles["contact"])}>{"Custom orders"}</p>
            <div className={styles["wrapper"]}>
              <HoverLink variant="Desktop" label={"Plan a party"} link={"/contact"} />
              <HoverLink variant="Desktop" label={"Ask about custom details"} link={"/contact"} />
            </div>
          </div>
        </nav>
        <div className={styles["all-rights"]}>
          <p className={cx(tokens["text-n-16-r"], styles["copyright"])}>{"© Goldie Ann’s Sweets & More"}</p>
          <p className={cx(tokens["text-n-16-r"], styles["text2"])}>{"Hand-decorated with care"}</p>
        </div>
      </div>
      <div className={styles["footer-cake-pops"]} aria-hidden="true">
        <ResponsiveProductImage src={`${import.meta.env.BASE_URL}products/funfetti-pops-transparent.webp`} sizes="(max-width: 809px) 18vw, 170px" alt="" width="640" height="640" loading="lazy" decoding="async" />
        <ResponsiveProductImage src={`${import.meta.env.BASE_URL}products/lemon-blueberry-pops-transparent.webp`} sizes="(max-width: 809px) 18vw, 170px" alt="" width="640" height="640" loading="lazy" decoding="async" />
        <ResponsiveProductImage src={`${import.meta.env.BASE_URL}products/apple-pie-on-a-stick-transparent.webp`} sizes="(max-width: 809px) 18vw, 170px" alt="" width="640" height="640" loading="lazy" decoding="async" />
      </div>
      <div className={styles["bg"]} />
      <div className={styles["top-gradient"]} />
    </footer>
  )
}
