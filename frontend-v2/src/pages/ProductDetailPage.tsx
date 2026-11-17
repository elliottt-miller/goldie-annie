import { ArrowLeft, ArrowUpRight, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { products } from "../content/products";
import { shopUrl } from "../content/brand";
import styles from "./ProductDetailPage.module.css";
import { NotFoundPage } from "./NotFoundPage";

export function ProductDetailPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) return <NotFoundPage />;

  const related = products.filter((item) => item.id !== product.id && item.kind.split(" · ")[0] === product.kind.split(" · ")[0]).slice(0, 3);

  return <div className={styles.page}>
    <section className={styles.detail} data-reveal aria-labelledby="product-title">
      <div className={styles.inner}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to="/treats"><ArrowLeft size={16} aria-hidden="true" /> All treats</Link>
          <span aria-hidden="true">/</span>
          <span>{product.kind.split(" · ")[0]}</span>
        </nav>
        <div className={styles.product}>
          <div className={styles.visual}>
            <span className={styles.category}>{product.kind.split(" · ")[0]}</span>
            <img src={`${import.meta.env.BASE_URL}products/${product.image}`} alt={product.name} width={720} height={720} fetchPriority="high" decoding="async" />
            <span className={styles["visual-caption"]}>Hand-decorated by Goldie Ann</span>
          </div>
          <div className={styles.copy}>
            <span className={styles.eyebrow}><Heart size={14} aria-hidden="true" /> A little something special</span>
            <h1 id="product-title">{product.name}</h1>
            <div className={styles.divider} aria-hidden="true"><span /><Heart size={15} /><span /></div>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.details}>
              <div><span>Treat</span><strong>{product.kind.split(" · ")[0]}</strong></div>
              <div><span>Made for</span><strong>Celebrations, gifting &amp; sharing</strong></div>
              <div><span>Personal touches</span><strong>Ask about packaging and customizations</strong></div>
            </div>
            <a className={styles.order} href={shopUrl} target="_blank" rel="noreferrer">
              <span>See menu &amp; order online</span><ArrowUpRight size={18} aria-hidden="true" />
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
        <h2 id="related-treats-title">More {product.kind.split(" · ")[0].toLowerCase()}</h2>
        <div className={styles.relatedList}>{related.map((item) => <Link key={item.id} to={`/treats/${item.id}`}>
          <img src={`${import.meta.env.BASE_URL}products/${item.image}`} alt="" width="160" height="160" loading="lazy" decoding="async" />
          <span>{item.name}</span><ArrowUpRight size={16} aria-hidden="true" />
        </Link>)}</div>
      </div>
    </section>}
  </div>;
}
