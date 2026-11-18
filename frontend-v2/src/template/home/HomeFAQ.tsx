import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import FAQAccordions from "../FAQAccordions"
import SectionTags from "../SectionTags"

export default function HomeFAQ() {
  return (
    <section className={styles["faq-container"]} id="ordering-questions" data-reveal="" aria-labelledby="home-faq-heading">
        <div className={styles["content8"]}>
          <div className={styles["tag-title-description7"]}>
            <SectionTags variant="Mid" tag={"Order details"} />
            <div className={styles["title8"]}>
              <h2 id="home-faq-heading" className={cx(tokens["text-n-36-r"], styles["faq-heading-primary"])}>{"Questions"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["faq-heading-accent"])}>{"about ordering"}</h2>
            </div>
          </div>
          <div className={styles["faq-accordion-wrappers"]}>
            <FAQAccordions variant="Close" question={"How far in advance should I order?"} answer={"Please place orders at least one week in advance. Typical preparation time is three days."} />
            <FAQAccordions variant="Close" question={"Can I customize colors and decorations?"} answer={"Choose up to two colors for dipped selections, with drizzle and sprinkles. Special requests can be accommodated unless otherwise noted."} />
            <FAQAccordions variant="Close" question={"What is needed to place an order?"} answer={"The order minimum is $20. A non-refundable 50% deposit is due within 24 hours. Visit the online shop to browse the menu and secure your date."} />
          </div>
        </div>
        <div className={styles["baby-flowers-illustration4"]} />
        <div className={styles["baby-flowers-illustration5"]} />
    </section>
  )
}
