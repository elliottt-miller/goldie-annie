import { ArrowLeft, ArrowUpRight, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProduct, products, productCollections } from "../content/products";
import { shopUrl } from "../content/brand";
import styles from "./ProductDetailPage.module.css";
import { NotFoundPage } from "./NotFoundPage";
import ResponsiveProductImage from "../template/ResponsiveProductImage";

export function ProductDetailPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) return <NotFoundPage />;

  const collection = productCollections.find((item) => item.productIds.includes(product.id));
  const related = collection
    ? collection.productIds.filter((id) => id !== product.id).map(getProduct).slice(0, 3)
    : products.filter((item) => item.id !== product.id && item.kind.split(" · ")[0] === product.kind.split(" · ")[0]).slice(0, 3);
  const [category, packSize] = product.kind.split(" · ");
  const productTag = "tag" in product ? product.tag : undefined;

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
            <span className={styles.category}>{category}</span>
            {productTag && <span className={styles.seasonal}>{productTag}</span>}
            <ResponsiveProductImage src={`${import.meta.env.BASE_URL}products/${product.image}`} sizes="(max-width: 809px) 88vw, (max-width: 1199px) 45vw, 560px" alt={product.name} width={720} height={720} fetchPriority="high" decoding="async" />
            <span className={styles["visual-caption"]}>Hand-decorated by Goldie Ann</span>
          </div>
          <div className={styles.copy}>
            <span className={styles.eyebrow}><Heart size={14} aria-hidden="true" /> A little something special</span>
            <h1 id="product-title">{product.name}</h1>
            <div className={styles.divider} aria-hidden="true"><span /><Heart size={15} /><span /></div>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.details}>
              <h2>At a glance</h2>
              <div><span>Category</span><strong>{category}</strong></div>
              {packSize && <div><span>Pack size</span><strong>{packSize}</strong></div>}
              {productTag && <div><span>Collection</span><strong>{productTag}</strong></div>}
              <div><span>Made for</span><strong>Celebrations, gifting &amp; sharing</strong></div>
              <div><span>Custom details</span><strong>Ask about packaging and customizations</strong></div>
            </div>
            <a className={styles.order} href={shopUrl} target="_blank" rel="noreferrer">
              <span>Order online</span><ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <p className={styles.orderNote}>Current availability and ordering details are listed in our online shop.</p>
            <Link className={styles.back} to="/treats"><ArrowLeft size={15} aria-hidden="true" /> Back to all treats</Link>
          </div>
        </div>
      </div>
    </section>
    {related.length > 0 && <section className={styles.related} aria-labelledby="related-treats-title">
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
