import styles from './MenuPricing.module.css';
import { getProduct, orderDepositPercent, orderLeadTimeDays, orderMinimumCents, pretzelCaramelUpchargeCents, pretzelPecanUpchargeCents, regularDippingColors, sweetPackages, typicalPreparationDays } from '../content/products';

const formatPrice = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
const menuItems = [
  { label: 'Cake pops & discs', productId: 'funfetti-cake-pops' },
  { label: 'Cakesicles', productId: 'cakesicles' },
  { label: 'Dipped & drizzled Oreos', productId: 'chocolate-dipped-oreos' },
  { label: 'Dipped & drizzled pretzel rods', productId: 'chocolate-dipped-pretzel-rods' },
  { label: 'Dipped & drizzled Rice Krispy bars', productId: 'rice-krispy-treats' },
] as const;

export default function MenuPricing() {
  return <section className={styles.section} data-reveal aria-labelledby="menu-pricing-title">
    <div className={styles.inner}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Made for your occasion</p>
        <h2 id="menu-pricing-title">Menu &amp; pricing</h2>
        <p>Each dozen is decorated with up to two colors, drizzle and sprinkles.</p>
      </header>

      <div className={styles.menuGrid}>
        {menuItems.map(({ label, productId }) => {
          const product = getProduct(productId);
          return <article className={styles.menuItem} data-reveal key={productId}>
            <h3>{label}</h3>
            <span>{product.kind.split(' · ').at(-1)}</span>
            <strong>{product.priceCents ? formatPrice(product.priceCents) : 'Ask for pricing'}</strong>
          </article>;
        })}
      </div>

      <p className={styles.addOns}>Homemade caramel: +{formatPrice(pretzelCaramelUpchargeCents)} per dozen. Pecans: +{formatPrice(pretzelPecanUpchargeCents)} per dozen.</p>

      <div className={styles.packages}>
        <div className={styles.subheading}>
          <p className={styles.eyebrow}>Share a little extra</p>
          <h2>Packages</h2>
        </div>
        <div className={styles.packageGrid}>
          {sweetPackages.map((offer) => <article className={styles.package} data-reveal key={offer.name}>
            <div className={styles.packageHead}>
              <div><h3>{offer.name}</h3><span>{offer.pieces} pieces</span></div>
              <strong>{formatPrice(offer.priceCents)}</strong>
            </div>
            <ul>{offer.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>)}
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <article className={styles.detailCard}>
          <h3>Color, drizzle &amp; sprinkles</h3>
          <p>Choose up to two colors for dipped selections. Drizzle and sprinkles are included. Special requests can be accommodated unless otherwise noted. All dipped sweets in a package match unless otherwise specified.</p>
          <ul className={styles.colorList}>{regularDippingColors.map((color) => <li key={color}>{color}</li>)}</ul>
        </article>
        <article className={styles.detailCard}>
          <h3>Ordering policies</h3>
          <dl>
            <div><dt>Order minimum</dt><dd>{formatPrice(orderMinimumCents)}</dd></div>
            <div><dt>Deposit</dt><dd>{orderDepositPercent}% non-refundable, due within 24 hours of placing an order</dd></div>
            <div><dt>Order notice</dt><dd>Place orders at least {orderLeadTimeDays} days in advance</dd></div>
            <div><dt>Typical preparation</dt><dd>{typicalPreparationDays} days</dd></div>
          </dl>
        </article>
      </div>
    </div>
  </section>;
}
