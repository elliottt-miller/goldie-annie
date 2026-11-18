import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products, sweetPackages, orderDepositPercent, orderLeadTimeDays, orderMinimumCents, regularDippingColors } from '../content/products';
import { useCart } from '../commerce/useCart';
import styles from './CheckoutPage.module.css';
import Button from '../template/Button';

const currency = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
const todayString = () => {
  const date = new Date();
  date.setDate(date.getDate() + orderLeadTimeDays);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotalCents } = useCart();
  const [colors, setColors] = useState<string[]>([]);
  const [colorError, setColorError] = useState('');
  const [minimumDate] = useState(() => todayString());

  if (items.length === 0) return <div className={styles.page}><div className={styles.empty} data-reveal><h1>Your bag is empty</h1><Link to="/treats">Browse the shop</Link></div></div>;
  if (subtotalCents < orderMinimumCents) return <div className={styles.page}><div className={styles.empty} data-reveal><h1>Order minimum</h1><p>Please add at least {currency(orderMinimumCents)} to your bag before preparing an order request.</p><Link to="/cart">Review your bag</Link></div></div>;

  const updateColor = (color: string) => {
    setColorError('');
    setColors((current) => current.includes(color)
      ? current.filter((value) => value !== color)
      : current.length < 2 ? [...current, color] : current);
    if (!colors.includes(color) && colors.length >= 2) setColorError('Choose up to two dipping colors.');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const requestedDate = String(form.get('eventDate') ?? '');
    if (requestedDate < minimumDate) return;
    const request = {
      customer: {
        name: String(form.get('name') ?? '').trim(),
        email: String(form.get('email') ?? '').trim(),
        phone: String(form.get('phone') ?? '').trim(),
      },
      eventDate: requestedDate,
      city: String(form.get('city') ?? '').trim(),
      colors,
      notes: String(form.get('notes') ?? '').trim(),
      items: items.map((item) => {
        const product = item.type === 'product' ? products.find((entry) => entry.id === item.id) : undefined;
        const offer = item.type === 'package' ? sweetPackages.find((entry) => entry.name === item.id) : undefined;
        const priceCents = product?.priceCents ?? offer?.priceCents ?? 0;
        return { name: product?.name ?? offer?.name ?? 'Treat', quantity: item.quantity, priceCents, totalCents: priceCents * item.quantity };
      }),
      subtotalCents,
      estimatedDepositCents: Math.ceil(subtotalCents * orderDepositPercent / 100),
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem('goldie-ann-order-request-v1', JSON.stringify(request));
    navigate('/order-request');
  };

  return <div className={styles.page}>
    <header className={styles.heading} data-reveal><p>Your details</p><h1>Plan your order</h1><span>Request details for your celebration</span></header>
    <div className={styles.layout}>
      <form className={styles.form} data-reveal onSubmit={handleSubmit}>
        <fieldset>
          <legend>How can Goldie Ann reach you?</legend>
          <label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label>
          <div className={styles.twoColumns}>
            <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label>Phone number <span>optional</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Tell us about the occasion</legend>
          <div className={styles.twoColumns}>
            <label>Event date<input name="eventDate" type="date" min={minimumDate} required /><small>Orders need at least {orderLeadTimeDays} days’ notice.</small></label>
            <label>City or surrounding area<input name="city" autoComplete="address-level2" maxLength={100} placeholder="Minneapolis area" /></label>
          </div>
          <label>Color preferences <span>up to two</span></label>
          <div className={styles.colors}>
            {regularDippingColors.map((color) => <label className={styles.colorOption} key={color}>
              <input type="checkbox" checked={colors.includes(color)} onChange={() => updateColor(color)} aria-label={`${color} dipping color`} />{color}
            </label>)}
          </div>
          {colorError && <p className={styles.error} role="status">{colorError}</p>}
          <label>Custom details or questions<textarea name="notes" rows={4} maxLength={1200} placeholder="Share decoration requests, packaging notes or anything else Goldie Ann should know." /></label>
        </fieldset>
        <label className={styles.consent}><input type="checkbox" name="policy" required /><span>I understand a 50% non-refundable deposit is due within 24 hours after an order is accepted. This request does not confirm availability or collect a payment.</span></label>
        <Button className={styles.submit} buttonText="Review order request" type="submit" fullWidth />
        <Link className={styles.back} to="/cart"><ArrowLeft size={15} aria-hidden="true" /> Back to your bag</Link>
      </form>
      <aside className={styles.summary} data-reveal>
        <h2>Request summary</h2>
        {items.map((item) => {
          const product = item.type === 'product' ? products.find((entry) => entry.id === item.id) : undefined;
          const offer = item.type === 'package' ? sweetPackages.find((entry) => entry.name === item.id) : undefined;
          const price = product?.priceCents ?? offer?.priceCents ?? 0;
          return <div className={styles.summaryLine} key={item.key}><span>{item.quantity} × {product?.name ?? offer?.name}</span><strong>{currency(price * item.quantity)}</strong></div>;
        })}
        <div className={styles.total}><span>Estimated total</span><strong>{currency(subtotalCents)}</strong></div>
        <div className={styles.total}><span>Estimated 50% deposit</span><strong>{currency(Math.ceil(subtotalCents * orderDepositPercent / 100))}</strong></div>
        <p>Order minimum: {currency(orderMinimumCents)}. Availability and pickup or delivery arrangements are confirmed before an order is accepted. No payment is collected here.</p>
      </aside>
    </div>
  </div>;
}
