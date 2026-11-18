import { ArrowLeft, ArrowUpRight, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { getProduct, products, productCollections, type ProductId } from "../content/products";
import { useCart } from "../commerce/useCart";
import styles from "./ProductDetailPage.module.css";
import { NotFoundPage } from "./NotFoundPage";
import ResponsiveProductImage from "../template/ResponsiveProductImage";
import Button from "../template/Button";

export function ProductDetailPage() {
  const { productId } = useParams();
  const { addProduct } = useCart();
  const [added, setAdded] = useState(false);
  const product = products.find((item) => item.id === productId);

  if (!product) return <NotFoundPage />;

  const collection = productCollections.find((item) => item.productIds.includes(product.id));
  const related = collection
    ? collection.productIds.filter((id) => id !== product.id).map(getProduct).slice(0, 3)
    : products.filter((item) => item.id !== product.id && item.kind.split(" · ")[0] === product.kind.split(" · ")[0]).slice(0, 3);
  const [category, packSize] = product.kind.split(" · ");
  const productTag = "tag" in product ? product.tag : undefined;
  const packSizeLabel = packSize === '1 dozen' ? 'One dozen' : packSize;
  const priceLabel = product.priceCents != null
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.priceCents / 100)
    : 'Ask about current pricing';
  const orderDetails: Array<[string, string]> = [
    ['Treat', category],
    ['Quantity', packSizeLabel ?? 'Ask about box size'],
    ['Decorating', 'Up to two colors, with drizzle and sprinkles'],
    ['Order notice', 'Please place orders at least 7 days ahead'],
    ['Deposit', '50% non-refundable deposit due within 24 hours of your order'],
  ];
  if (product.id === 'chocolate-dipped-pretzel-rods') {
    orderDetails.push(['Optional add-ons', 'Homemade caramel +$6 per dozen; pecans +$6 per dozen']);
  } else if (product.id === 'homemade-caramel-pretzel-rods') {
    orderDetails.push(['Optional add-on', 'Pecans +$6 per dozen']);
  }
  if (productTag) orderDetails.push(['Collection', productTag]);

  return <div className={styles.page}>
    <section className={styles.detail} data-reveal aria-labelledby="product-title">
      <div className={styles.inner}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/treats"><ArrowLeft size={16} aria-hidden="true" /> All treats</Link>
          <span aria-hidden="true">/</span>
          <span>{category}</span>
        </nav>
        <div className={styles.product}>
          <div className={styles.visual}>
            <ResponsiveProductImage src={`${import.meta.env.BASE_URL}products/${product.image}`} sizes="(max-width: 809px) 88vw, (max-width: 1199px) 45vw, 560px" alt={product.name} width={720} height={720} fetchPriority="high" decoding="async" />
            <span className={styles["visual-caption"]}>Hand-decorated by Goldie Ann</span>
          </div>
          <div className={styles.copy}>
            <span className={styles.eyebrow}><Heart size={14} aria-hidden="true" /> Hand-decorated for your occasion</span>
            <h1 id="product-title">{product.name}</h1>
            <div className={styles.divider} aria-hidden="true"><span /><Heart size={15} /><span /></div>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.purchasePrice} aria-label={product.priceCents != null ? `${priceLabel}${packSize ? ` per ${packSize.replace(/^1 /, '')}` : ''}` : priceLabel}>
              <strong>{priceLabel}</strong>
              {product.priceCents != null && packSize && <span>per {packSize.replace(/^1 /, '')}</span>}
            </div>
            <section className={styles.details} aria-labelledby="order-details-heading">
              <div className={styles.detailsHeading}><h2 id="order-details-heading">Order details</h2><p>What to know before you add a little sweetness.</p></div>
              <dl className={styles.detailsGrid}>
                {orderDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                <div><dt>Made for</dt><dd>Celebrations, thoughtful gifts and sharing</dd></div>
                <div><dt>Custom touches</dt><dd>Ask about packaging or decoration requests</dd></div>
              </dl>
            </section>
            {product.priceCents != null
              ? <Button className={styles.order} buttonText={added ? 'Added to bag' : `Add ${packSizeLabel?.toLowerCase() ?? 'item'} to bag`} onClick={() => { addProduct(product.id as ProductId); setAdded(true); }} />
              : <Button className={styles.order} buttonText="Ask about availability" link={`/contact?product=${encodeURIComponent(product.id)}`} />}
            <p className={styles.orderNote}>Adding to your bag does not reserve a date. Goldie Ann confirms availability before accepting an order. A 50% non-refundable deposit is due within 24 hours of order placement.</p>
            <Link className={styles.back} to="/treats"><ArrowLeft size={15} aria-hidden="true" /> Back to all treats</Link>
          </div>
        </div>
      </div>
    </section>
    {related.length > 0 && <section className={styles.related} data-reveal aria-labelledby="related-treats-title">
      <div className={styles.relatedInner}>
        <p className={styles.relatedEyebrow}>Keep exploring</p>
        <h2 id="related-treats-title">More from {collection?.title.toLowerCase() ?? category.toLowerCase()}</h2>
        <div className={styles.relatedList}>{related.map((item) => <Link key={item.id} to={`/treats/${item.id}`}>
          <ResponsiveProductImage src={`${import.meta.env.BASE_URL}products/${item.image}`} sizes="64px" alt="" width="160" height="160" loading="lazy" decoding="async" />
          <span>{item.name}</span><ArrowUpRight size={16} aria-hidden="true" />
        </Link>)}</div>
      </div>
    </section>}
  </div>;
}
