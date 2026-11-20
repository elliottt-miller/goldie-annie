import cx from "../cx";
import tokens from "../tokens.module.css";
import styles from "../Page.module.css";
import Button from "../Button";
import SectionTags from "../SectionTags";
import ResponsiveProductImage from "../ResponsiveProductImage";

export default function HomeAbout() {
  return <section className={styles["about-container"]} id="about" data-reveal="" aria-labelledby="home-about-heading">
    <div className={styles["content2"]}>
      <div className={styles["image-about"]}>
        <div className={styles["n-1"]}>
          <div className={styles["tag-title-description"]}>
            <div className={styles["tag-title"]}>
              <SectionTags variant="Mid" tag="About us" />
              <div className={styles["title2"]}>
                <h2 id="home-about-heading" className={cx(tokens["text-n-36-r"], styles["h2"])}>Hand-decorated treats,</h2>
                <h2 className={cx(tokens["text-n-44-r"], styles["served-with-love"])}>made for your moments</h2>
              </div>
            </div>
            <p className={cx(tokens["text-n-18-r"], styles["text2"])}>I make handcrafted cake pops and dipped treats for birthdays, baby showers, corporate events and thoughtful gifts. I’m based in Minneapolis and serve surrounding areas.</p>
          </div>
          <Button variant="Primary Desktop" buttonText="Discover our story" link="/about" />
        </div>
        <div className={styles["n-2"]}>
          <div className={styles["image-frame"]}>
            <ResponsiveProductImage className={styles["cake-image"]} src={`${import.meta.env.BASE_URL}products/Assorted Cake Pops on Marble Pedestal.webp`} sizes="(max-width: 809px) 350px, (max-width: 1199px) 353px, 438px" alt="An assortment of hand-decorated cake pops arranged on a marble pedestal" loading="lazy" decoding="async" width={1447} height={1087} />
          </div>
        </div>
      </div>
    </div>
  </section>;
}
