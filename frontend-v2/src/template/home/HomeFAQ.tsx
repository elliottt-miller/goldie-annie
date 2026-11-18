import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import FAQAccordions from "../FAQAccordions"
import SectionTags from "../SectionTags"
import ResponsiveProductImage from "../ResponsiveProductImage"

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
            <FAQAccordions variant="Close" question={"What treats can I order?"} answer={"Goldie Ann offers decorated cake pops, cakesicles, dipped Oreos, pretzel rods and Rice Krispy treats. Visit the shop to see current offerings."} />
            <FAQAccordions variant="Close" question={"Can I request customizations?"} answer={"Yes. Packaging and customizations are available upon request. Use the shop link to ask about your order."} />
            <FAQAccordions variant="Close" question={"Where can I see current products and pricing?"} answer={"Visit Goldie Ann’s online shop for current product listings and pricing."} />
            <FAQAccordions variant="Close" question={"How do I place an order?"} answer={"Select Shop Goldie Ann to open the ordering page and review available treats."} />
            <FAQAccordions variant="Close" question={"Can I order for a celebration or gift?"} answer={"The treats are made for gifting and celebrations. Ask about packaging and customizations when placing your order."} />
          </div>
          <ResponsiveProductImage className={styles["faq-featured-treat-art"]} src={`${import.meta.env.BASE_URL}products/mean-ones-sweet-box-transparent.webp`} sizes="(max-width: 809px) 58vw, 260px" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        </div>
        <div className={styles["baby-flowers-illustration4"]} />
        <div className={styles["baby-flowers-illustration5"]} />
    </section>
  )
}
