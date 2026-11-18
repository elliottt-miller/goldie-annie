import styles from "../Page.module.css";
import SectionTags from "../SectionTags";
import { orderDepositPercent, orderLeadTimeDays, orderMinimumCents, sweetPackages, typicalPreparationDays } from "../../content/products";
import { useCart } from "../../commerce/CartContext";

const formatPrice = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

export default function HomeOffers() {
  const { addPackage } = useCart();
  return <section className={styles["shop-container"]} data-reveal="" aria-labelledby="shop-heading">
    <div className={styles["content5"]}>
      <div className={styles["tag-title-description4"]}>
        <SectionTags variant="Mid" tag="For sharing" />
        <div className={styles["title5"]}>
          <h2 id="shop-heading" className={styles["shop-heading-primary"]}>Celebration packages</h2>
          <p className={styles["package-intro"]}>Choose a ready-to-share assortment, then visit the shop to plan your order.</p>
        </div>
      </div>
      <div className={styles["package-grid-home"]}>
        {sweetPackages.map((offer) => <article className={styles["package-card"]} key={offer.name}>
          <div className={styles["package-card-heading"]}>
            <div><h3>{offer.name}</h3><span>{offer.pieces} pieces</span></div>
            <strong>{formatPrice(offer.priceCents)}</strong>
          </div>
          <ul>{offer.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <button type="button" onClick={() => addPackage(offer.name)}>Add package to bag</button>
        </article>)}
      </div>
      <div className={styles["order-facts"]}>
        <div><span>Order minimum</span><strong>{formatPrice(orderMinimumCents)}</strong></div>
        <div><span>Deposit</span><strong>{orderDepositPercent}% due within 24 hours; non-refundable</strong></div>
        <div><span>Order notice</span><strong>At least {orderLeadTimeDays} days</strong></div>
        <div><span>Typical preparation</span><strong>{typicalPreparationDays} days</strong></div>
      </div>
      <p className={styles["package-note"]}>All dipped sweets in a package are matching unless otherwise specified.</p>
    </div>
  </section>;
}
