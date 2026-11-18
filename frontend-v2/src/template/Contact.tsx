import cx from "./cx";
import tokens from "./tokens.module.css";
import styles from "./Contact.module.css";
import ContactCards from "./ContactCards";
import PageHeader from "./PageHeader";
import SectionTags from "./SectionTags";
import { shopUrl } from "../content/brand";
import ResponsiveProductImage from "./ResponsiveProductImage";

export default function Page() {
  return (
    <div className={styles.desktop}>
      <PageHeader title="Order with Goldie Ann" subtitle="Explore the current treats and ask about custom details through the online shop." />
      <section className={styles["order-container"]} aria-label="Order Goldie Ann treats">
        <div className={styles.content} data-reveal>
          <div className={styles.shopPanel}>
            <div className={styles.shopPanelContent}>
              <SectionTags variant="Left" tag="Shop Goldie Ann" />
              <h2 className={cx(tokens["text-n-36-r"], styles["first-name2"])}>Find your next sweet treat</h2>
              <p className={cx(tokens["text-n-18-r"], styles["shop-copy"])}>Browse current offerings, place an order, and ask about packaging or customizations through the Goldie Ann shop.</p>
              <a className="template-shop-link" href={shopUrl} target="_blank" rel="noreferrer">Visit the online shop <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className={styles.image}>
            <div className={styles["polaroid-image-frame"]}>
              <ResponsiveProductImage className={styles["main-bakery-image"]} src={`${import.meta.env.BASE_URL}products/homepage-scroll-assortment.webp`} sizes="(max-width: 809px) 78vw, 440px" alt="Goldie Ann hand-decorated treats" loading="lazy" decoding="async" width={1280} height={1280} />
              <h3 className={cx(tokens["text-n-20-r"], styles.h5)}>Hand-decorated for your sweetest moments</h3>
              <img className={styles["wax-seal"]} src={`${import.meta.env.BASE_URL}logo-badge.svg`} alt="Goldie Ann Sweets & More" />
            </div>
          </div>
        </div>
        <div className={styles["baby-flowers-illustration"]} aria-hidden="true" />
        <div className={styles.bg} aria-hidden="true" />
        <div className={styles["top-gradient"]} aria-hidden="true" />
        <div className={styles["bottom-gradient"]} aria-hidden="true" />
      </section>
      <section className={styles["reach-out-container"]} aria-labelledby="order-information">
        <div className={styles.content2} data-reveal>
          <div className={styles["tag-title-description"]}>
            <SectionTags variant="Mid" tag="Order details" />
            <div className={styles.title}>
              <h2 id="order-information" className={cx(tokens["text-n-36-r"], styles["we-d-love-to"])}>Made for your moment</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["hear-from-you"])}>from menu to memories</h2>
            </div>
          </div>
          <div className={styles["contact-cards-map"]}>
            <div className={styles["contact-cards-wrapper"]}>
              <ContactCards variant="Desktop With Short text" symbol="cake" title="The current menu" note="Browse available treats and order details in the online shop." />
              <ContactCards variant="Desktop With Short text" symbol="gift" title="Personal touches" note="Ask about packaging and customizations when placing an order." />
              <ContactCards variant="Desktop With Short text" symbol="shop" title="Sweet occasions" note="Find hand-decorated treats for celebrations, gifting and sharing." />
            </div>
          </div>
        </div>
        <div className={styles["baby-flowers-illstration"]} aria-hidden="true" />
      </section>
    </div>
  );
}
