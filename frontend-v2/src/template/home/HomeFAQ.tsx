import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import FAQAccordions from "../FAQAccordions"
import SectionTags from "../SectionTags"
import { orderDepositPercent, orderLeadTimeDays, orderMinimumCents, typicalPreparationDays } from "../../content/products"

const currency = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100)

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
            <FAQAccordions variant="Close" question={"What is the order minimum and deposit?"} answer={`The order minimum is ${currency(orderMinimumCents)}. A ${orderDepositPercent}% non-refundable deposit is due within 24 hours of order confirmation.`} />
            <FAQAccordions variant="Close" question={"How much notice should I give?"} answer={`Please submit your request at least ${orderLeadTimeDays} days ahead. Typical preparation takes ${typicalPreparationDays} days, and your date is confirmed after we review availability.`} />
            <FAQAccordions variant="Close" question={"Can I customize colors and decorations?"} answer={"Choose up to two colors for dipped selections, with drizzle and sprinkles. Include any special requests with your order inquiry so we can confirm what is possible."} />
            <FAQAccordions variant="Close" question={"How are treats arranged in celebration packages?"} answer={"Dipped sweets in each package are decorated to match unless you request otherwise."} />
            <FAQAccordions variant="Close" question={"How do I place an order?"} answer={"Browse the shop, add your selections to your bag, and send an order request with your event details. We’ll confirm availability and pickup or delivery details before accepting the order; payment is not collected on this site."} />
          </div>
        </div>
        <div className={styles["baby-flowers-illustration4"]} />
        <div className={styles["baby-flowers-illustration5"]} />
    </section>
  )
}
