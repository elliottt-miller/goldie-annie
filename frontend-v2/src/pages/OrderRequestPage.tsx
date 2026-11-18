import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Copy, Download } from 'lucide-react';
import styles from './OrderRequestPage.module.css';

interface RequestItem { name: string; quantity: number; priceCents: number; totalCents: number }
interface OrderRequest {
  customer: { name: string; email: string; phone: string };
  eventDate: string;
  city: string;
  colors: string[];
  notes: string;
  items: RequestItem[];
  subtotalCents: number;
  estimatedDepositCents: number;
  createdAt: string;
}

const currency = (cents: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);

function loadRequest(): OrderRequest | null {
  try {
    const value = JSON.parse(sessionStorage.getItem('goldie-ann-order-request-v1') ?? 'null') as OrderRequest | null;
    return value && Array.isArray(value.items) && value.customer?.email ? value : null;
  } catch { return null; }
}

function formatRequest(request: OrderRequest) {
  return [
    'Goldie Ann’s Sweets & More — Order Request',
    `Name: ${request.customer.name}`,
    `Email: ${request.customer.email}`,
    `Phone: ${request.customer.phone || 'Not provided'}`,
    `Event date: ${request.eventDate}`,
    `City / area: ${request.city || 'Not provided'}`,
    `Dipping colors: ${request.colors.length ? request.colors.join(', ') : 'No preference provided'}`,
    '', 'Items:',
    ...request.items.map((item) => `- ${item.quantity} × ${item.name}: ${currency(item.totalCents)}`),
    `Estimated total: ${currency(request.subtotalCents)}`,
    `Estimated 50% deposit: ${currency(request.estimatedDepositCents)}`,
    '', `Notes: ${request.notes || 'None'}`,
    '', 'This is a request only. Availability, final details and deposit are not confirmed.',
  ].join('\n');
}

export function OrderRequestPage() {
  const request = loadRequest();
  const [copied, setCopied] = useState(false);
  if (!request) return <div className={styles.page}><section className={styles.empty} data-reveal><h1>No order request to review</h1><p>Add treats to your bag and enter your occasion details to prepare a request.</p><Link to="/treats">Browse the shop</Link></section></div>;
  const requestText = formatRequest(request);

  const copyRequest = async () => {
    try { await navigator.clipboard.writeText(requestText); setCopied(true); }
    catch { setCopied(false); }
  };
  const downloadRequest = () => {
    const file = new Blob([requestText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'goldie-ann-order-request.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <div className={styles.page}>
    <section className={styles.card} data-reveal>
      <p className={styles.eyebrow}>Order request</p>
      <h1>Review your sweet plans</h1>
      <p className={styles.notice} role="status">This request is saved in this browser only. It has <strong>not been sent</strong> to Goldie Ann, and your date, availability and deposit are not confirmed.</p>
      <div className={styles.customer} data-reveal><div><span>Customer</span><strong>{request.customer.name}</strong></div><div><span>Email</span><strong>{request.customer.email}</strong></div><div><span>Event date</span><strong>{request.eventDate}</strong></div><div><span>Area</span><strong>{request.city || 'Not provided'}</strong></div></div>
      <div className={styles.itemList} data-reveal><h2>Your selection</h2>{request.items.map((item, index) => <div className={styles.item} data-reveal key={`${item.name}-${index}`}><span>{item.quantity} × {item.name}</span><strong>{currency(item.totalCents)}</strong></div>)}</div>
      {request.colors.length > 0 && <p className={styles.note}><strong>Requested colors:</strong> {request.colors.join(', ')}</p>}
      {request.notes && <p className={styles.note}><strong>Custom details:</strong> {request.notes}</p>}
      <div className={styles.total}><span>Estimated subtotal</span><strong>{currency(request.subtotalCents)}</strong></div>
      <div className={styles.total}><span>Estimated 50% deposit</span><strong>{currency(request.estimatedDepositCents)}</strong></div>
      <div className={styles.actions}>
        <button type="button" onClick={copyRequest}>{copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}{copied ? 'Copied' : 'Copy request details'}</button>
        <button type="button" onClick={downloadRequest}><Download size={17} aria-hidden="true" />Download request</button>
      </div>
      <p className={styles.deliveryNote}>The storefront still needs a confirmed order-receiving channel before requests can be delivered or accepted online.</p>
      <Link className={styles.back} to="/cart"><ArrowLeft size={15} aria-hidden="true" /> Back to your bag</Link>
    </section>
  </div>;
}
