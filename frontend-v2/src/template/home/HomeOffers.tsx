import styles from "../Page.module.css";
import SectionTags from "../SectionTags";
import { sweetPackages } from "../../content/products";
import { useCart } from "../../commerce/useCart";
import Button from "../Button";

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
        {sweetPackages.map((offer) => <article className={styles["package-card"]} data-reveal key={offer.name}>
          <div className={styles["package-card-heading"]}>
            <div><h3>{offer.name}</h3><span>{offer.pieces} pieces</span></div>
            <strong>{formatPrice(offer.priceCents)}</strong>
          </div>
          <ul>{offer.items.map((item) => <li key={item}>{item}</li>)}</ul>
          <Button buttonText="Add package to bag" onClick={() => addPackage(offer.name)} fullWidth />
        </article>)}
      </div>
    </div>
  </section>;
}
