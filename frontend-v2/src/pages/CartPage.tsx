import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { products, sweetPackages, orderDepositPercent, orderMinimumCents } from '../content/products';
import { useCart } from '../commerce/useCart';
import styles from './CartPage.module.css';
import Button from '../template/Button';

const currency = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

export function CartPage() {
  const { items, itemCount, subtotalCents, setQuantity, removeItem } = useCart();

  return <div className={styles.page}>
    <header className={styles.heading} data-reveal>
      <p>Your selections</p>
      <h1>Your sweet bag</h1>
      <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
    </header>
    {items.length === 0 ? <section className={styles.empty} data-reveal>
      <h2 data-reveal>Your bag is waiting for something sweet.</h2>
      <p>Explore the current treats and celebration packages.</p>
      <Button buttonText="Browse the shop" link="/treats" />
    </section> : <div className={styles.layout}>
      <section className={styles.lines} aria-label="Items in your bag">
        {items.map((item) => {
          const product = item.type === 'product' ? products.find((entry) => entry.id === item.id) : undefined;
          const offer = item.type === 'package' ? sweetPackages.find((entry) => entry.name === item.id) : undefined;
          const name = product?.name ?? offer?.name ?? 'Treat';
          const image = product?.image;
          const price = product?.priceCents ?? offer?.priceCents ?? 0;
          return <article className={styles.line} data-reveal key={item.key}>
            {image ? <img src={`${import.meta.env.BASE_URL}products/${image}`} alt="" /> : <div className={styles.packageMark} aria-hidden="true">{offer?.pieces ?? ''}<span>pieces</span></div>}
            <div className={styles.lineContent}>
              <div className={styles.lineHeading}>
                <h2>{name}</h2>
                <strong className={styles.lineTotal}>{currency(price * item.quantity)}</strong>
              </div>
              <p>{product?.kind ?? `${offer?.pieces ?? ''} pieces · celebration package`}</p>
              <strong>{currency(price)}{product ? ' per dozen' : ' each'}</strong>
              <div className={styles.controls}>
                <button type="button" aria-label={`Decrease ${name} quantity`} onClick={() => setQuantity(item.key, item.quantity - 1)}><Minus size={15} aria-hidden="true" /></button>
                <span aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
                <button type="button" aria-label={`Increase ${name} quantity`} onClick={() => setQuantity(item.key, item.quantity + 1)} disabled={item.quantity >= 99}><Plus size={15} aria-hidden="true" /></button>
                <button className={styles.remove} type="button" aria-label={`Remove ${name} from bag`} onClick={() => removeItem(item.key)}><Trash2 size={15} aria-hidden="true" /><span>Remove</span></button>
              </div>
            </div>
          </article>;
        })}
        <Link className={styles.continue} to="/treats">Continue shopping</Link>
      </section>
      <aside className={styles.summary} data-reveal aria-label="Order summary">
        <h2>Order summary</h2>
        <div><span>Subtotal</span><strong>{currency(subtotalCents)}</strong></div>
        <div><span>Deposit at confirmation</span><strong>{currency(Math.ceil(subtotalCents * orderDepositPercent / 100))}</strong></div>
        <p>Final availability and any applicable delivery or pickup details are confirmed before an order is accepted. The deposit is not collected on this site.</p>
        {subtotalCents < orderMinimumCents && <p className={styles.minimum}>The order minimum is {currency(orderMinimumCents)}. Add {currency(orderMinimumCents - subtotalCents)} to continue.</p>}
        {subtotalCents >= orderMinimumCents
          ? <Button buttonText="Continue to order details" link="/checkout" fullWidth />
          : <Button buttonText="Continue to order details" disabled fullWidth />}
      </aside>
    </div>}
  </div>;
}
